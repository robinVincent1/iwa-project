import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function MessagesView() {
  const conversations = useSelector(
    (state: any) => state.messages.conversations
  );
  const navigation = useNavigation();

  const renderConversation = ({ item }: any) => {
    const lastMessage = item.messages[item.messages.length - 1];

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MessagesDetail", { conversationId: item.id })
        }
      >
        <View style={styles.conversationItem}>
          <Image
            source={
              item.contactAvatar
            }
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text
              style={styles.contactName}
            >{`${item.contactFirstName} ${item.contactName}`}</Text>
            <Text style={styles.lastMessage}>{lastMessage.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={conversations}
      keyExtractor={(item) => item.id}
      renderItem={renderConversation}
    />
  );
}

const styles = StyleSheet.create({
  conversationItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#888",
  },
});
