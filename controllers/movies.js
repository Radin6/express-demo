import { MovieModel } from "../models/movie.js"
import { validateMovie } from "../schema/movies.js"

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({genre})
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({id})
  
    if (movie) return res.json(movie)
  
    res.status(404).json({message: "movie not found"});
  }

  static async create (req, res) {
    const result = validateMovie(req.body)
  
    if (!result.success) {
      return res.status(400).json({error: JSON.parse(result.error.message)})
    }
  
    const newMovie = await MovieModel.create({input: result.data})
  
    res.status(201).json({message: `The movie ${newMovie.title} has been added`})
  }

  static async deleteById (req, res) {
    const { id } = req.params
    const result = await MovieModel.deleteById({id})
  
    if (!result) return res.status(404).json({message: "Movie not found"})
  
    res.status(200).json({message: "Movie Deleted"})
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validatePartialMovie(req.body)
  
    if (!result.success) {
      return res.status(400).json({error: JSON.parse(result.error.message)})
    }
  
    const updatedMovie = await MovieModel.update({id: id, input: result.body})
  
    if (!updatedMovie) return res.status(404).json({message: "movie not found"});
  
    return res.json(updatedMovie)
  }
}