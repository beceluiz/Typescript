import { Schema, model } from "mongoose";

interface MSchema {
  name: string;
  year: number;
  rating: number;
  createdAt: Date;
}

const movieSchema = new Schema<MSchema>({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const MovieModel = model<MSchema>("Movie", movieSchema);

export default MovieModel;
