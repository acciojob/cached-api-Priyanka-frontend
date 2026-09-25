import "regenerator-runtime/runtime";
import React, { useEffect, useMemo, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch API only once
  useEffect(() => {
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
  }, []);

  // Cache/filter the API result based on input
  const cachedPosts = useMemo(() => {
    if (!input.trim()) {
      return posts;
    }

    return posts.filter((post) =>
      post.title.toLowerCase().includes(input.toLowerCase())
    );
  }, [posts, input]);

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