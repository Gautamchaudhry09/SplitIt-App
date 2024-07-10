// App.js
import "./App.css";
import { AccountProvider } from "./components/AppContext/AppContext";
import { MainContainer } from "./components/Containers/MainContainer";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <AccountProvider>
      <div className="background"></div>
      <Router>
        <div className="app-content">
          <MainContainer className="main-container" />
        </div>
      </Router>
    </AccountProvider>
  );
}

export default App;
