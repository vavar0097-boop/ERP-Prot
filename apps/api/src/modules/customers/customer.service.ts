import { customerRepository } from "./customer.repository.js";
import { CreateCustomerInput } from "./customer.validator.js";

export const customerService = {
  list: () => customerRepository.findMany(),
  create: (input: CreateCustomerInput) => customerRepository.create(input),
};
