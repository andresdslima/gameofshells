import { IShell } from "../components/Shell";
import { ShellHasBall } from "../types/game";

export const getShells = (quantity: number) => {
  const shells: IShell[] = [];
  for (let i = 0; i < quantity; i++) {
    shells.push({
      id: i,
      isBall: ShellHasBall.UNDEFINED,
    } as IShell);
  }
  return shells;
};

export const shuffleBall = (max: number) => {
  return Math.floor(Math.random() * max);
};
