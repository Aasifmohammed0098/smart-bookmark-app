"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function BookmarkList({ user }: any) {

  const [bookmarks, setBookmarks] = useState<any[]>([])

  const fetchBookmarks = async () => {

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (!error && data) {
      setBookmarks(data)
    }

  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  return (

    <div className="mt-5">

      <h2 className="text-xl font-bold mb-3">
        Your Bookmarks
      </h2>

      {bookmarks.length === 0 && (
        <p>No bookmarks yet</p>
      )}

      {bookmarks.map((bookmark) => (

        <div
          key={bookmark.id}
          className="border p-3 mb-2 rounded"
        >

          <div className="font-semibold">
            {bookmark.title}
          </div>

          <a
            href={bookmark.url}
            target="_blank"
            className="text-blue-500"
          >
            {bookmark.url}
          </a>

        </div>

      ))}

    </div>

  )
}
