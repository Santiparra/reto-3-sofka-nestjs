import { Schema } from "mongoose";

export const InvoiceSchema = new Schema({
    numFactura: Number,
    fecha: String,
    vence: String,
    monto: Number,
});