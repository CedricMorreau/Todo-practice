import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type dataProps = {
  title: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const todo: dataProps = JSON.parse(req.body);

    if (req.method === "POST") {
      if (!todo.title.length) {
        return res
          .status(400)
          .json({ message: "Please do not leave this empty" });
      }

      try {
        const data = await prisma.toDos.create({
          data: {
            title: todo.title,
          },
        });

        return res.status(200).json(data);
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error creating a new todo" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
