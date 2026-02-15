"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AddBookmark({ user }: any) {

  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {

    if (!title || !url) {
      alert("Enter title and URL")
      return
    }

    setLoading(true)

    await supabase
      .from("bookmarks")
      .insert([
        {
          title,
          url,
          user_id: user.id
        }
      ])

    setTitle("")
    setUrl("")
    setLoading(false)
  }

  return (

      <h2 className="text-lg font-semibold mb-3 text-gray-800">
    <div className="">

      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Add New Bookmark
      </h2>

      <div className="flex flex-col gap-3">

        <input
          placeholder="Bookmark Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        <div key={bookmark.id} className="">
          className=""
        />

        <input
          placeholder="Bookmark URL"
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
          className="border rounded p-2"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Saving..." : "Add Bookmark"}
        </button>

      </div>

    </div>
  )
}


