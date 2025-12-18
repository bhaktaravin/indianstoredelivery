import { TouchableOpacity, Text, ActivityIndicator } from "react-native"

interface ButtonProps {
  onPress: () => void
  title: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
}

export function Button({
  onPress,
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary"
      case "outline":
        return "bg-transparent border-2 border-primary"
      default:
        return "bg-primary"
    }
  }

  const getTextStyles = () => {
    switch (variant) {
      case "outline":
        return "text-primary"
      default:
        return "text-white"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "py-2 px-4"
      case "lg":
        return "py-5 px-8"
      default:
        return "py-3 px-6"
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        rounded-full
        items-center
        justify-center
        ${disabled ? "opacity-50" : "active:opacity-80"}
      `}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? "#FF8C42" : "#FFFFFF"} />
      ) : (
        <Text className={`${getTextStyles()} font-semibold text-lg`}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}
