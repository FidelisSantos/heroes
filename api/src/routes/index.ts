import { Application, Router } from "express";
import HeroRoutes from "./HeroRoutes.js";


class Routes {
  public router = Router();
  private heroRoutes = new HeroRoutes();

  constructor(private app: Application) {
    this.app.use("/hero",this.heroRoutes.router);
    this.app.get("/online", (req, res) => {
      res.send("online");
    })
  }
}

export default Routes;