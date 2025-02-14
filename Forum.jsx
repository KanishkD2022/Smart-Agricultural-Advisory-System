import { useState, useEffect } from "react";
import axios from "axios";

export default function Forum() {
  const [question, setQuestion] = useState("");
  const [posts, setPosts] = useState([]);

  const postQuestion = async () => {
    await axios.post("/api/forum", { question });
    setQuestion("");
    fetchForum();
  };

  const fetchForum = async () => {
    const { data } = await axios.get("/api/forum");
    setPosts(data);
  };

  useEffect(() => { fetchForum(); }, []);

  
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Farmer Forum</h2>
      <input type="text" className="border p-2 mr-2" placeholder="Ask a question..." value={question} onChange={(e) => setQuestion(e.target.value)} />
      <button onClick={postQuestion} className="bg-green-600 text-white px-4 py-2 rounded">Post</button>
      <div className="mt-6">
        {posts.map((post, idx) => (
          <div key={idx} className="p-4 bg-white border mt-2 rounded">
            <h4 className="font-bold">{post.question}</h4>
            <p>{post.answer || "Awaiting expert response..."}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
