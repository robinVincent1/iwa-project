import { Message } from "./message.model";

export type Conversation = {
  contactAvatar: never;
  id_conversation: string;
  id_messageState: string;
  id_sender: string;
  id_receiver: string;
  messages: Message[];
};