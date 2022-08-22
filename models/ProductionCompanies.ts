import { ProductionCompanies } from './../typings.d';
import mongoose from "mongoose";

const productionCompaniesScema=new mongoose.Schema<ProductionCompanies>({
    id:Number,
    logo_path:String,
    name:String,
    origin_country:String
},{timestamps:true});

export default mongoose.models.ProductionCompanies || mongoose.model('ProductionCompanies',productionCompaniesScema);