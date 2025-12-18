"use client"

import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useStore } from "../store"
import { Header } from "../components/Header"

export default function ProfilePage() {
  const router = useRouter()
  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)

  const handleLogout = () => {
    setUser(null)
    router.push("/")
  }

  const toggleRole = () => {
    if (user) {
      setUser({
        ...user,
        role: user.role === "customer" ? "business" : "customer",
      })
    }
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <Header title="Profile" showBack={false} />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-xl font-semibold mb-4">Please sign in</Text>
          <TouchableOpacity
            onPress={() =>
              setUser({
                id: "1",
                name: "Amit Kumar",
                role: "customer",
              })
            }
            className="bg-primary py-4 px-8 rounded-full active:opacity-80"
          >
            <Text className="text-white font-semibold text-lg">Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <Header title="Profile" showBack={false} />

      <ScrollView className="px-6 py-6">
        {/* User Info */}
        <View className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <Text className="text-2xl font-bold font-heading mb-2">{user.name}</Text>
          <Text className="text-neutral-600 capitalize">{user.role} Account</Text>
        </View>

        {/* Menu Items */}
        <View className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden">
          <TouchableOpacity
            onPress={() => router.push("/orders")}
            className="p-4 border-b border-neutral-100 active:bg-neutral-50"
          >
            <Text className="text-lg">My Orders</Text>
          </TouchableOpacity>

          {user.role === "business" && (
            <>
              <TouchableOpacity
                onPress={() => router.push("/dashboard")}
                className="p-4 border-b border-neutral-100 active:bg-neutral-50"
              >
                <Text className="text-lg">Business Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/products")}
                className="p-4 border-b border-neutral-100 active:bg-neutral-50"
              >
                <Text className="text-lg">Manage Products</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={toggleRole} className="p-4 border-b border-neutral-100 active:bg-neutral-50">
            <Text className="text-lg">Switch to {user.role === "customer" ? "Business" : "Customer"} Mode</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} className="p-4 active:bg-neutral-50">
            <Text className="text-lg text-red-600">Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Language Section */}
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <Text className="text-lg font-semibold mb-3">Language</Text>
          <View className="flex-row gap-2">
            <TouchableOpacity className="px-4 py-2 bg-primary rounded-xl active:opacity-80">
              <Text className="text-white font-medium">English</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-neutral-100 rounded-xl active:opacity-80">
              <Text className="text-neutral-700 font-medium">हिंदी (Coming Soon)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
