import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import useMessagesStateViewModel from "../../viewModels/messageState_viewModel";

export default function MessagesView() {
  const { messagesState, loading, error } = useMessagesStateViewModel();
  const navigation = useNavigation();

  // Gérer le chargement et les erreurs
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const renderConversation = ({ item }: any) => {
    const lastMessage = item.messages[item.messages.length - 1];

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MessagesDetail", { conversationId: item.id_conversation })
        }
        style={styles.conversationContainer}
      >
        <View style={styles.conversationItem}>
          <Image
            source={item.contactAvatar}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.contactName}>
              {`${item.id_sender}`} {/* Vous devez récupérer le nom du contact approprié */}
            </Text>
            <Text style={styles.lastMessage}>{lastMessage.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messagesState.conversations}
        keyExtractor={(item) => item.id_conversation}
        renderItem={renderConversation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  conversationItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  textContainer: {
    marginLeft: 15,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00796B",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
});
