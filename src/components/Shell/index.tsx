import { ShellHasBall } from "../../types/game";
import { Ball } from "../Ball";
import "./styles.scss";

export interface IShell {
  id: number;
  isBall: ShellHasBall;
}

interface ShellProps {
  index: number;
  isShuffling: boolean;
  isGameActive: boolean;
  isBall: boolean;
  onClick: (index: number) => void;
}

export const Shell = ({
  index,
  isShuffling,
  isBall,
  isGameActive,
  onClick,
}: ShellProps) => {
  return (
    <button
      className={`shell shell-${index}`}
      onClick={() => onClick(index)}
      id={`shell-${index}`}
    >
      {isBall && <Ball isHidden={isShuffling || isGameActive} />}
    </button>
  );
};
