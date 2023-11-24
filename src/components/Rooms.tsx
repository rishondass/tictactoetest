import {useState, useEffect } from "react";
import { socket } from "../SocketConn";
import { v4 as uuidv4 } from "uuid";

interface Room {
  id: string;
  players: number;
  board: string[];
}


function RoomInfo({index,players}:{index:number,players:number}) {
  return (
    <div className="bg-orange-400 text-center p-2 w-full rounded-lg text-white">
      <div className="">Room #{index}</div>
      <div className="text-sm">Players: {players}</div>
      <div>
        <button className="bg-green-400 text-white rounded-md p-4 mt-4">
          Join
        </button>
      </div>
    </div>
  );
}

function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  
  useEffect(() => {
    const handleReceiveRooms = (data: Room[]) => {
      setRooms(data);
    };

    socket.on("receive-rooms", handleReceiveRooms);

    return () => {
      socket.off("receive-rooms", handleReceiveRooms);
    };
  }, [rooms]);

  function handleClick() {
    socket.emit("create-room", { id: uuidv4(), players: 0, board: Array(9).fill(null) });
  }

  return (
    <>
      <div className="text-center">
        <button
          className="bg-red-400 rounded text-white p-4"
          onClick={handleClick}
        >
          Add room
        </button>
      </div>
      <div className="grid grid-cols-3 w-full p-4 gap-4">
        {rooms.map((room, index) => (
          <RoomInfo index={++index} players={room.players} key={room.id}/>
        ))}
      </div>
    </>
  );
}

export default Rooms;
