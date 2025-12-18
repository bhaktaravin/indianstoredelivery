"use client"

import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useStore } from "../store"
import { Header } from "../components/Header"
import { Card, CardContent } from "../components/Card"

export default function DashboardPage() {
  const router = useRouter()
  const orders = useStore((state) => state.orders)
  const user = useStore((state) => state.user)

  const todayOrders = orders.filter((order) => {
    const today = new Date().toDateString()
    const orderDate = new Date(order.createdAt).toDateString()
    return today === orderDate
  })

  const pendingOrders = orders.filter((order) => order.status === "pending")
  const readyOrders = orders.filter((order) => order.status === "ready")
  const completedOrders = orders.filter((order) => order.status === "completed")
  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0)

  if (user?.role !== "business") {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <Header title="Business Dashboard" />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-xl font-semibold mb-4">Business Account Required</Text>
          <Text className="text-neutral-600 text-center mb-6">Switch to business mode to access the dashboard</Text>
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
      <Header title="Business Dashboard" showBack={false} />

      <ScrollView className="px-6 py-6">
        {/* Stats Grid */}
        <View className="flex-row flex-wrap gap-3 mb-6">
          <Card className="flex-1 min-w-[45%]">
            <CardContent>
              <Text className="text-neutral-600 mb-2">Today's Orders</Text>
              <Text className="text-3xl font-bold text-primary">{todayOrders.length}</Text>
            </CardContent>
          </Card>

          <Card className="flex-1 min-w-[45%]">
            <CardContent>
              <Text className="text-neutral-600 mb-2">Pending</Text>
              <Text className="text-3xl font-bold text-accent-dark">{pendingOrders.length}</Text>
            </CardContent>
          </Card>

          <Card className="flex-1 min-w-[45%]">
            <CardContent>
              <Text className="text-neutral-600 mb-2">Ready</Text>
              <Text className="text-3xl font-bold text-secondary">{readyOrders.length}</Text>
            </CardContent>
          </Card>

          <Card className="flex-1 min-w-[45%]">
            <CardContent>
              <Text className="text-neutral-600 mb-2">Completed</Text>
              <Text className="text-3xl font-bold text-neutral-600">{completedOrders.length}</Text>
            </CardContent>
          </Card>

          <Card className="flex-1 w-full">
            <CardContent>
              <Text className="text-neutral-600 mb-2">Today's Revenue</Text>
              <Text className="text-3xl font-bold text-primary">₹{todayRevenue}</Text>
            </CardContent>
          </Card>
        </View>

        <Text className="text-xl font-bold font-heading mb-4">Quick Actions</Text>

        <View className="gap-3 mb-6">
          <TouchableOpacity
            onPress={() => router.push("/orders")}
            className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center justify-between active:opacity-80"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-4">
                <Text className="text-2xl">📦</Text>
              </View>
              <View>
                <Text className="text-lg font-semibold">View Orders</Text>
                <Text className="text-neutral-600">Manage incoming orders</Text>
              </View>
            </View>
            {pendingOrders.length > 0 && (
              <View className="bg-accent px-3 py-1 rounded-full">
                <Text className="text-secondary font-semibold">{pendingOrders.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/products")}
            className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center active:opacity-80"
          >
            <View className="w-12 h-12 bg-secondary/10 rounded-full items-center justify-center mr-4">
              <Text className="text-2xl">🛍️</Text>
            </View>
            <View>
              <Text className="text-lg font-semibold">Manage Products</Text>
              <Text className="text-neutral-600">Add or edit your menu</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/qr-code")}
            className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center active:opacity-80"
          >
            <View className="w-12 h-12 bg-accent/10 rounded-full items-center justify-center mr-4">
              <Text className="text-2xl">📱</Text>
            </View>
            <View>
              <Text className="text-lg font-semibold">QR Codes</Text>
              <Text className="text-neutral-600">Generate store QR codes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/business-profile")}
            className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center active:opacity-80"
          >
            <View className="w-12 h-12 bg-neutral-200 rounded-full items-center justify-center mr-4">
              <Text className="text-2xl">⚙️</Text>
            </View>
            <View>
              <Text className="text-lg font-semibold">Business Profile</Text>
              <Text className="text-neutral-600">Edit store information</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Insights */}
        <Text className="text-xl font-bold font-heading mb-4">Insights</Text>

        <Card className="mb-6">
          <CardContent>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold">Customer Engagement</Text>
              <Text className="text-accent font-semibold">+24%</Text>
            </View>

            <View className="gap-3">
              <View className="flex-row justify-between">
                <Text className="text-neutral-600">QR Code Scans</Text>
                <Text className="font-semibold">45</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-neutral-600">Profile Views</Text>
                <Text className="font-semibold">127</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-neutral-600">Repeat Customers</Text>
                <Text className="font-semibold">23</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}
