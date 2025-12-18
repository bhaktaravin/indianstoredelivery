import { View, Text, Image, TouchableOpacity } from "react-native"
import type { Product } from "../store"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm">
      <Image source={{ uri: product.image }} className="w-full h-32 rounded-xl mb-3" resizeMode="cover" />

      <Text className="text-lg font-semibold mb-1">{product.name}</Text>
      <Text className="text-primary text-xl font-bold mb-3">₹{product.price}</Text>

      {product.available ? (
        <TouchableOpacity onPress={() => onAddToCart(product)} className="bg-primary py-3 rounded-xl active:opacity-80">
          <Text className="text-white text-center font-semibold">Add to Cart</Text>
        </TouchableOpacity>
      ) : (
        <View className="bg-neutral-200 py-3 rounded-xl">
          <Text className="text-neutral-600 text-center font-semibold">Out of Stock</Text>
        </View>
      )}
    </View>
  )
}
