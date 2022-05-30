import { useDispatch } from "react-redux";
import { text } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(text(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
