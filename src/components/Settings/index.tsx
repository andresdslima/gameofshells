import { GameDiffulty } from "../../types/game";

interface SettingsProps {
  difficulty: GameDiffulty;
  setDifficulty: (difficulty: GameDiffulty) => void;
  choices: number;
  setChoices: (choices: number) => void;
}

export function Settings({
  difficulty,
  setDifficulty,
  choices,
  setChoices,
}: SettingsProps) {
  return (
    <div className="settings">
      <label htmlFor="difficulty">Difficulty:</label>
      <select
        name="difficulty"
        id="difficulty"
        onChange={(e) =>
          setDifficulty(e.target.value as unknown as GameDiffulty)
        }
        value={difficulty}
      >
        <option value={GameDiffulty.easy}>Easy</option>
        <option value={GameDiffulty.medium}>Medium</option>
        <option value={GameDiffulty.hard}>Hard</option>
      </select>
      <label htmlFor="difficulty">Guesses:</label>
      <select
        name="difficulty"
        id="difficulty"
        onChange={(e) => setChoices(e.target.value as unknown as number)}
        value={choices}
      >
        <option value={2}>2</option>
        <option value={1}>1</option>
      </select>
    </div>
  );
}
