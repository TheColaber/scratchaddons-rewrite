import WorkerAddon from "../../src/addon-api/worker";
import { getMessage } from "@extend-chrome/messages";

type followuser = {
  type: "followuser";
  actor_username: string;
};
type curatorinvite = {
  type: "curatorinvite";
  actor_username: string;
  gallery_id: string;
  title: string;
};
type becomeownerstudio = {
  type: "becomeownerstudio";
  actor_username: string;
  gallery_id: string;
  gallery_title: string;
};

export type messages = (followuser | curatorinvite | becomeownerstudio)[];

const [sendRequest, requestStream] = getMessage<"requestData">("requestData");
const [sendData, dataStream] = getMessage<messages>("scratchMessageData");

console.log("hi", Date.now());

export default async (addon: WorkerAddon) => {
  console.log("run", Date.now());

  requestStream.subscribe(async () => {
    console.log("got request, sending messages", Date.now());

    const messages = await addon.auth.getMessages();
    console.log("sent", Date.now());

    sendData(messages.flat());
  });
};

export { sendRequest, dataStream };
