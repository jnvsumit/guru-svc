import mongoose, { Schema } from "mongoose";

const ParagraphSchema = new Schema({
    paragraphTitle: String,
    paragraphId: String,
    s3Url: String,
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

export default mongoose.model("paragraph", ParagraphSchema);