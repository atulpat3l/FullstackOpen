import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id, name) => {
  axios
    .delete(`${baseUrl}/${id}`)
    .catch((err) => alert(`${name} was already deleted from server`));
};

const update = (id, newNumberObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newNumberObject);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deletePerson, update };
