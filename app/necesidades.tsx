// app/screen2.tsx
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Screen2() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Esta es la Pantalla 2!</Text>
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
