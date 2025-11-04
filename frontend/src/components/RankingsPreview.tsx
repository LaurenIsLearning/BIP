import RankingsTable from "./RankingsTable";

function RankingsPreview() {
    // Maybe add an opption to see more than top 5

    return (
        <>
            <h2 id="team-rankings-header">Team Rankings</h2>
            {/* <section className="horizontal-button-section">
                <button className="button_dark">3 Teams</button>
                <button className="button_dark">5 Teams</button>
                <button className="button_dark">All Teams</button>
            </section> */}
            <section className="table-section">
                <RankingsTable />
            </section>
            
        </>
        
    )
}

export default RankingsPreview;