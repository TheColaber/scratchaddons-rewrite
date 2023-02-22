export default class Auth extends EventTarget {
  id: string;
  messageCache: { timestamp: number; value: null | Promise<number> };
  sessionCache: { timestamp: number; value: null | Promise<any> };

  constructor(id: string) {
    super();
    this.id = id;
    this.messageCache = { timestamp: 0, value: null };
    this.sessionCache = { timestamp: 0, value: null };

    chrome.cookies.onChanged.addListener(async ({ cookie, removed }) => {
      if (cookie.name === "scratchsessionsid") {
        this.dispatchEvent(new CustomEvent("updatedSession"));
      }
    });
  }

  async getSession() {
    const date = Date.now();
    if (
      this.sessionCache.value instanceof Promise &&
      date - this.sessionCache.timestamp < 1000
    ) {
      return await this.sessionCache.value;
    }
    this.sessionCache.timestamp = date;
    this.sessionCache.value = fetch("https://scratch.mit.edu/session/", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    }).then((res) => res.json());

    return await this.sessionCache.value;
  }

  async getMessageCount() {
    const date = Date.now();

    if (
      this.messageCache.value instanceof Promise &&
      date - this.messageCache.timestamp < 1000
    ) {
      return await this.messageCache.value;
    }
    const session = await this.getSession();

    if (!session.user) return 0;
    this.messageCache.timestamp = date;
    this.messageCache.value = fetch(
      `https://api.scratch.mit.edu/users/${session.user.username}/messages/count?timestamp=${date}`
    )
      .then((res) => res.json())
      .then((val: { count: number }) => val.count);
    return await this.messageCache.value;
  }

  // async getMessages() {
  //   const session = await this.getSession();
  //   if (!session.user) return [];
  //   const messageCount = await this.getMessageCount();
  //   const maxPages = Math.min(Math.ceil(messageCount / 40) + 1, 25);
  //   const pages: (
  //     | followuser
  //     | curatorinvite
  //     | becomeownerstudio
  //     | becomehoststudio
  //     | forumpost
  //     | studioactivity
  //     | remixproject
  //   )[][] = [];
  //   for (let i = 0; i < maxPages; i++) {
  //     const page = await (
  //       await fetch(
  //         `https://api.scratch.mit.edu/users/${
  //           session.user.username
  //         }/messages?limit=40&offset=${40 * i}`,
  //         {
  //           headers: {
  //             "x-token": session.user.token,
  //           },
  //         }
  //       )
  //     ).json();
  //     pages.push(...page);
  //   }
  //   return pages.flat();
  // }
}

// type followuser = {
//   type: "followuser";
//   actor_username: string;
// };
// type curatorinvite = {
//   type: "curatorinvite";
//   actor_username: string;
//   gallery_id: string;
//   title: string;
// };
// type becomeownerstudio = {
//   type: "becomeownerstudio";
//   actor_username: string;
//   gallery_id: string;
//   gallery_title: string;
// };
// type becomehoststudio = {
//   type: "becomehoststudio";
//   admin_actor: boolean;
//   actor_username: string;
//   gallery_id: string;
//   gallery_title: string;
// };
// type forumpost = {
//   type: "forumpost";
//   topic_id: string;
//   topic_title: string;
// };
// type studioactivity = {
//   type: "studioactivity";
//   gallery_id: string;
//   title: string;
// };
// type remixproject = {
//   type: "remixproject";
//   actor_username: string;
//   parent_title: string;
//   title: string;
//   project_id: string;
// };
