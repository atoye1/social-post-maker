"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  
  // Redirect to editor page on mount
  useEffect(() => {
    router.push("/editor")
  }, [router])
  
  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Loading Editor...</h1>
        <p className="text-gray-600">Redirecting to the editor page</p>
      </div>
    </div>
  )
}