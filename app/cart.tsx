"use client"

import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import { useStore } from "../store"
import { Header } from "../components/Header"
import { Button } from "../components/Button"
import { EmptyState } from "../components/EmptyState"

export default function CartPage() {
  const router = useRouter()
  const cart = useStore((state) => state.cart)
  const updateQuantity = useStore((state) => state.updateQuantity)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const placeOrder = useStore((state) => state.placeOrder)
  const clearCart = useStore((state) => state.clearCart)

  const [pickupTime, setPickupTime] = useState("30 minutes")

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePlaceOrder = () => {
    placeOrder(pickupTime)
    router.push("/orders")
  }

  if (cart.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <Header title="Your Cart" />
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Add items from nearby businesses to get started"
        />
        <View className="px-6 pb-6">
          <Button onPress={() => router.push("/businesses")} title="Browse Businesses" />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <Header
        title="Your Cart"
        rightAction={{
          label: "Clear",
          onPress: clearCart,
        }}
      />

      <ScrollView className="flex-1">
        <View className="px-6 py-4">
          {/* Cart Items */}
          {cart.map((item) => (
            <View key={item.id} className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
              <View className="flex-row">
                <Image source={{ uri: item.image }} className="w-20 h-20 rounded-xl mr-4" resizeMode="cover" />

                <View className="flex-1">
                  <Text className="text-lg font-semibold mb-1">{item.name}</Text>
                  <Text className="text-primary text-xl font-bold mb-3">₹{item.price}</Text>

                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-neutral-100 w-8 h-8 rounded-lg items-center justify-center active:opacity-80"
                      >
                        <Text className="text-lg font-semibold">-</Text>
                      </TouchableOpacity>

                      <Text className="text-lg font-semibold w-8 text-center">{item.quantity}</Text>

                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-primary w-8 h-8 rounded-lg items-center justify-center active:opacity-80"
                      >
                        <Text className="text-lg font-semibold text-white">+</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => removeFromCart(item.id)} className="active:opacity-80">
                      <Text className="text-red-600 font-medium">Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}

          {/* Pickup Time */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold mb-3">Pickup Time</Text>
            <View className="flex-row gap-2 flex-wrap">
              {["15 minutes", "30 minutes", "1 hour", "2 hours"].map((time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => setPickupTime(time)}
                  className={`px-4 py-2 rounded-xl ${
                    pickupTime === time ? "bg-primary" : "bg-neutral-100"
                  } active:opacity-80`}
                >
                  <Text className={`font-medium ${pickupTime === time ? "text-white" : "text-neutral-700"}`}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Order Summary */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold mb-3">Order Summary</Text>

            <View className="gap-2">
              <View className="flex-row justify-between">
                <Text className="text-neutral-600">Subtotal</Text>
                <Text className="font-medium">₹{total}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-neutral-600">Taxes & Fees</Text>
                <Text className="font-medium">₹0</Text>
              </View>
              <View className="border-t border-neutral-200 pt-2 mt-2">
                <View className="flex-row justify-between">
                  <Text className="text-xl font-bold">Total</Text>
                  <Text className="text-xl font-bold text-primary">₹{total}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Payment Method */}
          <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <Text className="text-lg font-semibold mb-3">Payment Method</Text>
            <View className="bg-accent/10 px-4 py-3 rounded-xl">
              <Text className="text-secondary font-medium text-center">Pay at Store</Text>
            </View>
            <Text className="text-neutral-600 text-center mt-2 text-sm">UPI integration coming soon</Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View className="px-6 py-4 bg-white border-t border-neutral-200">
        <Button onPress={handlePlaceOrder} title={`Place Order • ₹${total}`} size="lg" />
      </View>
    </SafeAreaView>
  )
}
