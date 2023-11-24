import {MouseEvent } from "react";


type Props = {
  value: string;
  onSelect : (event : MouseEvent) => void;
};

function Square({value, onSelect}: Props) {
  // const [squareState, setSquareState] = useState(0);

  // function handleClick(event: MouseEvent){
  //   squareState == 0 ? setSquareState(1) : setSquareState(0);
  //   console.log(squareState);
  // }

  return <button className="p-4" onClick={onSelect}>
    {value}
    </button>;
}

export default Square;
