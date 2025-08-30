// app/screen1.tsx
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View, ImageSourcePropType } from "react-native";

import PictogramModal from "@/components/PictogramModal";
import React, { useState } from "react";
import { useOneTap } from "@/hooks/useOneTap";

type Emotion = {
  label: string;
  img: ImageSourcePropType;
};
export default function Screen1() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [emotion, setEmotion] = useState<Emotion | null>(null);

  const { onPress: showSafe } = useOneTap((e: Emotion) => {
    setEmotion(e);
    setOpen(true);
  }, 700);

  return (

    <View style={styles.container}>
      <Button title="Feliz"   onPress={() => showSafe({ label: "Estoy Feliz",   img: require("../assets/images/feliz.png") })} />
      <Button title="Triste"  onPress={() => showSafe({ label: "Estoy Triste",  img: require("../assets/images/triste.png") })} />
      <Button title="Enojado" onPress={() => showSafe({ label: "Estoy Enojado", img: require("../assets/images/enojado.png") })} />
      <Button title="Asustado"onPress={() => showSafe({ label: "Estoy Asustado",img: require("../assets/images/asustado.png") })} />


      <Text style={styles.title}>¡Bienvenido a la Pantalla 1!</Text>
      <Button title="Volver" onPress={useOneTap(() => router.back()).onPress} />

      <PictogramModal
        visible={open && !!emotion}
        onClose={() => setOpen(false)}
        label={emotion?.label ?? ""}
        imageSource={emotion?.img}
        autoCloseMs={5000}
        speakOnOpen
        speechLang="es-ES"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
