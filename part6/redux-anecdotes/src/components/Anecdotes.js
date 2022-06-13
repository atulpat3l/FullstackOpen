import Notification from "./Notification";
import { vote, setAnecdotes } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import { notify, removeNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";
import { useEffect } from "react";
import anecdoteService from "../services/anecdotes";

const Anecdotes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  let anecdotes = useSelector((state) => state.anecdotes);
  const filterText = useSelector((state) => state.filter);

  const handleVote = (id, content) => {
    dispatch(vote(id));
    dispatch(notify(`Voted: ${content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  anecdotes = anecdotes.filter((a) => a.content.includes(filterText));

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />

      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anecdotes;
