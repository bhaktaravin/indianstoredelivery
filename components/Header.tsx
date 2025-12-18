"use client"

import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"

interface HeaderProps {
  title: string
  showBack?: boolean
  rightAction?: {
    label: string
    onPress: () => void
  }
}

export function Header({ title, showBack = true, rightAction }: HeaderProps) {
  const router = useRouter()

  return (
    <View className="px-6 py-4 bg-white border-b border-neutral-200">
      <View className="flex-row items-center justify-between">
        {showBack ? (
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-primary text-lg">← Back</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        {rightAction && (
          <TouchableOpacity onPress={rightAction.onPress}>
            <Text className="text-primary text-lg">{rightAction.label}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text className="text-2xl font-bold font-heading mt-2">{title}</Text>
    </View>
  )
}
