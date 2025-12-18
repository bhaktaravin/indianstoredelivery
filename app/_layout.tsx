import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import "../global.css"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FAFAF9" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="businesses" />
        <Stack.Screen name="business/[id]" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="orders" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="products" />
        <Stack.Screen name="business-profile" />
        <Stack.Screen name="qr-code" />
        <Stack.Screen name="scanner" />
        <Stack.Screen name="profile" />
      </Stack>
    </SafeAreaProvider>
  )
}
