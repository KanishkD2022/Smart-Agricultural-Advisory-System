import { useState } from "react";
import axios from "axios";

export default function CropRecommendation() {
  const [soilType, setSoilType] = useState("");
  const [climate, setClimate] = useState("");
  const [crop, setCrop] = useState("");

  const getRecommendation = async () => {
    try {
      const { data } = await axios.post("/api/crop-recommendation", { soilType, climate });
      setCrop(data.crop);
    } catch (error) {
      console.error("Error fetching recommendation");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Crop Recommendation</h2>
      <div className="mt-4">
        <input type="text" className="border p-2 mr-2" placeholder="Soil Type" value={soilType} onChange={(e) => setSoilType(e.target.value)} />
        <input type="text" className="border p-2 mr-2" placeholder="Climate" value={climate} onChange={(e) => setClimate(e.target.value)} />
        <button onClick={getRecommendation} className="bg-green-600 text-white px-4 py-2 rounded">Get Crop</button>
      </div>
      {crop && <p className="mt-4 text-green-700">Recommended Crop: {crop}</p>}
    </div>
  );
}
