import { Conversation } from "./conversation.model";

export type MessagesState = {
    id_messageState: string;
    id_user: string;
    conversations: Conversation[];
    messaging_notifications : number;
  }