import { useContext } from 'react';
import { GraphContext } from '../context/GraphContext';

const useGraph = () => {
  return useContext(GraphContext);
};

export default useGraph;