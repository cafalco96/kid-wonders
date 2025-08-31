import * as Haptics from "expo-haptics";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export function OptionButton({
  id,
  name,
  color,
  imageUrl,
  onPress,
  accessibilityLabel,
  style,
  imageStyle,
  textStyle,
}: {
  id: number;
  name: string;
  color: string;
  imageUrl: string;
  onPress: (option: { id: number; name: string; color: string }) => void;
  accessibilityLabel?: string;
  style?: any;
  imageStyle?: any;
  textStyle?: any;
}) {
  return (
    <TouchableOpacity
      style={[styles.container, style, { backgroundColor: color }]}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress({ id, name, color });
      }}
      accessible
      accessibilityLabel={accessibilityLabel || name}
      accessibilityRole="button"
    >
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, imageStyle]}
        resizeMode="contain"
      />
      <Text style={[styles.text, textStyle]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minHeight: 150,
    minWidth: 120,
    justifyContent: "center",
    marginBottom: 20,
    flex: 1,
  },
  image: {
    marginBottom: 10,
    width: "70%",
    aspectRatio: 1,
    maxWidth: 120,
    maxHeight: 120,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginTop: 5,
    flexWrap: "wrap",
  },
});
