import prisma from "@/prisma/client";
import Form from "@/components/Form";
import Todo from "@/components/Todo";
import Image from "next/image";
import React from "react";

const today = new Date();
const formatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const formattedDate = formatter.format(today);

export default async function Home() {
  const data = await prisma.toDos.findMany();

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <div className="flex justify-center gap-36 relative items-center flex-col h-5/6  w-4/6">
        <Image
          src="/list.webp"
          fill
          placeholder="blur"
          blurDataURL="data:..."
          style={{
            objectFit: "cover",
            zIndex: -1,
          }}
          priority
          alt="background list"
          title="background list"
        />
        <h1 className="text-6xl">To do list {formattedDate} </h1>
        <div>
          <div className="flex justify-center">
            <Form />
          </div>
          <div className="flex mt-20 text-2xl flex-col gap-5">
            {data.map((todo: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <Todo todo={todo} />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <span>made by Cedric Morreau</span>
      </div>
    </main>
  );
}
