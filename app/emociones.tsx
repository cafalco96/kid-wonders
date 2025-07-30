// app/screen1.tsx
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Screen1() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la Pantalla 1!</Text>
      <Button title="Volver" onPress={() => router.back()} />
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
