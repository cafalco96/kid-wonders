import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Emociones" onPress={() => router.push("/emociones")} />
      <View style={{ height: 20 }} />
      <Button title="Necesidades" onPress={() => router.push("/necesidades")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
