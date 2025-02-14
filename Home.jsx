//Dashboard
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold text-green-700">Welcome to Smart Agriculture</h2>
      <p className="text-gray-600 mt-4">Explore various tools for better farming.</p>
      <div className="mt-6">
        <Link to="/crop" className="bg-green-500 text-white px-4 py-2 rounded mx-2">Crop Recommendation</Link>
        <Link to="/weather" className="bg-blue-500 text-white px-4 py-2 rounded mx-2">Weather</Link>
      </div>
    </div>
  );
}
