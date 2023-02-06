export default class Auth extends EventTarget {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;

    chrome.cookies.onChanged.addListener(async ({ cookie, removed }) => {
      if (cookie.name === "scratchsessionsid") {
        this.dispatchEvent(new CustomEvent("updatedSession"));
      }
    });
  }

  async getSession() {
    return await (
      await fetch("https://scratch.mit.edu/session/", {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
    ).json();
  }

  async getMessageCount() {
    const session = await this.getSession();
    if (!session.user) return 0;
    const { count }: { count: number } = await (
      await fetch(
        `https://api.scratch.mit.edu/users/${
          session.user.username
        }/messages/count?timestamp=${Date.now()}`
      )
    ).json();
    return count;
  }

  async getMessages() {
    const session = await this.getSession();
    if (!session.user) return [];
    const messageCount = await this.getMessageCount();
    const maxPages = Math.min(Math.ceil(messageCount / 40) + 1, 25);
    const pages = [];
    for (let i = 0; i < maxPages; i++) {
      const page = await (
        await fetch(
          `https://api.scratch.mit.edu/users/${
            session.user.username
          }/messages?limit=40&offset=${40 * i}`,
          {
            headers: {
              "x-token": session.user.token,
            },
          }
        )
      ).json();
      pages.push(page);
    }
    return pages.flat();
  }
}
