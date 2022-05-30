import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const NewNote = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.value = "";
    dispatch(createAnecdote(content));
    dispatch(notify("hah"));
    setTimeout(() => {
      dispatch(notify(null));
    }, 2000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default NewNote;
