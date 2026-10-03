import { useState } from "react";

export default function App() {
	const [champs, setChamps] = useState([]);
	const numOfChamps = 10;
  const version = "16.19.1";

	async function fetchLeagueCards() {
		try {
			const response = await fetch(
				`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
			);
			const data = await response.json();

			const allChamps = Object.values(data.data);

			const shuffled = allChamps.sort(() => 0.5 - Math.random());

			const selectedChamps = shuffled
				.slice(0, numOfChamps)
				.map((champ) => ({
					id: champ.id,
					name: champ.name,
					image: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`,
				}));

      setChamps(selectedChamps);

			console.log(data);
		} catch {
			console.error("Error fetching League card data");
		}
	}

	return (
		<div>
      <h1>Memory Card Game</h1>
      <button onClick={fetchLeagueCards}>Fetch League Cards</button>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
        {champs.map((champ) => (
          <div key={champ.id} style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center" }}>
            <img src={champ.image} alt={champ.name} style={{ width: "80px", height: "80px" }} />
            <p>{champ.name}</p>
          </div>
        ))}
      </div>
    </div>
	);
}
