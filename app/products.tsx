"use client"

import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import { useStore } from "../store"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

export default function ProductsPage() {
  const router = useRouter()
  const user = useStore((state) => state.user)
  const products = useStore((state) => state.products)

  const [showAddModal, setShowAddModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })

  const businessProducts = products.filter((p) => p.businessId === user?.id || p.businessId === "1")

  const handleAddProduct = () => {
    // In real app, this would add to database
    setShowAddModal(false)
    setNewProduct({ name: "", price: "", image: "" })
  }

  if (user?.role !== "business") {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <Header title="Manage Products" />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-xl font-semibold mb-4">Business Account Required</Text>
          <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="bg-primary py-4 px-8 rounded-full active:opacity-80"
          >
            <Text className="text-white font-semibold text-lg">Go to Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <Header
        title="Manage Products"
        rightAction={{
          label: "+ Add",
          onPress: () => setShowAddModal(true),
        }}
      />

      <ScrollView className="px-6 py-6">
        {businessProducts.map((product) => (
          <View key={product.id} className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-lg font-semibold mb-1">{product.name}</Text>
                <Text className="text-primary text-xl font-bold mb-2">₹{product.price}</Text>
                <View className="flex-row gap-2">
                  <View
                    className={`px-3 py-1 rounded-full ${product.available ? "bg-secondary/10" : "bg-neutral-200"}`}
                  >
                    <Text
                      className={`text-sm font-medium ${product.available ? "text-secondary" : "text-neutral-600"}`}
                    >
                      {product.available ? "Available" : "Out of Stock"}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="gap-2">
                <TouchableOpacity className="bg-neutral-100 px-4 py-2 rounded-xl active:opacity-80">
                  <Text className="font-medium">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-red-100 px-4 py-2 rounded-xl active:opacity-80">
                  <Text className="font-medium text-red-700">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {businessProducts.length === 0 && (
          <View className="bg-white rounded-2xl p-8 items-center">
            <Text className="text-xl font-semibold mb-2">No products yet</Text>
            <Text className="text-neutral-600 text-center mb-6">Add your first product to get started</Text>
            <Button onPress={() => setShowAddModal(true)} title="Add Product" />
          </View>
        )}
      </ScrollView>

      {/* Add Product Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6 min-h-[70%]">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-2xl font-bold font-heading">Add Product</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text className="text-lg">✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Input
                label="Product Name"
                placeholder="e.g., Masala Chai"
                value={newProduct.name}
                onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
                className="mb-4"
              />

              <Input
                label="Price (₹)"
                placeholder="e.g., 20"
                value={newProduct.price}
                onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
                keyboardType="numeric"
                className="mb-4"
              />

              <Input
                label="Image URL"
                placeholder="https://..."
                value={newProduct.image}
                onChangeText={(text) => setNewProduct({ ...newProduct, image: text })}
                className="mb-6"
              />

              <Button onPress={handleAddProduct} title="Add Product" size="lg" />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
