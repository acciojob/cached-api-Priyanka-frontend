import React, { useEffect, useMemo, useState } from "react";

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const cachedPosts = useMemo(() => {
    return posts;
  }, [posts]);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {" "}
      {cachedPosts.map((post) => (
        <div key={post.id}>
          {" "}
          <h2>{post.title}</h2> <p>{post.body}</p>{" "}
        </div>
      ))}{" "}
    </div>
  );
}
export default App;
