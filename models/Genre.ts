import mongoose from "mongoose";
import { Genres } from "../typings";

const genreSchema=new mongoose.Schema<Genres>({
    id:String,
    name:String
})

export default mongoose.models.Genre || mongoose.model('Genre',genreSchema);