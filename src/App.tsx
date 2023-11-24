import { Route, Routes} from "react-router-dom";
import Home from "./Home";
import Lobby from "./Lobby";
import Layout from "./Layout.tsx";
import AuthWrapper from "./AuthWrapper.tsx";

function App() {
  return (
    <AuthWrapper>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="lobby" element={<Lobby />} />
        </Route>
      </Routes>
    </AuthWrapper>
  );
}

export default App;
