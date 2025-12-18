import { View, Text, TouchableOpacity } from "react-native"
import type { Order } from "../store"
import { Badge } from "./Badge"

interface OrderCardProps {
  order: Order
  onStatusChange?: (orderId: string, status: Order["status"]) => void
  isBusinessView?: boolean
}

export function OrderCard({ order, onStatusChange, isBusinessView = false }: OrderCardProps) {
  const getStatusVariant = (status: Order["status"]) => {
    switch (status) {
      case "ready":
        return "success"
      case "completed":
        return "default"
      default:
        return "warning"
    }
  }

  const statusLabel = {
    pending: "Pending",
    ready: "Ready for Pickup",
    completed: "Completed",
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold">Order #{order.id.slice(-6)}</Text>
          <Text className="text-neutral-600 text-sm">{formatDate(order.createdAt)}</Text>
        </View>
        <Badge label={statusLabel[order.status]} variant={getStatusVariant(order.status)} />
      </View>

      <View className="mb-3">
        {order.items.map((item) => (
          <View key={item.id} className="flex-row justify-between mb-2">
            <Text className="text-neutral-700">
              {item.quantity}x {item.name}
            </Text>
            <Text className="text-neutral-700">₹{item.price * item.quantity}</Text>
          </View>
        ))}
      </View>

      <View className="border-t border-neutral-200 pt-3 mb-3">
        <View className="flex-row justify-between mb-2">
          <Text className="text-lg font-bold">Total</Text>
          <Text className="text-lg font-bold text-primary">₹{order.total}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-neutral-600">Pickup Time</Text>
          <Text className="text-neutral-700 font-medium">{order.pickupTime}</Text>
        </View>
      </View>

      {isBusinessView && order.status !== "completed" && onStatusChange && (
        <View className="flex-row gap-2">
          {order.status === "pending" && (
            <TouchableOpacity
              onPress={() => onStatusChange(order.id, "ready")}
              className="flex-1 bg-secondary py-3 rounded-xl active:opacity-80"
            >
              <Text className="text-white text-center font-semibold">Mark Ready</Text>
            </TouchableOpacity>
          )}
          {order.status === "ready" && (
            <TouchableOpacity
              onPress={() => onStatusChange(order.id, "completed")}
              className="flex-1 bg-primary py-3 rounded-xl active:opacity-80"
            >
              <Text className="text-white text-center font-semibold">Complete Order</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  )
}
