"use client"

import { View, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useStore } from "../store"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { BusinessCard } from "../components/BusinessCard"

export default function BusinessesPage() {
  const router = useRouter()
  const businesses = useStore((state) => state.businesses)

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <Header title="Nearby Businesses" />

      {/* Search */}
      <View className="px-6 py-4">
        <Input placeholder="Search shops, cafes, services..." />
      </View>

      {/* Business List */}
      <ScrollView className="px-6">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
