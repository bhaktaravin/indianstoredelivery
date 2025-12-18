import type React from "react"
import { View } from "react-native"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return <View className={`bg-white rounded-2xl shadow-sm ${className}`}>{children}</View>
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <View className={`p-4 border-b border-neutral-100 ${className}`}>{children}</View>
}

export function CardContent({ children, className = "" }: CardProps) {
  return <View className={`p-4 ${className}`}>{children}</View>
}
