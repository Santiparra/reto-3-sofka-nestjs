import { Document } from "mongoose";

export interface Customer extends Document{
    nombre: string;
    usuario: string;
    email: string;
    contraseña: string;
}
