import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper"; // Utilisation de Button de react-native-paper pour un style cohérent
import { Ionicons } from "@expo/vector-icons";

export type Article = {
  id_article: string;
  titre: string;
  extrait_description: string;
  description: string;
  date: string;
  images: string[];
};

export default function AddArticleView({ navigation }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const maxLength = 400;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.slice(0, 10 - images.length)]);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newArticle: Article = {
      id_article: Date.now().toString(),
      titre: title,
      extrait_description: excerpt,
      description: description,
      date: date,
      images: images.map((image) => image.uri), // Récupère les URI des images sélectionnées
    };
    console.log(newArticle);
    // Logique pour gérer l'envoi de l'article
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#37474F" />
        </TouchableOpacity>
        <Text style={styles.title}>Ajouter un article</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Titre de l'article"
        placeholderTextColor="#B0BEC5"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Extrait de description"
        placeholderTextColor="#B0BEC5"
        value={excerpt}
        onChangeText={setExcerpt}
      />
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.instructions}>Décrivez brièvement votre article</Text>
      <TextInput
        style={styles.textArea}
        multiline
        maxLength={maxLength}
        placeholder="Entrez la description ici..."
        placeholderTextColor="#B0BEC5"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.charCount}>
        {description.length}/{maxLength} caractères
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Date"
        placeholderTextColor="#B0BEC5"
        value={date}
        onChangeText={setDate}
      />

      <Button mode="contained" onPress={pickImage} style={styles.button}>
        Ajouter des Images
      </Button>

      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Soumettre
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#37474F",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796B",
    marginBottom: 5,
  },
  instructions: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#B0BEC5",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#F9F9F9",
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    borderColor: "#B0BEC5",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "#F9F9F9",
  },
  charCount: {
    marginTop: 5,
    fontSize: 12,
    color: "#757575",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#00796B",
    marginBottom: 20,
    borderRadius: 5,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  removeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 15,
    padding: 5,
  },
  removeButtonText: {
    color: "#FFF",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: "#00796B",
    borderRadius: 5,
  },
});
