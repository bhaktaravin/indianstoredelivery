"use client"

import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Header } from "../components/Header"

export default function ScannerPage() {
  const router = useRouter()

  const handleScanComplete = (businessId: string) => {
    // Navigate to business page
    router.push(`/business/${businessId}`)
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="absolute top-0 left-0 right-0 z-10">
        <Header title="Scan QR Code" />
      </View>

      {/* Camera Placeholder */}
      <View className="flex-1 items-center justify-center">
        <View className="w-64 h-64 border-4 border-white rounded-3xl opacity-50" />
        <Text className="text-white text-center mt-8 px-6">Position QR code within the frame</Text>
      </View>

      {/* Instructions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6">
        <Text className="text-xl font-bold font-heading mb-3">How to Scan</Text>
        <View className="gap-2">
          <View className="flex-row items-start">
            <Text className="text-primary text-lg mr-3">1.</Text>
            <Text className="flex-1 text-neutral-700">Hold your phone steady</Text>
          </View>
          <View className="flex-row items-start">
            <Text className="text-primary text-lg mr-3">2.</Text>
            <Text className="flex-1 text-neutral-700">Align the QR code within the frame</Text>
          </View>
          <View className="flex-row items-start">
            <Text className="text-primary text-lg mr-3">3.</Text>
            <Text className="flex-1 text-neutral-700">Wait for automatic detection</Text>
          </View>
        </View>

        {/* Demo Button */}
        <TouchableOpacity
          onPress={() => handleScanComplete("1")}
          className="bg-primary py-4 rounded-xl mt-6 active:opacity-80"
        >
          <Text className="text-white text-center font-semibold text-lg">Demo: Open Sample Store</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
