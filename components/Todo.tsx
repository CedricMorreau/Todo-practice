"use client";

import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Todo(props: any) {
  const [editable, setEditable] = useState(false);
  const inputRef = useRef(props.title);
  const router = useRouter();

  const editTodo = async () => {
    try {
      const id = props.todo.id;
      const response = await fetch("/api/editPost", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: inputRef.current.value,
        }),
      });
      //refreshes the page everytime a todo gets edited
      router.refresh();

      if (!response.ok) {
        throw new Error("Failed to edit todo");
      }
      setEditable(false);
    } catch (error) {
      console.error("Error edit todo:", error);
    }
  };

  const deleteTodo = async () => {
    try {
      const id = props.todo.id;
      const response = await fetch("/api/deletePost", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      //refreshes the page everytime a todo gets deleted
      router.refresh();
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="flex  gap-5">
      {editable ? (
        <input ref={inputRef} type="text" defaultValue={props.todo.title} />
      ) : (
        <>
          <p>{props.todo.title}</p>
          <span>|</span>
        </>
      )}
      <div>
        <button
          className=" px-2  group transition duration-800 ease-out"
          onClick={() => deleteTodo()}>
          <span className="inline-block h-7 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-500 ease-out cursor-pointer">
            Delete todo
          </span>
        </button>
        <button
          onClick={() => setEditable(true)}
          className="px-2 group transition duration-800 ease-out">
          <span className="inline-block h-7 bg-left-bottom bg-gradient-to-r from-orange-500 to-orange-500 bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-500 ease-out cursor-pointer">
            Edit
          </span>
        </button>
        <button
          onClick={editTodo}
          className="px-2 group transition duration-800 ease-out">
          <span className="inline-block h-7 bg-left-bottom bg-gradient-to-r from-green-500 to-green-500 bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-500 ease-out cursor-pointer">
            Save
          </span>
        </button>
      </div>
    </div>
  );
}
