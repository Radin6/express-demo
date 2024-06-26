import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/:id', MovieController.getById)
moviesRouter.post('/', MovieController.create)
moviesRouter.delete("/:id", MovieController.deleteById)
moviesRouter.patch("/:id", MovieController.update)