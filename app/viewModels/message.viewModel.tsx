import { useState, useEffect } from 'react';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';

const useMessagesViewModel = () => {
  const [state, setState] = useState<{
    conversations: Conversation[],
    loading: boolean,
    error: string | null,
  }>({
    conversations: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // const response = await fetch('/api/conversations');
        // if (!response.ok) throw new Error('Network response was not ok');
        const data: Conversation[] = [ /* Sample data here */ ];
        setState(prevState => ({ ...prevState, conversations: data, loading: false }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error: (error as Error).message, loading: false }));
      }
    };

    fetchConversations();
  }, []);

  const updateConversation = (conversationId: string, updateFn: (conv: Conversation) => Conversation) => {
    setState(prevState => ({
      ...prevState,
      conversations: prevState.conversations.map(conversation => 
        conversation.id_conversation === conversationId ? updateFn(conversation) : conversation
      ),
    }));
  };

  const addMessage = (conversationId: string, newMessage: Message) => {
    updateConversation(conversationId, conversation => ({
      ...conversation,
      messages: [...conversation.messages, newMessage],
    }));
  };

  const updateMessage = (conversationId: string, messageId: string, updatedMessage: Partial<Message>) => {
    updateConversation(conversationId, conversation => ({
      ...conversation,
      messages: conversation.messages.map(message =>
        message.id_message === messageId ? { ...message, ...updatedMessage } : message
      ),
    }));
  };

  const deleteMessage = (conversationId: string, messageId: string) => {
    updateConversation(conversationId, conversation => ({
      ...conversation,
      messages: conversation.messages.filter(message => message.id_message !== messageId),
    }));
  };

  const getConversationById = (conversationId: string) => {
    return state.conversations.find(conversation => conversation.id_conversation === conversationId) || null;
  };

  return {
    conversations: state.conversations,
    loading: state.loading,
    error: state.error,
    addMessage,
    updateMessage,
    deleteMessage,
    getConversationById,
  };
};

export default useMessagesViewModel;
