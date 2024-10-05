import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const conversations = [
  {
    id: "1",
    name: "Doe",
    firstName: "John",
    lastMessage: "Hey, how are you?",
    messages: [
      {
        id: "1",
        sender: "John",
        text: "Hey, how are you?",
        timestamp: "14:30",
      },
      {
        id: "2",
        sender: "Me",
        text: "I’m good, what about you?",
        timestamp: "14:32",
      },
    ],
  },
  {
    id: "2",
    name: "Smith",
    firstName: "Jane",
    lastMessage: "Let’s catch up tomorrow!",
    messages: [
      {
        id: "1",
        sender: "Jane",
        text: "Let’s catch up tomorrow!",
        timestamp: "12:45",
      },
      { id: "2", sender: "Me", text: "Sure, sounds good!", timestamp: "12:47" },
    ],
  },
];

export default function MessagesView() {
  const navigation = useNavigation();

  const renderConversationItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() =>
        navigation.navigate("MessagesDetail", {
          conversationId: item.id,
          name: item.name,
          firstName: item.firstName,
          messages: item.messages,
        })
      }
    >
      <Text style={styles.name}>{`${item.firstName} ${item.name}`}</Text>
      <Text style={styles.lastMessage}>{item.lastMessage}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  conversationItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
  },
  separator: {
    height: 10,
  },
});
