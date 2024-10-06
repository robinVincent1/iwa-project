import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const articles = [
  {
    id_article: "1",
    titre: "Article 1",
    extrait_description: "Ceci est un extrait de l'article 1.",
    description:
      "Voici la description complète de l'article 1. Il parle de divers sujets intéressants.",
    date: "28/09/2024",
    image: "https://via.placeholder.com/150",
  },
  {
    id_article: "2",
    titre: "Article 2",
    extrait_description: "Ceci est un extrait de l'article 2.",
    description:
      "La description complète de l'article 2 contient des informations détaillées.",
    date: "29/09/2024",
    image: "https://via.placeholder.com/150",
  },
  // Ajoutez plus d'articles ici
];

export default function HomepageArticles() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.articleContainer}
      onPress={() => handleArticlePress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.articleImage} />
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle}>{item.titre}</Text>
        <Text style={styles.articleExcerpt}>{item.extrait_description}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleArticlePress = (article) => {
    navigation.navigate("ArticleDetails", { article });
  };

  const handleSeeAllPress = () => {
    navigation.navigate("ArticlesPage", { articlesData: articles });
  };

  const handleAddPress = () => {
    navigation.navigate("AddArticle");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Articles & Blogs</Text>
      <FlatList
        data={articles.slice(0, 2)} // Affichez seulement les 2 premiers articles ici
        renderItem={renderItem}
        keyExtractor={(item) => item.id_article}
        contentContainerStyle={styles.flatListContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={handleSeeAllPress}
        >
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-down" size={30} color="white" />
          </View>
          <Text style={styles.arrowText}>Voir tous les articles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.seeAllButton} onPress={handleAddPress}>
          <View style={styles.arrowCircle}>
            <FontAwesome6 name="add" size={24} color="white" />
          </View>
          <Text style={styles.arrowText}>Ajouter un article</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "#FAFAFA", // Fond doux et neutre
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // Aligne les boutons horizontalement
    justifyContent: 'center',
    marginTop: 20,
},
  articleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF", // Fond blanc pour chaque article
    padding: 15, // Espace autour du contenu
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, // Ombre pour Android
  },
  articleImage: {
    width: 90,
    height: 90,
    borderRadius: 8, // Images arrondies
  },
  articleContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  articleExcerpt: {
    fontSize: 14,
    color: "#757575",
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00796B", // Couleur naturelle
    marginBottom: 20,
  },
  seeAllButton: {
    alignItems: "center",
    marginTop: 20,
  },
  arrowCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#00796B", // Couleur élégante et naturelle pour le bouton
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  arrowText: {
    fontSize: 16,
    color: "#333333", // Texte sobre
    padding: 5,
  },
});
