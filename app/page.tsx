import prisma from "@/prisma/client";

export default async function Home() {
  const data = await prisma.toDos.findMany();
  console.log(data);

  return (
    <main>
      <div>
        {data.map((todo: any) => {
          return <p key={todo.id}>{todo.title}</p>;
        })}
      </div>
    </main>
  );
}
