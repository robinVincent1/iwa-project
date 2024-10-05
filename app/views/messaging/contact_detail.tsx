import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ContactDetail({ route }: any) {
  const { name, firstName, email, phoneNumber } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Details</Text>

      <View style={styles.detailItem}>
        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{firstName}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{name}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email || "N/A"}</Text>
      </View>

      <View style={styles.detailItem}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{phoneNumber || "N/A"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#888",
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
  },
});
