import Board from './Board';


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
  exitGame: ()=>void;
}

function WaitingRoom({roomData,playerList, exitGame}:Props) {
  
  if(playerList.length > 1){
    return <Board roomData={roomData} playerList={Object.values(roomData.players).sort((playerA, playerB) => playerA.id.localeCompare(playerB.id))} exitGame={exitGame} />;
    
  }
  return <>
    <div>WaitingRoom</div>
    <button className="bg-red-400 p-4 rounded-md" onClick={exitGame}>Exit</button>
    {
      playerList.map((player,i) =>{
        if(typeof player === "object"){
          const playerObj = player as Player;
          return <div key={i}>{playerObj.name}</div>
        }
      })
    }
  </> 
  
}

export default WaitingRoom