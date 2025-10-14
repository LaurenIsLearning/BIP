import RankingsTable from "./RankingsTable";

function RankingsPreview() {
    // Maybe add an opption to see more than top 5

    return (
        <>
            <h1>Team Rankings (Top 3)</h1>
            <section className="table-section">
                <RankingsTable />
            </section>
            
        </>
        
    )
}

export default RankingsPreview;