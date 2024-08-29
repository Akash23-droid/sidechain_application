import "./App.css";
import {
  SignedIn,
  // SignedOut,
  // SignInButton,
  // UserButton,
} from "@clerk/clerk-react";
import Dashboard from "./Component/Dashboard.jsx";
import Login from "./Component/Login.jsx";
import Dashboard2 from "./Component/Dashboard2.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      {/* <h1 className="">Helloworld</h1> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
          <Route
            path="/dashboard2"
            element={
              <SignedIn>
                <Dashboard2 />
              </SignedIn>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
