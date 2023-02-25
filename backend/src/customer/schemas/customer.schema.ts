import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

export type CustomerDocument = Customers & Document;

@Schema()
export class Customers {

    @Prop({unique: true})
    nombre: string;

    @Prop()
    contrasena: string;

    @Prop()
    email: string;

    @Prop()
    usuario: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customers)  