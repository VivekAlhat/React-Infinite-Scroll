import axios from "axios";
import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";

const fetchTodos = ({ pageParam = 1 }) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${pageParam}`
  );
};

function App() {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery("todos", fetchTodos, {
      getNextPageParam: (lastPage, pages) => {
        return pages.length <= 20 ? pages.length + 1 : undefined;
      },
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore={fetchNextPage}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {data?.pages.map((page, id) => {
          return (
            <Fragment key={id}>
              {page?.data.map((todo) => (
                <div key={todo.id} className="todo">
                  {todo.title}
                </div>
              ))}
            </Fragment>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default App;
