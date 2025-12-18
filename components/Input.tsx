import { TextInput, View, Text } from "react-native"

interface InputProps {
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
  label?: string
  multiline?: boolean
  numberOfLines?: number
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad"
  className?: string
}

export function Input({
  placeholder,
  value,
  onChangeText,
  label,
  multiline = false,
  numberOfLines = 1,
  keyboardType = "default",
  className = "",
}: InputProps) {
  return (
    <View className={className}>
      {label && <Text className="text-neutral-700 font-medium mb-2">{label}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        className="bg-white px-4 py-3 rounded-xl border border-neutral-200 text-base"
        placeholderTextColor="#A8A29E"
      />
    </View>
  )
}
