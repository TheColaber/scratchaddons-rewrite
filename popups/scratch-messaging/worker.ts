import WorkerAddon from "../../src/addon-api/worker";
import { getMessage } from "@extend-chrome/messages";

export type followuser = {
  type: "followuser";
  actor_username: string;
};
export type curatorinvite = {
  type: "curatorinvite";
  actor_username: string;
  gallery_id: string;
  title: string;
};
export type becomeownerstudio = {
  type: "becomeownerstudio";
  actor_username: string;
  gallery_id: string;
  gallery_title: string;
};
export type becomehoststudio = {
  type: "becomehoststudio";
  admin_actor: boolean;
  actor_username: string;
  gallery_id: string;
  gallery_title: string;
};
export type forumpost = {
  type: "forumpost";
  topic_id: string;
  topic_title: string;
};
export type studioactivity = {
  type: "studioactivity";
  gallery_id: string;
  title: string;
}
export type remixproject = {
  type: "remixproject";
  actor_username: string;
  parent_title: string;
  title: string;
  project_id: string;
};

export default async (addon: WorkerAddon) => {
  chrome.runtime.onConnect.addListener(async (port) => {
    if (port.name !== "scratch-messaging") return
    port.onMessage.addListener(async (message) => {
      if (message === "sendMessages") {
        const messages = await addon.auth.getMessages();
        port.postMessage({ messages })            
      }
      if (message === "sendCount") {
        console.log("got it!");
        
        const count = await addon.auth.getMessageCount();
        console.log("sent");
        
        port.postMessage({ count })
      }
    })
  });
};
