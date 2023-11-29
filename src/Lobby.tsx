import Rooms from "./components/Rooms";
import { useNavigate,} from "react-router-dom";
import {useState} from "react";



function Lobby() {
  const Navigate = useNavigate();
  const [errorMessages] = useState("");

  return (
    <>
    {errorMessages && (
        <div className="text-center">
          <span className="bg-red-500 text-white p-2 px-10 rounded-md">
            {errorMessages}
          </span>
        </div>
      )}
      <div className="text-center">
        <button
          className="bg-blue-400 rounded text-white p-4"
          onClick={() => {
            Navigate("/");
            

          }}
        >
          Home
        </button>
      </div>
      <Rooms/>
    </>
  );
}

export default Lobby;
