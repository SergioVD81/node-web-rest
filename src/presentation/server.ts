import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  public_path?: string;
  routes: Router;
}
export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }
  async start() {
    //*Middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); //Para recibie el cuerpo del formulario en formato x-www-form-urlencoded
    //*Routes
    this.app.use(this.routes);
    //*Public folder
    this.app.use(express.static(this.publicPath));
    // this.app.get("*", (req, res) => {
    //   const indexPath = path.join(
    //     __dirname + `../../${this.publicPath}/index.html`
    //   );
    // });
    this.app.listen(this.port, () => {
      console.log(`listening on port ${this.port}`);
    });
  }
}
