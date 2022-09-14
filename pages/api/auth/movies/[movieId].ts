import { MovieDetails } from '../../../../typings';
import { NextApiRequest,NextApiResponse } from 'next';
import connectDb from '../../../../lib/connectDb';
import Movie from '../../../../models/Movie';


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    await connectDb();
    const {method}=req;
    const {movieId}=req.query;
    // console.log("movie",movieId);
    if(method==='GET'){
        try{
            const movie=await Movie.findOne({_id:movieId});
            res.status(201).json({success:true,data:movie});
        }
        catch (error){
            res.status(400).json({ success: false,error});
        }
    }
}