"use client"

import BookmarkList from "@/components/BookmarkList"
import AddBookmark from "@/components/AddBookmark"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Home() {

  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login")
      } else {
        setUser(data.user)
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading...
      </div>
    )
  }

  return (

    <div className="min-h-screen animated-bg">

      <div className="max-w-2xl mx-auto p-6">

        {/* Header */}
        <div className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-5">

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Smart Bookmark Manager
            </h1>

            <p className="text-gray-700 text-sm">
              {user.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

        {/* Add Bookmark */}
        <div className="bg-white shadow-lg rounded p-4 mb-5">
          <AddBookmark user={user} />
        </div>

        {/* Bookmark List */}
        <div className="bg-white shadow-lg rounded p-4">
          <BookmarkList user={user} />
        </div>

      </div>

    </div>

  )
}


