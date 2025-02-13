import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Forum from "./pages/Forum";
import MarketPrices from "./pages/MarketPrices";
import SuccessStories from "./pages/SuccessStories";
import CropRecommendation from "./pages/CropRecommendation";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-green-700 p-4 flex justify-between">
          <h1 className="text-white text-2xl font-bold">Smart Agriculture</h1>
          <div>
            <Link className="text-white mx-2" to="/">Home</Link>
            <Link className="text-white mx-2" to="/crop">Crop</Link>
            <Link className="text-white mx-2" to="/weather">Weather</Link>
            <Link className="text-white mx-2" to="/forum">Forum</Link>
            <Link className="text-white mx-2" to="/market">Market</Link>
            <Link className="text-white mx-2" to="/success">Stories</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crop" element={<CropRecommendation />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/market" element={<MarketPrices />} />
          <Route path="/success" element={<SuccessStories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
