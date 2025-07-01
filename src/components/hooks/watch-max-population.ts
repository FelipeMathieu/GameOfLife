import { useEffect } from "react";
import { usePopulation } from "../../core/store";

/** Watch the population changes and update max population reached when the population is greater than the current max population  */
export const useWatchMaxPopulation = () => {
  const { maxPopulation, population, updateMaxPopulation } = usePopulation();

  useEffect(() => {
    if (population > maxPopulation) {
      updateMaxPopulation(population);
    }
  }, [maxPopulation, population]);
};
