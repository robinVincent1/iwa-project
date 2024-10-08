import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
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
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("MessagesDetail", { conversationId: item.id })
        }
      >
        <View style={styles.conversationContainer}>
          <View style={styles.conversationItem}>
            <Image
              source={item.contactAvatar}
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.contactName}>
                {`${item.contactFirstName} ${item.contactName}`}
              </Text>
              <Text
                style={styles.lastMessage}
                numberOfLines={1} // Limite le texte à une seule ligne
                ellipsizeMode="tail" // Ajoute des points de suspension à la fin si le texte est trop long
              >
                {lastMessage.text}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
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
  conversationContainer: {
    margin: 10, // Marge autour des éléments
  },
  conversationItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    backgroundColor: "white", // Fond blanc pour chaque conversation
    borderRadius: 10, // Coins arrondis
    elevation: 1, // Ombre pour l'élévation sur Android
    shadowColor: "#000", // Ombre pour iOS
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
    borderWidth: 2, // Bordure autour de l'avatar
    borderColor: "#ccc", // Couleur de bordure
  },
  textContainer: {
    marginLeft: 15, // Espace plus important à gauche
    flex: 1, // Permet au conteneur de texte de prendre tout l'espace disponible
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600", // Poids de police plus léger
    color: "#00796B", // Couleur du texte
  },
  lastMessage: {
    fontSize: 14,
    color: "#666", // Couleur du texte plus douce
  },
});