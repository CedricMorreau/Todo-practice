"use client";

import React from "react";
import Todo from "./Todo";

export default function ClientTodo(props: any) {
  return (
    <div className="flex mt-20 lg:text-2xl flex-col gap-5">
      {props.data.map((todo: any, index: number) => {
        return (
          <React.Fragment key={index}>
            <Todo todo={todo} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
