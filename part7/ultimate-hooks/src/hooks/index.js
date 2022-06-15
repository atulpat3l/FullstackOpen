import axios from "axios";
import { useState } from "react";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources(resources.concat(response.data));
  };

  const services = {
    getAll,
    create,
  };

  return [resources, services];
};

export default useResource;
