import axios from 'axios';

export const fetchTest = async () => {
  const response = await axios.get('http://localhost:8080/test');
  return response.data;
};