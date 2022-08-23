import { authOptions } from './../../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../../lib/connectDb";
import Movie from '../../../../models/Movie';
import {unstable_getServerSession} from 'next-auth/next';


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const session=await unstable_getServerSession(req,res,authOptions);
    if(!session){
        res.status(401).json({success:false,message:"Please authenticate"});
    }
    const { method } = req
    const {movieId}=req.query;
    if(method=='POST'){
        console.log(req);
    }
}