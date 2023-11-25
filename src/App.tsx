import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Lobby from "./Lobby";
import Layout from "./Layout.tsx";

import AuthRequire from "./AuthRequire.tsx";
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Protected Router */}
          <Route element={<AuthRequire/>}>
            <Route path="/lobby" element={<Lobby />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;