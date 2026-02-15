"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function BookmarkList({ user }: any) {

  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch bookmarks
  const fetchBookmarks = async () => {

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (!error && data) {
      setBookmarks(data)
    }

    setLoading(false)
  }

  // Real-time subscription
  useEffect(() => {

    fetchBookmarks()

    const channel = supabase
      .channel("bookmarks-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks"
        },
        () => {
          fetchBookmarks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [])

  // Delete bookmark
  const handleDelete = async (id: string) => {

    const confirmDelete = confirm("Delete this bookmark?")

    if (!confirmDelete) return

    await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)

  }

  if (loading) {
    return <p className="mt-5">Loading bookmarks...</p>
  }

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
          className="border p-3 mb-2 rounded flex justify-between"
        >

          <div>

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

          <button
            onClick={() => handleDelete(bookmark.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  )
}

