import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CasePage from "./pages/CasePage";
import BailPage from "./pages/BailPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/cases" element={<CasePage />} />
          <Route path="/bail" element={<BailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
