import WorkerAddon from "../../src/addon-api/worker"
import { getMessage } from '@extend-chrome/messages'

const [sendRequest, requestStream] = getMessage<"requestData">('requestData');
const [sendData, dataStream] = getMessage<{type: string, actor_username: string}[]>('scratchMessageData');

export default async (addon: WorkerAddon) => {
  const messages = await addon.auth.getMessages();
  requestStream.subscribe(() => {
    sendData(messages.flat())
  })
};

export { sendRequest, dataStream }
