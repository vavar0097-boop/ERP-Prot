import { productRepository } from "./product.repository.js";
import { CreateProductInput } from "./product.validator.js";

export const productService = {
  list: () => productRepository.findMany(),
  create: (input: CreateProductInput) => productRepository.create(input),
};
