import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { sendMessage } from "../../store/messagesSlice";
import { MessageStatus } from "../../store/messagesSlice"; // Import de l'énumération
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
          status: MessageStatus.Envoye, // Utilisation de l'énumération
        })
      );
      setMessage("");
    }
  };

  const renderStatusIcon = (status: MessageStatus) => {
    switch (status) {
      case MessageStatus.Envoye:
        return <MaterialCommunityIcons name="send-clock-outline" size={16} color="#00796B" />;
      case MessageStatus.Remis:
        return <MaterialCommunityIcons name="send-check-outline" size={16} color="#00796B" />;
      case MessageStatus.Vu:
        return <Ionicons name="eye" size={16} color="#00796B" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactInfo}
            onPress={() =>
              navigation.navigate("ContactDetail", {
                name: conversation.contactName,
                firstName: conversation.contactFirstName,
                avatar: conversation.contactAvatar,
              })
            }
          >
            <Image source={conversation.contactAvatar} style={styles.avatar} />
            <Text style={styles.contactName}>
              {`${conversation.contactFirstName} ${conversation.contactName}`}
            </Text>
          </TouchableOpacity>
        </View>
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
            <View style={styles.messageMeta}>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              {item.isSentByUser && renderStatusIcon(item.status)}
            </View>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ecrire un message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#00796B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Arrière-plan doux
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff", // Fond blanc pour le header
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 2, // Ombre pour le header
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600", // Poids de police légèrement plus léger
    color: "#333", // Couleur sombre pour le texte
  },
  messageBubble: {
    margin: 10,
    padding: 15,
    borderRadius: 15, // Coins arrondis
    elevation: 1, // Ombre pour les bulles de message
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d4f5d4", // Couleur douce pour les messages envoyés
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e7e7e7", // Couleur douce pour les messages reçus
  },
  messageText: {
    fontSize: 16,
    color: "#333", // Couleur sombre pour le texte du message
  },
  messageMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "#888", // Couleur du timestamp
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff", // Fond blanc pour la barre d'entrée
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f1f1f1", // Fond légèrement gris pour l'entrée
    marginRight: 10,
    borderColor: "#ccc",
    borderWidth: 1, // Bordure autour de l'entrée
  },
  sendButton: {
    padding: 10,
  },
});