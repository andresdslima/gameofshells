import "./styles.scss";

interface BallProps {
  isHidden: boolean;
}

export const Ball = ({ isHidden }: BallProps) => {
  return <div id="ball" className={`${isHidden ? "hide" : ""}`}></div>;
};
