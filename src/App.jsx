import { useState } from "react";

export default function App() {
	const [visible, setVisible] = useState(true);
	const [champs, setChamps] = useState([]);
	const numOfChamps = 12;
	const version = "16.19.1";

	async function fetchLeagueCards() {
		try {
			const response = await fetch(
				`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
			);
			const data = await response.json();

			const allChamps = Object.values(data.data);

			const shuffled = [...allChamps];
			for (let i = shuffled.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
			}

			const selectedChamps = shuffled
				.slice(0, numOfChamps)
				.map((champ) => ({
					id: champ.id,
					name: champ.name,
					image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`,
				}));

			setChamps(selectedChamps);
		} catch (error) {
			console.error("Error fetching League card data", error);
		}
	}

	return (
		<div>
			<h1 className="game-title">Memory Card Game</h1>
			{visible && (
				<button
					onClick={() => {
						fetchLeagueCards();
						setVisible(false);
					}}
					className="fetch-button"
				>
					Fetch League Cards
				</button>
			)}

			<div className="card-container">
				{champs.map((champ) => (
					<div key={champ.id} className="card">
						<img src={champ.image} alt={champ.name} />
						<p className="card-name">{champ.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
