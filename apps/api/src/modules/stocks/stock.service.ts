import { stockRepository } from "./stock.repository.js";

export const stockService = {
  list: () => stockRepository.findMany(),
  movements: () => stockRepository.findMovements(),
  locations: () => stockRepository.findLocations(),
};
