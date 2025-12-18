import { View, Text } from "react-native"

interface BadgeProps {
  label: string
  variant?: "default" | "success" | "warning" | "error"
  size?: "sm" | "md"
}

export function Badge({ label, variant = "default", size = "md" }: BadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-secondary/10"
      case "warning":
        return "bg-accent/10"
      case "error":
        return "bg-red-100"
      default:
        return "bg-neutral-100"
    }
  }

  const getTextStyles = () => {
    switch (variant) {
      case "success":
        return "text-secondary"
      case "warning":
        return "text-accent-dark"
      case "error":
        return "text-red-700"
      default:
        return "text-neutral-700"
    }
  }

  const sizeStyles = size === "sm" ? "px-2 py-1" : "px-3 py-1.5"

  return (
    <View className={`${getVariantStyles()} ${sizeStyles} rounded-full`}>
      <Text className={`${getTextStyles()} text-sm font-medium`}>{label}</Text>
    </View>
  )
}
