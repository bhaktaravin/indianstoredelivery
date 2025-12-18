"use client"

import { View, Text, ScrollView, TouchableOpacity, Share } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import { useStore } from "../store"
import { Header } from "../components/Header"
import { Card, CardContent } from "../components/Card"

export default function QRCodePage() {
  const router = useRouter()
  const user = useStore((state) => state.user)
  const businesses = useStore((state) => state.businesses)

  const business = businesses[0] // Mock - would use user's business
  const [selectedQR, setSelectedQR] = useState<"profile" | "order" | "offer">("profile")

  const qrTypes = [
    {
      id: "profile" as const,
      title: "Store Profile",
      description: "Let customers view your store instantly",
      icon: "🏪",
    },
    {
      id: "order" as const,
      title: "Quick Order",
      description: "Direct link to start ordering",
      icon: "🛒",
    },
    {
      id: "offer" as const,
      title: "Today's Offer",
      description: "Share your daily special",
      icon: "🎁",
    },
  ]

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${business.name}! ${business.offer || "Great deals available!"}`,
        url: `https://localbazaar.app/business/${business.id}`,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDownload = () => {
    // In real app, this would generate and download QR code
    alert("QR Code downloaded!")
  }

  if (user?.role !== "business") {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <Header title="QR Codes" />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-xl font-semibold mb-4">Business Account Required</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <Header title="QR Codes" />

      <ScrollView className="px-6 py-6">
        {/* QR Type Selection */}
        <Text className="text-xl font-bold font-heading mb-4">Select QR Code Type</Text>

        <View className="gap-3 mb-6">
          {qrTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              onPress={() => setSelectedQR(type.id)}
              className={`rounded-2xl p-4 shadow-sm ${selectedQR === type.id ? "bg-primary" : "bg-white"}`}
            >
              <View className="flex-row items-center">
                <View
                  className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
                    selectedQR === type.id ? "bg-white/20" : "bg-neutral-100"
                  }`}
                >
                  <Text className="text-2xl">{type.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text
                    className={`text-lg font-semibold ${selectedQR === type.id ? "text-white" : "text-neutral-900"}`}
                  >
                    {type.title}
                  </Text>
                  <Text className={selectedQR === type.id ? "text-white/80" : "text-neutral-600"}>
                    {type.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* QR Code Display */}
        <Card className="mb-6">
          <CardContent className="items-center py-8">
            <Text className="text-lg font-semibold mb-4">
              {qrTypes.find((t) => t.id === selectedQR)?.title} QR Code
            </Text>

            {/* QR Code Placeholder */}
            <View className="bg-white border-4 border-neutral-200 rounded-2xl p-6 mb-6">
              <View className="w-48 h-48 bg-neutral-900 rounded-xl items-center justify-center">
                <View className="w-40 h-40 bg-white rounded-lg items-center justify-center">
                  <Text className="text-4xl">{qrTypes.find((t) => t.id === selectedQR)?.icon}</Text>
                  <Text className="text-xs text-neutral-600 mt-2">QR Code</Text>
                </View>
              </View>
            </View>

            <Text className="text-neutral-600 text-center mb-6">Customers can scan this code to access your store</Text>

            {/* Action Buttons */}
            <View className="gap-3 w-full">
              <TouchableOpacity onPress={handleDownload} className="bg-primary py-4 rounded-xl active:opacity-80">
                <Text className="text-white text-center font-semibold text-lg">Download QR Code</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleShare} className="bg-secondary py-4 rounded-xl active:opacity-80">
                <Text className="text-white text-center font-semibold text-lg">Share QR Code</Text>
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>

        {/* Usage Tips */}
        <Card>
          <CardContent>
            <Text className="text-lg font-semibold mb-4">Tips for Maximum Impact</Text>

            <View className="gap-3">
              <View className="flex-row">
                <Text className="text-primary text-lg mr-3">•</Text>
                <Text className="flex-1 text-neutral-700">Print and display QR codes at your store entrance</Text>
              </View>

              <View className="flex-row">
                <Text className="text-primary text-lg mr-3">•</Text>
                <Text className="flex-1 text-neutral-700">Include QR codes on receipts and packaging</Text>
              </View>

              <View className="flex-row">
                <Text className="text-primary text-lg mr-3">•</Text>
                <Text className="flex-1 text-neutral-700">Share on social media and WhatsApp groups</Text>
              </View>

              <View className="flex-row">
                <Text className="text-primary text-lg mr-3">•</Text>
                <Text className="flex-1 text-neutral-700">Update your daily offer QR regularly for best results</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}
