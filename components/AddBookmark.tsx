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

    const { error } = await supabase
      .from("bookmarks")
      .insert([
        {
          title: title,
          url: url,
          user_id: user.id
        }
      ])

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Bookmark saved successfully")
      setTitle("")
      setUrl("")
    }

  }

  return (
    <div className="mt-5">

      <input
        placeholder="Bookmark Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        className="border p-2 mr-2"
      />

      <input
        placeholder="Bookmark URL"
        value={url}
        onChange={(e)=>setUrl(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={handleAdd}
        className="bg-green-500 text-white px-4 py-2"
      >
        {loading ? "Saving..." : "Add Bookmark"}
      </button>

    </div>
  )
}

