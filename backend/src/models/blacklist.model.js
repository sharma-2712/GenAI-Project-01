const mongoose=require('mongoose');

const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is required to be added in a blacklist"]
    }
},{timestamps:true})

const tokenBlacklistModel=mongoose.model("balcklistToken",blacklistTokenSchema)

module.exports=tokenBlacklistModel