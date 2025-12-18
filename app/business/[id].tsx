"use client"

import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useStore } from "../../store"
import { Header } from "../../components/Header"
import { ProductCard } from "../../components/ProductCard"
import { Badge } from "../../components/Badge"

export default function BusinessDetailPage() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const businesses = useStore((state) => state.businesses)
  const products = useStore((state) => state.products)
  const addToCart = useStore((state) => state.addToCart)
  const cart = useStore((state) => state.cart)

  const business = businesses.find((b) => b.id === id)
  const businessProducts = products.filter((p) => p.businessId === id)

  if (!business) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <Header title="Business Not Found" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-600">Business not found</Text>
        </View>
      </SafeAreaView>
    )
  }

  const handleWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${business.whatsapp}`)
  }

  const handleCall = () => {
    Linking.openURL(`tel:${business.phone}`)
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <Header
        title={business.name}
        rightAction={
          cart.length > 0
            ? {
                label: `Cart (${cart.length})`,
                onPress: () => router.push("/cart"),
              }
            : undefined
        }
      />

      <ScrollView>
        {/* Business Header */}
        <Image source={{ uri: business.image }} className="w-full h-64" resizeMode="cover" />

        <View className="px-6 py-6 bg-white border-b border-neutral-200">
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-1">
              <Text className="text-2xl font-bold font-heading mb-2">{business.name}</Text>
              <Text className="text-neutral-600 text-lg">{business.category}</Text>
            </View>
            <Badge label={business.isOpen ? "Open" : "Closed"} variant={business.isOpen ? "success" : "default"} />
          </View>

          {/* Rating and Distance */}
          <View className="flex-row items-center mb-4">
            <Text className="text-accent text-xl mr-2">★</Text>
            <Text className="font-medium text-lg">{business.rating}</Text>
            <Text className="text-neutral-400 mx-2">•</Text>
            <Text className="text-neutral-600">{business.distance} km away</Text>
          </View>

          {/* Address */}
          <View className="mb-4">
            <Text className="text-neutral-700">{business.address}</Text>
          </View>

          {/* Offer Banner */}
          {business.offer && (
            <View className="bg-accent/10 px-4 py-3 rounded-xl mb-4">
              <Text className="text-secondary font-semibold text-center">{business.offer}</Text>
            </View>
          )}

          {/* Contact Actions */}
          <View className="flex-row gap-3">
            <TouchableOpacity onPress={handleCall} className="flex-1 bg-secondary py-4 rounded-xl active:opacity-80">
              <Text className="text-white text-center font-semibold">Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleWhatsApp}
              className="flex-1 bg-secondary py-4 rounded-xl active:opacity-80"
            >
              <Text className="text-white text-center font-semibold">WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu/Products */}
        <View className="px-6 py-6">
          <Text className="text-2xl font-bold font-heading mb-4">Menu</Text>

          {businessProducts.length > 0 ? (
            <View className="gap-4">
              {businessProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-2xl p-8 items-center">
              <Text className="text-neutral-600 text-center">No products available at the moment</Text>
            </View>
          )}
        </View>

        {/* Map Placeholder */}
        <View className="px-6 pb-6">
          <Text className="text-xl font-bold font-heading mb-4">Location</Text>
          <View className="bg-neutral-200 rounded-2xl h-48 items-center justify-center">
            <Text className="text-neutral-600">Map view coming soon</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
