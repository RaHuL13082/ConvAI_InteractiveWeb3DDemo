import Demo from "./Demo";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useCookies } from "react-cookie";
export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["convai-user-info"]);
  return (
    <Router>
      <Routes>
        <Route
          path="/:id"
          element={
            cookies.CONVAI_API_KEY ? (
              <Demo />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        ></Route>
      </Routes>
    </Router>
  );
}
