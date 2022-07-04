import mongoose, { Schema } from "mongoose";

const MediaSchema = new Schema({
    mediaTitle: String,
    mediaId: String,
    s3Url: String,
    mimeType: String,
    sequenceNo: { 
        type: Number,
        min: [0, "Sequence number can't be less than 0" ],
        default: 0
    },
    status: { 
        type: String,
        enum: ["active", "inactive"],
        default: "active" 
    }
}, {
    timestamps: true
});

export default mongoose.model("media", MediaSchema);