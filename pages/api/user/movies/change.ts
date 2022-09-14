import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import connectDb from "../../../../lib/connectDb";
import User from "../../../../models/User";
import { authOptions } from '../../auth/[...nextauth]';
import mongoose from "mongoose";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const session=await unstable_getServerSession(req,res,authOptions);
    if(!session){
        res.status(401).json({success:false,message:"Please authenticate"});
    }
    await connectDb();
    const {method}=req;
    if(method==="POST"){
        try{
            const {movieId,type}=JSON.parse(req.body);
            // console.log("req",req.body);
            // console.log(movieId,type)
            const user=await User.findOne({email:session?.user?.email,"MoviesList.MovieRef": movieId});
            const index=user.MoviesList.map((u:any)=>{
                // console.log(u.MovieRef)
                return u.MovieRef.toString();
            }).indexOf(movieId);
            // console.log(index);
            user.MoviesList[index].ListType=type;
            user.save();
            res.status(201).json({success:true});
        }
        catch (error){
            res.status(400).json({success:false})
        }
        
        
    }
}