// app/index.tsx (HomeScreen)
import React from "react";
import { useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getArasaacImageUrl } from "../utils/arasaac";

export default function HomeScreen() {
  const router = useRouter();
  const { width } = Dimensions.get("window");

  const ButtonCard = ({
    id,
    label,
    onPress,
    color,
  }: {
    id: number;
    label: string;
    onPress: () => void;
    color: string;
  }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color, width: width * 0.7, height: width * 0.7 }]}
      onPress={onPress}
      accessible={true}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <Image source={{ uri: getArasaacImageUrl(id) }} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ButtonCard
        id={10744}
        label="Emociones"
        color="#FF7043"
        onPress={() => router.push("/emociones")}
      />
      <View style={{ height: 40 }} />
      <ButtonCard
        id={7171}
        label="Necesidades"
        color="#4FC3F7"
        onPress={() => router.push("/necesidades")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  card: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cardImage: {
    width: "80%",
    height: "65%",
  },
  cardText: {
    marginTop: 15,
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
});
