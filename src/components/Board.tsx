import Square from "./Square";
import {MouseEvent } from "react";

type Props = {
  value: string;
  onSelect : (event : MouseEvent) => void;
}

function Board({value,onSelect} : Props) {
  const BoardButtons = [];
  

  for (let i = 0; i < 9; i++) {
    BoardButtons.push(<Square key={i} onSelect={onSelect} value={value} />);
  }

  return <>{BoardButtons}</>;
}

export default Board;
