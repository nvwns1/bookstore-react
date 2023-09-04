import mongoose from "mongoose";

//Define the Mongoose schema for the "book" collection
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter book title"],
        trim: true
    },
    author:{
        type: String,
        required: [true, "Please enter book author."],
        trim: true
    },
    price:{
        type: Number,
        required: [true, "Please enter book price"],
        min: [0, "Price must be non-negative value"]
    },
    image:[String],
    category: {
        type: String,
        required: [true, "Please enter book category"],
        enum: ["Fiction", "Non-Fiction", "Science Fiction", "Mystery", "Fantasy", "Other"],
    },
    description:{
        type: String,
        required: [true, "Please enter book description"]
    },
    createdAt: {type: Date, default: Date.now}
});


//create mongoose model for the "book" collection using bookSchema
const bookModel = mongoose.model("book", bookSchema)

export default bookModel

