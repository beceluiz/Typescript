import mongoose, { Schema, model } from "mongoose";

interface MSchema {
  id: number;
  name: string;
  year: number;
  rating: number;
}

const movieSchema = new Schema<MSchema>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true },
});

const MovieModel = model<MSchema>("Movie", movieSchema);

export default MovieModel;
