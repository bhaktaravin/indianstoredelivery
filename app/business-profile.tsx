"use client"

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import { useStore } from "../store"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

export default function BusinessProfilePage() {
  const router = useRouter()
  const user = useStore((state) => state.user)
  const businesses = useStore((state) => state.businesses)

  const business = businesses[0] // Mock - would use user's business

  const [formData, setFormData] = useState({
    name: business.name,
    category: business.category,
    address: business.address,
    phone: business.phone,
    whatsapp: business.whatsapp,
    offer: business.offer || "",
  })

  const handleSave = () => {
    // In real app, this would update database
    router.back()
  }

  if (user?.role !== "business") {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <Header title="Business Profile" />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-xl font-semibold mb-4">Business Account Required</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <Header title="Business Profile" />

      <ScrollView className="px-6 py-6">
        {/* Business Image */}
        <View className="mb-6">
          <Image source={{ uri: business.image }} className="w-full h-48 rounded-2xl mb-4" resizeMode="cover" />
          <TouchableOpacity className="bg-primary py-3 rounded-xl active:opacity-80">
            <Text className="text-white text-center font-semibold">Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View className="gap-4 mb-6">
          <Input
            label="Business Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <Input
            label="Category"
            value={formData.category}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
          />

          <Input
            label="Address"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            multiline
            numberOfLines={2}
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />

          <Input
            label="WhatsApp Number"
            value={formData.whatsapp}
            onChangeText={(text) => setFormData({ ...formData, whatsapp: text })}
            keyboardType="phone-pad"
          />

          <Input
            label="Current Offer (Optional)"
            value={formData.offer}
            onChangeText={(text) => setFormData({ ...formData, offer: text })}
            placeholder="e.g., 10% off on orders above ₹500"
          />
        </View>

        {/* Store Hours */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <Text className="text-lg font-semibold mb-3">Store Hours</Text>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-neutral-600">Monday - Saturday</Text>
              <Text className="font-medium">9:00 AM - 9:00 PM</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-neutral-600">Sunday</Text>
              <Text className="font-medium">10:00 AM - 8:00 PM</Text>
            </View>
          </View>
          <TouchableOpacity className="mt-3">
            <Text className="text-primary font-medium">Edit Hours</Text>
          </TouchableOpacity>
        </View>

        <Button onPress={handleSave} title="Save Changes" size="lg" />
      </ScrollView>
    </SafeAreaView>
  )
}
