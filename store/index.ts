import { create } from "zustand"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  businessId: string
  available: boolean
}

export interface Business {
  id: string
  name: string
  category: string
  image: string
  address: string
  phone: string
  whatsapp: string
  isOpen: boolean
  rating: number
  distance: number
  offer?: string
  latitude: number
  longitude: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  businessId: string
  items: CartItem[]
  total: number
  status: "pending" | "ready" | "completed"
  pickupTime: string
  createdAt: string
}

interface AppState {
  user: { id: string; name: string; role: "customer" | "business" } | null
  cart: CartItem[]
  businesses: Business[]
  products: Product[]
  orders: Order[]

  // Actions
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  placeOrder: (pickupTime: string) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  setUser: (user: AppState["user"]) => void
}

// Mock data
const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Sharma Kirana Store",
    category: "Grocery",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
    address: "123 MG Road, Delhi",
    phone: "+91 98765 43210",
    whatsapp: "+919876543210",
    isOpen: true,
    rating: 4.5,
    distance: 0.5,
    offer: "10% off on orders above ₹500",
    latitude: 28.6139,
    longitude: 77.209,
  },
  {
    id: "2",
    name: "Cafe Chai Point",
    category: "Cafe",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
    address: "45 Park Street, Kolkata",
    phone: "+91 98765 43211",
    whatsapp: "+919876543211",
    isOpen: true,
    rating: 4.7,
    distance: 1.2,
    offer: "Free samosa with chai",
    latitude: 28.6129,
    longitude: 77.2095,
  },
  {
    id: "3",
    name: "Rajesh Hair Salon",
    category: "Salon",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400",
    address: "78 Brigade Road, Bangalore",
    phone: "+91 98765 43212",
    whatsapp: "+919876543212",
    isOpen: false,
    rating: 4.3,
    distance: 2.1,
    latitude: 28.6119,
    longitude: 77.21,
  },
]

const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Masala Chai",
    price: 20,
    image: "https://images.unsplash.com/photo-1597318181390-8a9728c36860?w=300",
    businessId: "2",
    available: true,
  },
  {
    id: "p2",
    name: "Samosa (2 pcs)",
    price: 30,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300",
    businessId: "2",
    available: true,
  },
  {
    id: "p3",
    name: "Atta (5kg)",
    price: 250,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
    businessId: "1",
    available: true,
  },
  {
    id: "p4",
    name: "Rice (10kg)",
    price: 600,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
    businessId: "1",
    available: true,
  },
]

export const useStore = create<AppState>((set, get) => ({
  user: { id: "1", name: "Amit Kumar", role: "customer" },
  cart: [],
  businesses: mockBusinesses,
  products: mockProducts,
  orders: [],

  addToCart: (product) => {
    const cart = get().cart
    const existing = cart.find((item) => item.id === product.id)

    if (existing) {
      set({
        cart: cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
      })
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] })
    }
  },

  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.id !== productId) })
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId)
      return
    }

    set({
      cart: get().cart.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    })
  },

  clearCart: () => set({ cart: [] }),

  placeOrder: (pickupTime) => {
    const cart = get().cart
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      businessId: cart[0].businessId,
      items: cart,
      total,
      status: "pending",
      pickupTime,
      createdAt: new Date().toISOString(),
    }

    set({
      orders: [...get().orders, newOrder],
      cart: [],
    })
  },

  updateOrderStatus: (orderId, status) => {
    set({
      orders: get().orders.map((order) => (order.id === orderId ? { ...order, status } : order)),
    })
  },

  setUser: (user) => set({ user }),
}))
