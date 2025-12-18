"use client"

import { View, Text, Image, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { Badge } from "./Badge"
import type { Business } from "../store"

interface BusinessCardProps {
  business: Business
}

export function BusinessCard({ business }: BusinessCardProps) {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() => router.push(`/business/${business.id}`)}
      className="bg-white rounded-2xl mb-4 shadow-sm overflow-hidden active:opacity-80"
    >
      <Image source={{ uri: business.image }} className="w-full h-48" resizeMode="cover" />

      <View className="p-4">
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1">
            <Text className="text-xl font-semibold mb-1">{business.name}</Text>
            <Text className="text-neutral-600">{business.category}</Text>
          </View>
          <Badge label={business.isOpen ? "Open" : "Closed"} variant={business.isOpen ? "success" : "default"} />
        </View>

        <Text className="text-neutral-600 mb-3">{business.address}</Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text className="text-accent text-lg mr-2">★</Text>
            <Text className="font-medium">{business.rating}</Text>
            <Text className="text-neutral-400 ml-2">•</Text>
            <Text className="text-neutral-600 ml-2">{business.distance} km</Text>
          </View>
        </View>

        {business.offer && (
          <View className="mt-3 bg-accent/10 px-3 py-2 rounded-lg">
            <Text className="text-secondary font-medium">{business.offer}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}
