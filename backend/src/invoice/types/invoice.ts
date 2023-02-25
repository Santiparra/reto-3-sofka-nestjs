import { Document } from "mongoose";

export interface Invoice extends Document{
    readonly numFactura: number;
    readonly fecha: string;
    readonly vence: string;
    readonly monto: number;
}