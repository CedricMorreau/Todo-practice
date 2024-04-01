"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const [todo, setTodo] = useState("");
  const router = useRouter();

  async function submitPost(e: React.FormEvent) {
    e.preventDefault();

    const data = await fetch("/api/createPost", {
      method: "POST",
      body: JSON.stringify({
        title: todo,
      }),
    });

    const res = await data.json();

    router.refresh();

    //refreshes the page everytime a todo gets added
  }
  return (
    <form className="flex items-end gap-5" onSubmit={submitPost}>
      <input
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        type="text"
        className="border-b-2 focus:outline-none lg:w-80 border-black bg-transparent lg:text-2xl"
      />
      <button
        className="lg:text-2xl group transition duration-800 ease-out"
        type="submit">
        <span className="inline-block bg-left-bottom bg-gradient-to-r from-black/50 to-black/50 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out cursor-pointer">
          ToDo!
        </span>
      </button>
    </form>
  );
}
