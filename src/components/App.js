import "regenerator-runtime/runtime";
import React, { useMemo, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  useMemo(() => {
    setLoading(true);

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [input]);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))
      )}
    </div>
  );
}

export default App;