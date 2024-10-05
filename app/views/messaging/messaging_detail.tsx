import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";``
import { sendMessage } from "../../store/messagesSlice";

export default function MessagesDetail({ route }: any) {
  const { conversationId } = route.params;
  const conversation = useSelector((state: any) =>
    state.messages.conversations.find((conv: any) => conv.id === conversationId)
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(
        sendMessage({
          conversationId,
          text: message,
          timestamp: new Date().toISOString(),
        })
      );
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.contactName}>
          {`${conversation.contactFirstName} ${conversation.contactName}`}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ContactDetail", {
              name: conversation.contactName,
              firstName: conversation.contactFirstName,
              avatar: conversation.contactAvatar,
            })
          }
        >
          <Text style={styles.detailsButton}>Details</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={conversation.messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.isSentByUser ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    fontSize: 18,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsButton: {
    color: "#007bff",
  },
  messageBubble: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#daf8cb",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f0f0",
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    marginRight: 10,
  },
});
