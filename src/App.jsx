import { useState } from "react";

export default function App() {

  async function fetchLeagueCard() {
    try {
      const response = await fetch("https://ddragon.leagueoflegends.com/cdn/16.19.1/data/en_US/champion.json");
      const data = await response.json();

      for (const champion in data.data) {
        console.log(champion);
      }
      
    } catch {
      return (
        <div>
          <h1>Error fetching data</h1>
        </div>
      );
    }

  }

  

  return (
    <div>
      <h1>Memory Card Game</h1>
      <button onClick={fetchLeagueCard}>Fetch League Card</button>
    </div>
  );
}
