import RankingsTable from "./RankingsTable";

function RankingsPreview() {
    // Maybe add an opption to see more than top 5

    return (
        <>
            <h2 id="team-rankings-header">Team Rankings (Top 3)</h2>
            <section className="horizontal-button-section">
                <button>3 Teams</button>
                <button>5 Teams</button>
                <button>All Teams</button>
            </section>
            <section className="table-section">
                <RankingsTable />
            </section>
            
        </>
        
    )
}

export default RankingsPreview;