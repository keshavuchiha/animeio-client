import mongoose from "mongoose";
import { Genres } from "../typings";

const genreSchema=new mongoose.Schema<Genres>({
    id:Number,
    name:String
})
export default mongoose.models.Genres || mongoose.model('Genres',genreSchema);