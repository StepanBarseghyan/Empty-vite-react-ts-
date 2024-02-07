import React from "react";
import usePostsAndTodos from "../../api/api";

const PostsAndTodos = () => {
  const { data, error, loading } = usePostsAndTodos();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="main">
      <div className="posts">
        {data?.posts.map((post) => (
          <div key={post.id}>
            <p>{post.title}</p>
          </div>
        ))}
      </div>
      <div className="todos">
        {data?.todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsAndTodos;
