import axios from 'axios';

export const fetchMember = async () => {
  const response = await axios.get('http://localhost:8080/member');
  return response.data;
};