"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the main index page
    router.push("/")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Local Bazaar</h1>
        <p className="text-neutral-600">Loading...</p>
      </div>
    </div>
  )
}
