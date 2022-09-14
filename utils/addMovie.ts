import { MovieDetails,Genres, ProductionCompanies } from './../typings.d';
import Movie from "../models/Movie";
import Genre from '../models/Genre';
import ProductionCompany from '../models/ProductionCompanies';

export const addMovie=async (movieId:string,movie:MovieDetails)=>{
    
        const movieExists=await Movie.exists({id:movieId});
        // console.log(movieExists,'movieExists');

        const genres= await Promise.all(movie.genres.map(async (genre:Genres)=>{
            let genreExist=await Genre.exists({id:genre.id});
            if(!genreExist){
                await Genre.create({
                    id:genre.id,
                    name:genre.name
                })
            }
            genreExist=await Genre.exists({id:genre.id});
            // console.log(genreExist?._id,'id of genre');
            // genres.push(genreExist?._id);
            return genreExist?._id;
        }));
        
        const productCompaniesArray=await Promise.all(movie.production_companies.map(async (productionCompany:ProductionCompanies)=>{
            let companyExist=await ProductionCompany.exists({id:productionCompany.id});
            if(!companyExist){
                await ProductionCompany.create({
                    id:productionCompany.id,
                    logo_path:productionCompany.logo_path,
                    name:productionCompany.name,
                    origin_country:productionCompany.origin_country
                })
            }
            companyExist=await ProductionCompany.exists({id:productionCompany.id});
            return companyExist?._id;
            // productCompaniesArray.push(companyExist?._id);
        }))
        
        // console.log(genres,'genres')
        if(!movieExists){
            
            // console.log(movie,'movie');
            const MovieStore=await Movie.create({
                adult:movie.adult,
                backdrop_path:movie.backdrop_path,
                genres:genres,
                homepage:movie.homepage,
                id:movie.id,
                original_title:movie.original_title,
                orignal_language:movie.orignal_language,
                overview:movie.overview,
                popularity:movie.popularity,
                poster_path:movie.poster_path,
                production_companies:productCompaniesArray,
                release_date:movie.release_date,
                revenue:movie.revenue,
                runtime:movie.runtime,
                title:movie.title,
                video:movie.video,
                vote_average:movie.vote_average,
                vote_count:movie.vote_count ,
                status:movie.status
            })
            // console.log(MovieStore,'moviestore');
        }
}