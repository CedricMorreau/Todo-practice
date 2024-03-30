import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type DataProps = {
  id: number;
  title: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const todo: DataProps = req.body;

    if (req.method === "PUT") {
      try {
        const data = await prisma.toDos.update({
          where: {
            id: todo.id,
          },
          data: {
            title: todo.title,
          },
        });
        
        return res.status(200).json(data);
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error deleting a todo" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
