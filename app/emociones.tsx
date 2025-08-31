// app/screen1.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { OptionButton } from "@/components/OptionButton";
import PictogramModal from "@/components/PictogramModal";
import { useOneTap } from "@/hooks/useOneTap";
import { getArasaacImageUrl } from "@/utils/arasaac";

// Emociones con IDs reales de ARASAAC (desde main)
const emotions = [
  { id: 13354, name: "Feliz", color: "#FFD54F" },
  { id: 35545, name: "Triste", color: "#64B5F6" },
  { id: 35567, name: "Enojado", color: "#E57373" },
  { id: 35529, name: "Sorprendido", color: "#BA68C8" },
  { id: 35535, name: "Asustado", color: "#4DD0E1" },
  { id: 35537, name: "Cansado", color: "#A1887F" },
  { id: 35531, name: "Aburrido", color: "#90A4AE" },
  { id: 30391, name: "Nervioso", color: "#FF8A65" },
  { id: 30620, name: "Adolorido", color: "#F06292" },
  { id: 38481, name: "Enfermo", color: "#81C784" },
  { id: 38050, name: "Tranquilo", color: "#4DB6AC" },
  { id: 6992, name: "Confundido", color: "#7986CB" },
];

export default function Screen1() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Estado para el modal
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{
    id: number;
    name: string;
    color: string;
  } | null>(null);

  // OneTap para evitar doble toque
  const { onPress: onEmotionSafePress } = useOneTap(
    (e: { id: number; name: string; color: string }) => {
      setSelected(e);
      setOpen(true);
    },
    700
  );

  const isTwoColumns = width >= 350;

  // Pares para filas 2x2
  const emotionPairs: Array<Array<(typeof emotions)[number]>> = [];
  for (let i = 0; i < emotions.length; i += 2) {
    emotionPairs.push([emotions[i], emotions[i + 1]].filter(Boolean) as any);
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={[styles.title, { fontSize: isTwoColumns ? 44 : 38 }]}>
            ¿Cómo te sientes?
          </Text>

          {emotionPairs.map((pair, idx) => (
            <View
              key={idx}
              style={[
                styles.emotionRow,
                {
                  flexDirection: isTwoColumns ? "row" : "column",
                  alignItems: "center",
                },
              ]}
            >
              {pair.map((emotion) => (
                <OptionButton
                  key={emotion.id}
                  id={emotion.id}
                  name={emotion.name}
                  color={emotion.color}
                  imageUrl={getArasaacImageUrl(emotion.id)}
                  style={styles.emotionContainer}
                  imageStyle={styles.emotionImage}
                  textStyle={styles.emotionText}
                  onPress={onEmotionSafePress}
                  accessibilityLabel={`Emoción: ${emotion.name}`}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal con imagen real desde ARASAAC */}
      <PictogramModal
        visible={open && !!selected}
        onClose={() => setOpen(false)}
        label={selected ? `Estoy ${selected.name}` : ""}
        imageSource={
          selected ? { uri: getArasaacImageUrl(selected.id) } : undefined
        }
        color={selected?.color}
        autoCloseMs={5000}
        speakOnOpen
        speechLang="es-ES"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 20, alignItems: "center" },
  title: {
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  emotionRow: {
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  emotionContainer: {
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minHeight: 150,
    justifyContent: "center",
    marginHorizontal: 8,
  },
  emotionImage: { marginBottom: 10 },
  emotionText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginTop: 5,
  },
});
