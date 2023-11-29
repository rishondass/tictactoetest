import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../SocketConn";
import { AuthData } from "../AuthWrapper";
import { memo, useEffect, useState} from "react";
import Square from "./Square";
type Player = {
  id: string;
  name: string;
  isAuthenticated: boolean;
};

type Room = {
  id: string;
  players: Record<string, Player>;
  board: string[];
  firstPlayer: number;
};

type Props = {
  roomData: Room;
  playerList: Player[];
  exitGame: () => void;
};
const Board = memo(({ roomData, playerList, exitGame }: Props) => {
  const params = useParams();
  const { user } = AuthData();
  const Navigate = useNavigate();
  const [board, setBoard] = useState(roomData.board);
  const [currentPlayer, setCurrentPlayer] = useState(roomData.firstPlayer);
  const [winner,setWinner] = useState("");
  useEffect(() => {
    
    socket.on("update-board-data", (player, board) => {
      setBoard(board);
        
        if (player == 0) {
          setCurrentPlayer(1);
        } else {
          setCurrentPlayer(0);
        }
        
    });

    socket.on('end-game-room',(board,winner)=>{
      setBoard(board);
      if(winner != "TIE"){
        setWinner(playerList[winner].name);
      }else{
        setWinner("TIE");
      }
      setTimeout(() =>{
        sessionStorage.removeItem("currentRoom");
        socket.emit('leave-room',params.id);
        Navigate('/lobby')
      }, 5000);

    })

    return () => {
      socket.off("update-board-data");
    };
  }, []);

  function handleSquareChange(index: number, value: string) {
    if(value != "") return;
    if (user.id == playerList[currentPlayer].id) {
      const tempBoard = board;
      tempBoard[index] = currentPlayer == 0 ? "X" : "O";
      setBoard(tempBoard);
      socket.emit("update-board-data", params.id, currentPlayer, tempBoard);
      currentPlayer == 0 ? setCurrentPlayer(1) : setCurrentPlayer(0);
    }
  
  }

  return (
    <>
      <div className="text-center">
        <div className="p-2 bold text-3xl">
          <h1>THIS IS YOUR ROM {params.id}</h1>
        </div>
        <div className="text-red-400 text-3xl bold p4">
          {winner}
        </div>
        <div>
          {Object.entries(roomData.players).map((player) => {
            const playerObj = player[1] as Player | boolean;
            if (typeof playerObj != "boolean") {
              return <span key={playerObj.id}>{playerObj.name}</span>;
            }
          })}
        </div>
        <button className="bg-red-400 p-4 rounded-md" onClick={exitGame}>
          Exit
        </button>
      </div>
      <div className="text-3xl">{playerList[currentPlayer].name}</div>
      <div className="flex flex-col justify-center items-center pt-10">
        <div className="bg-gray-200 grid grid-cols-3 grid-rows-3 gap-3">
          {board.map((value, index) => {
            if (value)
              return (
                <Square
                  key={index}
                  index={index}
                  value={value}
                  selectSquare={handleSquareChange}
                />
              );
            else
              return (
                <Square
                  key={index}
                  index={index}
                  value={""}
                  selectSquare={handleSquareChange}
                />
              );
          })}
        </div>
      </div>
    </>
  );
});

export default Board;
