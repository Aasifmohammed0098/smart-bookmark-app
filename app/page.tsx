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

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-5">
        Welcome {user.email}
      </h1>

      <AddBookmark user={user} />

      <BookmarkList user={user} />

    </div>
  )
}

