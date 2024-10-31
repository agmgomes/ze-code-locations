import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MultiPolygonSchema } from "./multipolygon.schema";
import { PointSchema } from "./point.schema";

export type PartnerDocument = HydratedDocument<Partner>;

@Schema({collection: 'partners'})
export class Partner {
    
    @Prop({type: String})
    trading_name: string;
    
    @Prop({type: String, unique: true})
    document: string;

    @Prop({type: MultiPolygonSchema, required: true})
    coverageArea: {
        type: 'MultiPolygon',
        coordinates: number[][][][]
    };

    @Prop({type: PointSchema, required:true})
    address: {
        type: 'Point',
        coordinates: [number, number]
    };
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
PartnerSchema.index({address: '2dsphere'});
PartnerSchema.index({coverageArea: '2dsphere'});