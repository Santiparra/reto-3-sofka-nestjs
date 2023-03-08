import { SetMetadata } from "@nestjs/common";
import { Role } from "src/customer/entities/roles.enum";


export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);