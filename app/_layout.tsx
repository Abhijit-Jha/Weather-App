import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" options={{ title: "Wealthy" }} />
    <Stack.Screen name="weather" options={{ headerShown: false }} />
    <Stack.Screen name="aqireport" options={{ headerShown: true, title: "AQI Report" }} />
  </Stack>;
}
