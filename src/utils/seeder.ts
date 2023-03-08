import { faker } from '@faker-js/faker';
import { Customer } from "src/customer/entities/customer.entity";


export function createRandomCustomer(): Customer {
    return {
      id: faker.datatype.number(),
      name: faker.name.fullName(),
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roles: ["USER"]
    };
}