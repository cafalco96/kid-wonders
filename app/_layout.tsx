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
import { Ionicons } from "@expo/vector-icons";

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

  const headerBackgroundColor = "#FAFAFA";
  const headerTintColor = "#000"; // negro para iconos

  const headerTitleStyle = {
    fontWeight: "bold",
    fontSize: 18,
    color: headerTintColor,
    fontFamily: "SpaceMono",
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: headerBackgroundColor },
          headerTintColor: headerTintColor,
          headerBackTitle: "",
          headerBackImage: () => (
            <Ionicons
              name="chevron-back"
              size={42} 
              color={headerTintColor}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="emociones" options={{ title: "" }} />
        <Stack.Screen name="necesidades" options={{ title: "" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
