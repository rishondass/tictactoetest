import Rooms from "./components/Rooms";
import { AuthData } from "./AuthWrapper";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const Navigate = useNavigate();
  const authData = AuthData();

  console.log(authData.user);

  // useEffect(() => {
  //   console.log("Lobby component mounted");
  //   return () => {
  //     console.log("Lobby component unmounted");
  //   };
  // }, []);

  //console.log(authData);

  return (
    <>
      <div className="text-center">
        <button
          className="bg-blue-400 rounded text-white p-4"
          onClick={() => {
            Navigate("/");
          }}
        >
          Back
        </button>
      </div>
      <Rooms />
    </>
  );
}

export default Lobby;
