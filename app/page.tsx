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
      <div className="flex justify-center gap-10 relative items-center flex-col w-full h-full lg:h-5/6  lg:w-4/6">
        <Image
          src="/list.webp"
          fill
          placeholder="blur"
          blurDataURL="data:..."
          style={{
            zIndex: -1,
          }}
          priority
          alt="background list"
          title="background list"
        />
        <h1 className="text-2xl lg:text-6xl">To do list {formattedDate} </h1>
        <div>
          <div className="flex justify-center">
            <Form />
          </div>
          <div className="flex mt-20 lg:text-2xl flex-col gap-5">
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
