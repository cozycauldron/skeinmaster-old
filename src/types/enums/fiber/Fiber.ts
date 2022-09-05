import { AnimalFiber } from "./AnimalFiber";
import { NonAnimalFiber } from "./NonAnimalFiber";

export type Fiber = AnimalFiber | NonAnimalFiber;

export const Fibers = {
  ...AnimalFiber,
  ...NonAnimalFiber,
};
