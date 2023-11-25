import Rooms from "./components/Rooms";
import { useNavigate } from "react-router-dom";
function Lobby() {
  const Navigate = useNavigate();
  //console.log(JSON.parse(sessionStorage.getItem("user") || ""));


  return (
    <>
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
      <Rooms />
    </>
  );
}

export default Lobby;
