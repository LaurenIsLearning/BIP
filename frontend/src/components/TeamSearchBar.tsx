import { useState, useEffect } from "react";
import data from '../data/teams.json'; 
import styles from "../style/TeamSearchBar.module.css"


// Set up interface for teams (probably will not need this later)
interface Team {
      name: string;
      points: number;
      players: [
        {
            skill: number,
            name: string,
            sessWR: number,
            sessPA: number,
            overallWR: number,
            overallMP: number
        }
      ]
}

function TeamSearchBar () {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState('');

    // Get info from teams data
    useEffect(() => {
        setTeams(data as Team[]); // Type assertion for safety
    }, []);

    const handleButtonPress = () => {
        // Do something!!
    }
    
    
    return (
        <>
            <section className={styles.search_section}>
                <label>Search Teams: </label>
                <input list="teams_list" id="teams" name="Choose_Team" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} />

                <datalist id="teams_list" className={styles.search_bar} >
                    {teams.map((team) => (
                        <option value={team.name}></option>
                    ))}
                </datalist>
                <button onClick={handleButtonPress} className={styles.search_button}>Go!</button>
            </section>  
        </>
    );
}

export default TeamSearchBar;