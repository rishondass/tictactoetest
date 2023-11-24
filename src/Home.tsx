import { useState, ChangeEvent, memo, useEffect } from "react";
import { socket } from "./SocketConn";
import { useNavigate } from "react-router-dom";
import { AuthData } from "./AuthWrapper";

const Home = memo(() => {
  const [nameInput, setNameInput] = useState<string>();

  const Navigate = useNavigate();
  useEffect(() => {
    console.log("Lobby component mounted");
    return () => {
      console.log("Lobby component unmounted");
    };
  }, []);
  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setNameInput(event.target.value);
  }

  function handleNext() {
    if (nameInput) {
      console.log("Navigating to /lobby");
      socket.emit("change-username", nameInput);

      AuthData()
        .login(nameInput)
        .then(() => {
          Navigate("/lobby");
        })
        .catch((error: string) => {
          console.log(error);
        });
    }
  }

  const classes = nameInput
    ? "border-2 rounded-md outline-none p-2"
    : "border-2 border-red-400 rounded-md outline-none p-2";

  return (
    <>
      <h1 className="text-green-600 text-3xl font-semibold text-center pt-10">
        Tic Tack Toe
      </h1>
      <div className="text-center p-5">
        <input
          type="text"
          name=""
          placeholder="name"
          className={classes}
          onChange={handleInput}
        />
      </div>
      <h2>{nameInput}</h2>
      <div className="text-center">
        <button
          className="bg-green-400 rounded-md p-2 text-white"
          onClick={handleNext}
        >
          next
        </button>
      </div>
    </>
  );
});

export default Home;
