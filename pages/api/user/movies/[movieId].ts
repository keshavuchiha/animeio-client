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
    await connectDb();
    const { method } = req
    const {movieId}=req.query;
    if(method==='POST'){
        try{
            const user=await User.findOne({email:session?.user?.email});
            // console.log(user);
            const movie=JSON.parse(req.body) as MovieDetails;
            await addMovie(movieId as string,movie);
            const movieRef=await Movie.findOne({id:movieId});
            // console.log(movieRef);
            const index=user.MoviesList.map((u:any)=>{
                // console.log(u.MovieRef)
                return u.MovieRef.toString();
            }).indexOf(movieId);
            if(index>=0){
                res.status(201).json({success:true});
            }
            await user?.MoviesList.push({ListType:"WatchList",MovieRef:movieRef?._id});
            // console.log(user);
            await user?.save();
            res.status(201).json({success:true});
        } catch (error) {
            // console.log(error);
            res.status(400).json({ success: false ,error});
        }
    }
    else if(method==='GET'){
        const user=await User.findOne({email:session?.user?.email});
        const movie=JSON.parse(req.body) as MovieDetails;
        await addMovie(movieId as string,movie);
        const movieExists=await Movie.exists({id:movieId});
        if(user?.MoviesList.find((movie:any)=>{
            return (movie?.MovieRef)===(movieExists?._id);
        })){
            res.status(401).json({success:false})
        }
    }
    else if(method==="DELETE"){
        try{
            const {movieId}=JSON.parse(req.body);
            // console.log("req",req.body);
            // console.log(movieId,type)
            const user=await User.findOne({email:session?.user?.email,"MoviesList.MovieRef": movieId});
            const index=user.MoviesList.map((u:any)=>{
                // console.log(u.MovieRef)
                return u.MovieRef.toString();
            }).indexOf(movieId);
            // console.log(index);
            user.MoviesList.slice(index,1);
            user.save();
            res.status(201).json({success:true});
        }
        catch (error){
            res.status(400).json({success:false})
        }
    }
}