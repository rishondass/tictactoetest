import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../SocketConn";
import { AuthData } from "../AuthWrapper";
import { memo } from "react";

type Player = {
  id: string;
  name: string;
  isAuthenticated: boolean;
};
interface Room {
  id: string;
  players: Player;
  board: string[];
}

type Props = {
  roomData: Room;
};
const Board = memo(({ roomData }: Props) => {
  const params = useParams();
  const Navigate = useNavigate();
  const { user } = AuthData();

  function exitGame() {
    socket.emit("exit-room", params.id, user);
    sessionStorage.removeItem("currentRoom");
    Navigate("/lobby");
  }

  return (
    <>
      <div className="text-center">
        <div className="p-2 bold text-3xl">
          <h1>THIS IS YOUR ROM {params.id}</h1>
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
    </>
  );
});

export default Board;
