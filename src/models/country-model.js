import { Schema, model } from "mongoose";

const CountrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

export const CountryModel = model("country", CountrySchema);