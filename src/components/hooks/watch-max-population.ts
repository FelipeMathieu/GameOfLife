import { useEffect } from "react";
import { usePopulation } from "../../core/store";

export const useWatchMaxPopulation = () => {
  const { maxPopulation, population, updateMaxPopulation } = usePopulation();

  useEffect(() => {
    if (population > maxPopulation) {
      updateMaxPopulation(population);
    }
  }, [maxPopulation, population]);
};
