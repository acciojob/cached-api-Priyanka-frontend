import "regenerator-runtime/runtime";
import React, { useMemo, useState } from "react";
import React, { useEffect, useMemo, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch API only when the component loads
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

  // Cache the posts result
  const cachedPosts = useMemo(() => {
    return posts;
  }, [posts]);

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
        cachedPosts.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))
      )}
    </div>
  );
}

export default App;