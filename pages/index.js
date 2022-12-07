import Image from "next/image";
import posts from "../component/pagination";
import { useState } from "react";
import {
  useGetTodosQuery,
  useAddTodosMutation,
  useUpdateTodosMutation,
  useDeleteTodosMutation,
} from "../utils/reducer";
import Pagination from "../component/pagination";

export default function Home(props) {
  const [newTodo, setNewTodo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);
  const [addTodos] = useAddTodosMutation();
  const [deleteTodos] = useDeleteTodosMutation();
  const [updateTodos] = useUpdateTodosMutation();
  const {
    data: todos,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetTodosQuery(props);

  const handleSubmit = (e) => {
    e.preventDefault();
    let num = todos.length + 1;
    addTodos({ userId: 1, id: num, title: newTodo, completed: false });
    setNewTodo("");
  };

  // //get curr ppage
  // const indexOfLast = currentPage * todosPerPage;
  // const indexOfFirst = indexOfLast - todosPerPage;
  // const currPage = todos.slice(indexOfFirst, indexOfLast);

  // //change page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      return (
        <>
          <div className="mb-4">
            <div
              key={todo.id}
              className="w-[26rem] h-[2.5rem] flex  px-3 py-2 bg-btnColor rounded-md  "
            >
              <input
                type="checkbox"
                checked={todo.completed}
                id={todo.id}
                onChange={() =>
                  updateTodos({ ...todo, completed: !todo.completed })
                }
              />

              <span className="text-putih text-sm font-light pl-3">
                {todo.title}
              </span>
            </div>
          </div>
        </>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return (
    <div className="container">
      <div className=" h-screen w-full overflow-y-scroll p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-putih w-[15rem]">
            Manage your task with <span className="text-gradient">taskoo</span>
          </h1>
          <Image src="/gbr1.png" alt="Vercel Logo" width={200} height={200} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-between items-center pt-[4rem] pb-9"
        >
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add task here"
            className="w-[25rem] h-[2.5rem] px-3 bg-putih border rounded-md placeholder:text-gray-500 text-xs text-btnColor focus:outline-none focus:border-putih border-abu font-light "
          ></input>
          <button className="bg-btnColor w-[5rem] h-[2.5rem] text-sm font-normal text-putih rounded-md">
            Submit
          </button>
        </form>

        <div className="w-[30rem] h-[20rem] bg-btnColor cardInput px-6 py-8 overflow-y-scroll ">
          {content}
        </div>
        {/* <Pagination
          todosPerPage={todosPerPage}
          totalTodos={todos.length}
          paginate={paginate}
        /> */}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();

  return {
    props: {
      todos,
    },
  };
};
