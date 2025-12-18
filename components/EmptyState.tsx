import { View, Text } from "react-native"

interface EmptyStateProps {
  icon: string
  title: string
  description: string
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <View className="items-center justify-center py-12 px-6">
      <Text className="text-6xl mb-4">{icon}</Text>
      <Text className="text-xl font-semibold mb-2 text-center">{title}</Text>
      <Text className="text-neutral-600 text-center">{description}</Text>
    </View>
  )
}
