import { useState } from "react";

export default function App() {
	const [buttonText, setButtonText] = useState("Fetch League Cards");
	const [champs, setChamps] = useState([]);
	const [endGame, setEndGame] = useState(false);

	const [clickedChamps, setClickedChamps] = useState([]);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	

	const numOfChamps = 12;
	const version = "16.19.1";

	function changeButtonText() {
		setButtonText("Shuffle");
	}

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

	function champsMemory(champName) {
		if (clickedChamps.includes(champName)) {
			setEndGame(true);
			setClickedChamps([]);
			setScore(0);
			return;
		}

		setClickedChamps([...clickedChamps, champName])
		setScore(score + 1);
	}

	return (
		<div>
			<h1 className="game-title">Memory Card Game</h1>

			<button
				onClick={() => {
					fetchLeagueCards();
					changeButtonText();
				}}
				className="fetch-button"
			>
				{buttonText}
			</button>

			<div className="card-container">
				{champs.map((champ) => (
					<div key={champ.id} className="card">
						<img
							src={champ.image}
							alt={champ.name}
							className="card-image"
							onClick={() => {champsMemory(champ.name)}}
						/>
						<p className="card-name">{champ.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
