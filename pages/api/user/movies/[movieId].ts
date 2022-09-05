import { addMovie } from './../../../../utils/addMovie';
import { Genres, MovieDetails, ProductionCompanies } from '../../../../typings';
import { authOptions } from '../../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../../lib/connectDb";
import Movie from '../../../../models/Movie';
import User from '../../../../models/User';
import {unstable_getServerSession} from 'next-auth/next';
import Genre from '../../../../models/Genre';
import mongoose from 'mongoose';
import ProductionCompany from '../../../../models/ProductionCompanies';
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const session=await unstable_getServerSession(req,res,authOptions);
    if(!session){
        res.status(401).json({success:false,message:"Please authenticate"});
    }
    else{
        
    }
    await connectDb();
    const { method } = req
    const {movieId}=req.query;
    console.log('fing');
    
    if(method==='POST'){
        try{
            const user=await User.findOne({email:session?.user?.email});
            // console.log(user);
            const movie=JSON.parse(req.body) as MovieDetails;
            await addMovie(movieId as string,movie);
            const movieRef=await Movie.findOne({id:movieId});
            console.log(movieRef);
            await user?.MoviesList.push({ListType:"WatchList",MovieRef:movieRef?._id});
            console.log(user);
            await user?.save();
            res.status(201).json({success:true});
        } catch (error) {
            console.log(error);
            res.status(400).json({ success: false ,error});
        }
    }
    else if(method==='GET'){
        const user=await User.findOne({email:session?.user?.email});
        const movie=JSON.parse(req.body) as MovieDetails;
        await addMovie(movieId as string,movie);
        const movieExists=await Movie.exists({id:movieId});
        if(user?.MoviesList.find((movie)=>{
            return (movie?.MovieRef)===(movieExists?._id);
        })){
            res.status(201).json({success:false})
        }
    }
}