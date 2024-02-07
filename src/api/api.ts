import { useState, useEffect } from "react";
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface Data {
  posts: Post[];
  todos: Todo[];
}
const usePostsAndTodos = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [posts, todos] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts").then((response) =>
            response.json()
          ),
          fetch("https://jsonplaceholder.typicode.com/todos").then((response) =>
            response.json()
          ),
        ]);

        setData({ posts, todos });
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setData(null);
      setLoading(true);
      setError(null);
    };
  }, []);

  return { data, loading, error };
};

export default usePostsAndTodos;
