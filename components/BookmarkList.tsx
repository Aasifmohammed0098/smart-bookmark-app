"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function BookmarkList({ user }: any) {

  const [bookmarks, setBookmarks] = useState<any[]>([])

  async function fetchBookmarks() {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setBookmarks(data || [])
  }

  async function deleteBookmark(id: string) {
    await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)

    fetchBookmarks()
  }

  useEffect(() => {

    fetchBookmarks()

    const channel = supabase
      .channel("bookmarks-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
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

  return (
    <div className="mt-5">

      <h2 className="text-xl font-bold mb-3">Your Bookmarks</h2>

      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="border p-3 mb-2 flex justify-between">

          <div>
            <div className="font-semibold">{bookmark.title}</div>
            <a href={bookmark.url} target="_blank" className="text-blue-500">
              {bookmark.url}
            </a>
          </div>

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            className="bg-red-500 text-white px-3 py-1"
          >
            Delete
          </button>

        </div>
      ))}

    </div>
  )
}
