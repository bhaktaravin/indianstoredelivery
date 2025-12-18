"use client"

import { View, ScrollView, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react"
import { useStore } from "../store"
import { Header } from "../components/Header"
import { OrderCard } from "../components/OrderCard"
import { EmptyState } from "../components/EmptyState"
import { Button } from "../components/Button"

export default function OrdersPage() {
  const router = useRouter()
  const orders = useStore((state) => state.orders)
  const user = useStore((state) => state.user)
  const updateOrderStatus = useStore((state) => state.updateOrderStatus)

  const [filter, setFilter] = useState<"all" | "pending" | "ready" | "completed">("all")

  const isBusinessView = user?.role === "business"

  const filteredOrders = filter === "all" ? orders : orders.filter((order) => order.status === filter)

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <Header title={isBusinessView ? "Manage Orders" : "My Orders"} />

      {/* Filter Tabs */}
      {isBusinessView && (
        <View className="px-6 py-4 flex-row gap-2">
          {(["all", "pending", "ready", "completed"] as const).map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl ${filter === status ? "bg-primary" : "bg-neutral-200"}`}
            >
              <Text className={`font-medium capitalize ${filter === status ? "text-white" : "text-neutral-700"}`}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {filteredOrders.length === 0 ? (
        <>
          <EmptyState
            icon="📦"
            title={isBusinessView ? "No orders" : "No orders yet"}
            description={
              isBusinessView
                ? filter === "all"
                  ? "New orders will appear here"
                  : `No ${filter} orders`
                : "Your order history will appear here once you place an order"
            }
          />
          {!isBusinessView && (
            <View className="px-6 pb-6">
              <Button onPress={() => router.push("/businesses")} title="Start Shopping" />
            </View>
          )}
        </>
      ) : (
        <ScrollView className="px-6 py-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isBusinessView={isBusinessView}
              onStatusChange={isBusinessView ? updateOrderStatus : undefined}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
