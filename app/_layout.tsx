import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Image } from "react-native";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {});
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Logo para el header
  const LogoTitle = () => (
    <Image
      source={require("@/assets/images/wonder-kids.png")}
      style={{ width: 44, height: 44, resizeMode: "contain" }}
      accessibilityLabel="Logo Kid Wonders"
    />
  );

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#FAFAFA" },
          headerTintColor: "#000",
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="emociones" />
        <Stack.Screen name="necesidades" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
