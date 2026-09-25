import "regenerator-runtime/runtime";
import React, { useMemo, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  // Re-fetch when input changes
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

  // Cache the API result
  const cachedPosts = useMemo(() => {
    return posts;
  }, [posts]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        cachedPosts.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))
      )}
    </div>
  );
}

export default App;