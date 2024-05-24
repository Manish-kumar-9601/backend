﻿import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
 
const videoSchema = new Schema({
    videoFile: {
        type: String, //cloudinary url
        required: true
    },
    thumbnail: {
        type: String//cloudinary url
    },
    owner: {
    type:Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
    },
    description: {
        type: String
    },
    duration: {
        type: Number//cloudinary url
    },
    views: {
        type: Number,
        default:0
    },
    isPublished: {
        type: Boolean,
        default:true
    }

}, { timestamps: true })
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)