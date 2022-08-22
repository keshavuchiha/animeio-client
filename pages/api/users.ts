import connetDb from '../../lib/connectDb'
import User from '../../models/User'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import type {NextApiRequest,NextApiResponse} from 'next';
export default async function handler (req:NextApiRequest, res:NextApiResponse) {
  console.log(authOptions);
    const session=await unstable_getServerSession(req,res,authOptions);
    const { method } = req
    console.log(session)
    if(!session){
        res.status(401).json({success:false,message:"Please authenticate"});
    }

  await connetDb();
  // console.log(User);

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({})
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        // console.log(req.body);
        const user = await User.create(req.body)
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}