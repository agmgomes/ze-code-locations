import { Schema } from "mongoose";

export const MultiPolygonSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['MultiPolygon'],
            required: true,
        },
        coordinates: {
            type: [[[[Number]]]],
            required: true,
        },
    },
    {_id: false}
)