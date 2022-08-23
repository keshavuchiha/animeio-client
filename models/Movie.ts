import mongoose from "mongoose";
import { Schema } from "tabler-icons-react";
import { MovieDetails } from "../typings";

const movieSchema=new mongoose.Schema<MovieDetails>({
    id:{
        type:String,
        index:true,
    },
    adult:Boolean,
    backdrop_path:String,
    genres:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Genre'
    }],
    homepage:String,
    original_title:String,
    orignal_language:String,
    overview:String,
    popularity:Number,
    poster_path:String,
    production_companies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProductionCompany'
    }],
    release_date:String,
    revenue:Number,
    runtime:String,
    status:{
        type:String,
        enum:["Rumored","Planned" , "In Production", "Released","Canceled"],
        default:"Released"
    },
    title:String,
    video:String,
    vote_average:Number,
    vote_count:Number,
},{timestamps:true})

export default mongoose.models.Movie || mongoose.model('Movie',movieSchema);