import Combination from "../components/Combination";
import type { Team } from "../models/Team";
import SingleTeamDisplay from "../components/SingleTeamDisplay";

interface Props {
  teamOne: Team;
  teamTwo?: Team;
}

function ComparisonPage({ teamOne, teamTwo }: Props) {
  const possibleCombinations = 0; // Placeholder for actual calculation

  return (
    <>
      <SingleTeamDisplay
        team={teamOne}
        possibleCombinations={possibleCombinations}
      />
      <Combination ranks={[1, 2, 3, 4, 5]} />
    </>
  );
}

export default ComparisonPage;
