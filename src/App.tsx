import { useState, useRef, useEffect } from "react";
import { Shell } from "./components/Shell";
import { getShells, shuffleBall } from "./utils/shells";
import { GameDiffulty } from "./types/game";
import { GAME_ROUNDS, INITIAL_MESSAGE } from "./settings/settings";
import { Settings } from "./components/Settings";
import "./App.scss";

/*
  ! Could also use styled-components for dynamic styling, for example:
  * - To always render the shells in the right positions regardless of their quantity;
  * - To add/remove a white border to the shuffled shells according to the difficulty;
*/
export default function App() {
  const [isShuffling, setIsShuffling] = useState(false);
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  // Could also implement a dark theme with useReducer or useContext
  const [isDarkMode, setIsDarkmode] = useState(true);
  const [difficulty, setDifficulty] = useState<GameDiffulty>(GameDiffulty.easy);
  const [choices, setChoices] = useState(difficulty === GameDiffulty.hard ? 1 : 2);
  const [winCount, setWinCount] = useState(getWinCounts());
  const SHELLS = getShells(difficulty);
  // useRef maintains the ball's position between renders
  const ballPosition = useRef(shuffleBall(SHELLS.length));
  const harderDifficulty = difficulty == GameDiffulty.hard ? GameDiffulty.hard + 5 : difficulty + 2;

  const startGame = () => {
    setIsGameActive(true);
    setMessage("Shuffling shells...");
    setShowSettings(false);
    shuffleShells();
  };

  const shuffleShells = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    let shuffleCount = 0;
    const shuffleInterval = setInterval(() => {
      resetShells();
      const shell1 = document.getElementById(`shell-${ballPosition.current}`);
      let newPosition = shuffleBall(SHELLS.length);
      while (newPosition === ballPosition.current) {
        newPosition = shuffleBall(SHELLS.length);
      }
      const shell2 = document.getElementById(`shell-${newPosition}`);
      shell1!.classList.add("shuffling");
      shell2!.classList.add("shuffling");
      const shell1Class = shell1!.getAttribute("class");
      const shell2Class = shell2!.getAttribute("class");
      shell1!.setAttribute("class", shell2Class!);
      shell2!.setAttribute("class", shell1Class!);
      shuffleCount += 1;
      if (shuffleCount >= GAME_ROUNDS) {
        clearInterval(shuffleInterval);
        setIsShuffling(false);
        setMessage("Make your guess 🤔");
        resetShells();
      }
    }, 2000 / harderDifficulty); // Controls the shuffle speed
  };

  function resetShells() {
    SHELLS.forEach((shell) => {
      const shellElement = document.getElementById(`shell-${shell.id}`);
      shellElement!.classList.remove("shuffling");
      shellElement!.classList.remove("wrong");
    });
  }

  function getWinCounts(): number {
    const winCount = localStorage.getItem("winCount");
    return winCount ? +winCount : 0;
  }

  const handleGuess = (num: number) => {
    if (!isGameActive) return; // Prevents clicking the shells before the game starts
    if (num === ballPosition.current) {
      setMessage(`You win! The ball was under the shell ${num + 1}. 🎉`);
      restartGame();
      setWinCount((prev) => prev + 1);
      localStorage.setItem("winCount", (getWinCounts() + 1).toString());
    } else if (choices > 0) {
      document.getElementById(`shell-${num}`)!.classList.add("wrong");
      setMessage("Wrong! Try again... 🤔");
      setChoices((prev) => prev - 1);
    }
  };

  function restartGame() {
    setIsGameActive(false);
    resetShells();
    setTimeout(() => {
      setMessage(INITIAL_MESSAGE);
      setChoices(2);
    }, 2000);
  }

  useEffect(() => {
    if (choices === 0) {
      setMessage("You lose! Play again... 😭");
      restartGame();
    }
  }, [choices]);

  return (
    <div className="game-container">
      <h1>Game of Shells</h1>
      <div className="shells-container">
        {SHELLS.map((shell) => (
          <Shell
            key={shell.id}
            index={shell.id}
            isShuffling={isShuffling}
            isGameActive={isGameActive}
            isBall={ballPosition.current === shell.id}
            onClick={handleGuess}
          />
        ))}
      </div>
      <p className={choices === 0 ? "lose" : ""}>{message}</p>
      <p style={{ color: "yellow" }}>You can guess it: {choices} times</p>
      {!isGameActive && (
        <>
          <p style={{ color: "salmon" }}>You have won: {winCount} times</p>
          <button disabled={isGameActive} onClick={startGame}>
            Start Game
          </button>
          <br />
          {!showSettings && (
            <>
              <button id="settings" onClick={() => setShowSettings(true)}>
                Settings
              </button>
              <button
                style={{
                  backgroundColor: isDarkMode ? "white" : "black",
                  fontSize: "12px",
                  marginLeft: "1rem",
                }}
                onClick={() => setIsDarkmode(!isDarkMode)}
              >
                {isDarkMode ? "☀️" : "🌙"}
              </button>
            </>
          )}
        </>
      )}
      {showSettings && (
        <div className="settings-container">
          <Settings
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            choices={difficulty === GameDiffulty.hard ? 1 : choices}
            setChoices={setChoices}
          />
          <button onClick={() => setShowSettings(false)}>X</button>
        </div>
      )}
    </div>
  );
}
