import Combination from "../components/Combination";
import type { Team } from "../models/Team";
import SingleTeamDisplay from "../components/SingleTeamDisplay";

interface Props {
  teamOne: Team;
  teamTwo?: Team;
}

function ComparisonPage({ teamOne, teamTwo }: Props) {
  const possibleCombinations = 0; // Placeholder for actual calculation

  if (!teamTwo) {
    //Display single team
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

  return (
    // Display both teams
    <>
      <SingleTeamDisplay
        team={teamOne}
        possibleCombinations={possibleCombinations}
      />
      <SingleTeamDisplay
        team={teamTwo}
        possibleCombinations={possibleCombinations}
      />
      <Combination ranks={[1, 2, 3, 4, 5]} />
    </>
  );
}

export default ComparisonPage;
