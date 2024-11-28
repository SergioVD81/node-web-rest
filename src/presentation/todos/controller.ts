import { Request, Response } from "express";

interface Data {
  id: number;
  text: string;
  createdAt: Date;
}
const data: Data[] = [
  {
    id: 1,
    text: "Buy milk",
    createdAt: new Date(),
  },
  {
    id: 2,
    text: "Buy bread",
    createdAt: new Date(),
  },
  {
    id: 3,
    text: "Buy water",
    createdAt: new Date(),
  },
];
export class TodosController {
  //*DI
  constructor() {}

  public getTodos(req: Request, res: Response) {
    res.json(data);
  }
  public geTodoById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!this.validateId(id)) {
      res.status(400).json({ message: "Id no válido" });
      return;
    }

    const product = data.filter((ele) => ele.id === id);
    if (product.length === 0) {
      res
        .status(404)
        .json({ message: "No se encuentra el producto con el id" });
      return;
    }
    res.status(200).json(product);
  };

  public createTodo = (req: Request, res: Response) => {
    const index = data.length + 1;

    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "Text property is required" });
      return;
    }

    const product = {
      id: index,
      text: text,
      createdAt: new Date(),
    };

    data.push(product);
    res.status(200).json(data);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const text = req.body.text;
    const update = data.find((ele) => {
      if (ele.id === id) {
        ele.text = text ?? ele.text;
        ele.createdAt = new Date();
      }
      return ele;
    });
    if (!update?.id) {
      res.status(404).json({ error: "The product has not been found" });
    }

    res.status(200).json(update);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!this.validateId(id)) {
      res.status(404).json({ message: `The id:${id} do not exist` });
      return;
    }
    const pos = data.findIndex((ele) => ele.id === id);
    console.log(pos);
    if (pos === -1) {
      res.status(404).json({ message: `The id:${id} do not exist` });
      return;
    }
    data.splice(pos, 1);
    res.status(200).json(data);
  };

  private validateId = (id: number): boolean => {
    if (isNaN(id) || data.length + 1 < id) {
      return false;
    }
    return true;
  };
}
