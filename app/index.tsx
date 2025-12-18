"use client"

import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HomePage() {
  const router = useRouter()

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <ScrollView>
        {/* Hero Section */}
        <View className="bg-primary px-6 py-12">
          <Text className="text-white text-4xl font-bold font-heading mb-3">Local Bazaar</Text>
          <Text className="text-white text-lg mb-6 opacity-90">Discover local businesses near you</Text>
          <TouchableOpacity
            onPress={() => router.push("/businesses")}
            className="bg-white py-4 px-8 rounded-full active:opacity-80"
          >
            <Text className="text-primary text-center text-lg font-semibold">Explore Nearby Shops</Text>
          </TouchableOpacity>

          {/* QR Scan Button */}
          <TouchableOpacity
            onPress={() => router.push("/scanner")}
            className="bg-white/20 py-4 px-8 rounded-full mt-3 active:opacity-80 border-2 border-white"
          >
            <Text className="text-white text-center text-lg font-semibold">Scan Store QR Code</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View className="px-6 py-8">
          <Text className="text-2xl font-bold font-heading mb-6">How It Works</Text>

          <View className="gap-4">
            <View className="bg-white p-6 rounded-2xl shadow-sm">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-4">
                <Text className="text-2xl">🔍</Text>
              </View>
              <Text className="text-xl font-semibold mb-2">Browse Nearby</Text>
              <Text className="text-neutral-600">Find local shops, cafes, and services around you</Text>
            </View>

            <View className="bg-white p-6 rounded-2xl shadow-sm">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-4">
                <Text className="text-2xl">📱</Text>
              </View>
              <Text className="text-xl font-semibold mb-2">Order Ahead</Text>
              <Text className="text-neutral-600">Place orders and pick up at your convenience</Text>
            </View>

            <View className="bg-white p-6 rounded-2xl shadow-sm">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-4">
                <Text className="text-2xl">💰</Text>
              </View>
              <Text className="text-xl font-semibold mb-2">Get Offers</Text>
              <Text className="text-neutral-600">Enjoy exclusive discounts and daily deals</Text>
            </View>

            <View className="bg-white p-6 rounded-2xl shadow-sm">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mb-4">
                <Text className="text-2xl">📸</Text>
              </View>
              <Text className="text-xl font-semibold mb-2">Scan QR Codes</Text>
              <Text className="text-neutral-600">Quick access to stores by scanning in-store QR codes</Text>
            </View>
          </View>
        </View>

        {/* CTA for Business Owners */}
        <View className="mx-6 mb-8 bg-secondary p-6 rounded-2xl">
          <Text className="text-white text-2xl font-bold font-heading mb-3">Are you a business owner?</Text>
          <Text className="text-white/90 mb-6">Grow your customer base with our digital tools</Text>
          <TouchableOpacity
            onPress={() => router.push("/dashboard")}
            className="bg-accent py-4 px-6 rounded-full active:opacity-80"
          >
            <Text className="text-secondary text-center text-lg font-semibold">View Business Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation Hint */}
        <View className="px-6 pb-8">
          <View className="bg-neutral-100 p-4 rounded-xl">
            <Text className="text-neutral-600 text-center text-sm">
              Access profile, orders, and settings from the menu
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
