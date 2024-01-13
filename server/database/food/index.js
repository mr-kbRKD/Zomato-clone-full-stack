import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        descript: {
            type: String,
            required: true,
        },
        isVeg: {
            type: String,
            required: true,
        },
        isConatinsEgg: {
            type: Boolean,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        photos: {
            type: mongoose.Types.ObjectID,
            ref: "images",
        },

        price: {
            type: Number,
            default: 101,
            required: true,
        },
        adddOns: [
            {
                type: mongoose.Types.ObjectId,
                ref: "foods",
            },
        ],
        restaurant :{
            type : mongoose.Types.ObjectId,
            ref : "restaurants",
            required : true,
        },
    },{
        timestamps : true,
    }
    
);

    export const FoodModel = mongoose.model("foods", FoodSchema);