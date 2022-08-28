import { AnimalFiber } from "./AnimalFiber";
import { NonAnimalFiber } from "./NonAnimalFiber";

export const Fiber = {
  ...AnimalFiber,
  ...NonAnimalFiber,
};
