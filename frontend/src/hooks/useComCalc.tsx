import { useMemo } from "react";

function getCombinations(skills: number[]): number[][] {
  const results: number[][] = [];
  const n = skills.length;
  const totalCombos = 1 << n;
  const seen = new Set<string>();

  for (let mask = 0; mask < totalCombos; mask++) {
    const combo: number[] = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) combo.push(skills[i]);
    }

    if (combo.length === 5) {
      const sum = combo.reduce((a, b) => a + b, 0);
      if (sum <= 23) {
        const sorted = [...combo].sort((a, b) => a - b);
        const key = sorted.join("-");
        if (!seen.has(key)) {
          seen.add(key);
          results.push(sorted);
        }
      }
    }
  }

  return results.sort(
    (a, b) => b.reduce((x, y) => x + y, 0) - a.reduce((x, y) => x + y, 0)
  );
}

function getCombinationsBasedOnPlayed(
  skills: number[],
  playedSkills: number[]
) {
  if (playedSkills.length === 0) return getCombinations(skills);

  const remainingSkills = [...skills];
  for (const s of playedSkills) {
    const index = remainingSkills.indexOf(s);
    if (index !== -1) remainingSkills.splice(index, 1);
  }

  const needed = 5 - playedSkills.length;
  if (needed <= 0) return [playedSkills];

  const results: number[][] = [];
  const n = remainingSkills.length;
  const totalCombos = 1 << n;
  const seen = new Set<string>();

  for (let mask = 0; mask < totalCombos; mask++) {
    const combo: number[] = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) combo.push(remainingSkills[i]);
    }

    if (combo.length === needed) {
      const fullCombo = [...playedSkills, ...combo];
      const sum = fullCombo.reduce((a, b) => a + b, 0);
      if (sum <= 23) {
        const sorted = [...fullCombo].sort((a, b) => a - b);
        const key = sorted.join("-");
        if (!seen.has(key)) {
          seen.add(key);
          results.push(sorted);
        }
      }
    }
  }

  return results.sort(
    (a, b) => b.reduce((x, y) => x + y, 0) - a.reduce((x, y) => x + y, 0)
  );
}

const useComCalc = (skills: number[], playedSkills: number[]) => {
  const combinations = useMemo(() => {
    return getCombinationsBasedOnPlayed(skills, playedSkills);
  }, [skills.join(","), playedSkills.join(",")]);

  const count = combinations.length;
  return { combinations, count };
};

export default useComCalc;
