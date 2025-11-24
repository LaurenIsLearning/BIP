export default function AddPlayerForm() {
  return (
    <div>
      <h2>Add Player</h2>

      <label>Player Name</label>
      <input placeholder="Player Name" />

      <label>Skill Level</label>
      <input placeholder="2-7" type="number" />

      <button style={{ marginTop: "10px" }}>Save Player</button>
    </div>
  );
}
