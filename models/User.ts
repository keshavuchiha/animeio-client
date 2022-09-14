import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  image:String,
  MoviesList:[{
    MovieRef:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Movie'
    },
    ListType:{
      type:String,
      enum:["WatchList","On Hold","Followed","Planned","Finished"],
      default:"WatchList"
    }
  }]
})

export default mongoose.models.User || mongoose.model('User', UserSchema);