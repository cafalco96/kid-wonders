import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Ocultamos el header solo en la pantalla principal */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Estas pantallas sí tendrán header con botón de regreso */}
        <Stack.Screen name="emociones" options={{ title: "" }} />
        <Stack.Screen name="necesidades" options={{ title: "" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
