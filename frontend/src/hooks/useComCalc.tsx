import { useReducer } from "react";

function getCombinations(skills: number[]): number[][] {
  const results: number[][] = [];
  const n = skills.length;

  // Generate all combinations using binary masks
  const totalCombos = 1 << n;
  const seen = new Set<string>(); // prevent duplicates (different orders)

  for (let mask = 0; mask < totalCombos; mask++) {
    const combination: number[] = [];

    // Build combination
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        combination.push(skills[i]);
      }
    }

    if (combination.length === 5) {
      const sum = combination.reduce((a, b) => a + b, 0);

      if (sum <= 23) {
        const sorted = [...combination].sort((a, b) => a - b);
        const key = sorted.join("-");

        if (!seen.has(key)) {
          seen.add(key);
          results.push(sorted);
        }
      }
    }
  }

  return results;
}

function filterPossibleCombinations(
  skills: number[],
  selectedSkills: number[]
) {
  const remainingSkills = skills.filter((s) => !selectedSkills.includes(s));

  const allCombos = getCombinations(remainingSkills);
  const possibleCombinations = allCombos
    .map((combo) => [...combo, ...selectedSkills])
    .filter((combo) => combo.reduce((a, b) => a + b, 0) <= 23);

  return possibleCombinations;
}

type CombinationsState = {
  allCombinations: number[][];
  remainingCombinations: number[][];
  count?: number;
};

type GetAllAction = {
  type: "GET_ALL";
  payload: number[];
};

type GetFilteredAction = {
  type: "GET_FILTERED";
  payload: {
    skills: number[];
    selectedSkills: number[];
  };
};

type GetCountAction = {
  type: "GET_COUNT";
  payload: number[];
};

type Action = GetAllAction | GetFilteredAction | GetCountAction;

const useComCalc = (init: CombinationsState) => {
  const reducer = (state: CombinationsState, action: Action) => {
    switch (action.type) {
      case "GET_ALL":
        const allCombinations = getCombinations(action.payload);
        return {
          ...state,
          allCombinations,
        };
      case "GET_FILTERED":
        const remainingCombinations = filterPossibleCombinations(
          action.payload.skills,
          action.payload.selectedSkills
        );
        return {
          ...state,
          remainingCombinations,
        };
      case "GET_COUNT":
        const count = getCombinations(action.payload).length;
        return {
          ...state,
          count,
        };
      default:
        return state;
    }
  };

  const [values, dispatch] = useReducer(reducer, init);

  const calculation = (operation: Action["type"], value: Action["payload"]) => {
    dispatch({ type: operation, payload: value } as Action);
  };

  return [values, calculation] as const;
};

export default useComCalc;
