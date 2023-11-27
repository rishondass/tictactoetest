import { useEffect, useState} from "react";
import { socket } from "../SocketConn";
import {useParams} from "react-router-dom";
import Board from "./Board.tsx";
import ErrorMessage from "./ErrorMessage";
import {AuthData} from "../AuthWrapper.tsx";
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

const RestrictBoard = () => {
  
  const params = useParams();
  const {user} = AuthData();
  const [room, setRoom] = useState<Room | null>(null);
  useEffect(() => {
    socket.emit("get-rooms-data", (cb: Room[]) => {
      const foundRoom = cb.find(
        ({id,players}:Partial<Room>) => id === params.id && players?[user?.id]:null
      )
      if (foundRoom) {
        setRoom(foundRoom);
      }
    });
  }, [params.id, user.id]);

  useEffect(()=>{
    socket.on('update-room',(nRoom)=>{
      setRoom(nRoom);
      console.log('second');
    })
    return ()=>{
      socket.off('update-room');
    }
  
  },[room])

  if (room) {
    return <Board roomData={room} />;
  } else {
    return <ErrorMessage />;
  }
};

export default RestrictBoard;
