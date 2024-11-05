import axios from 'axios';

export const fetchMember = async () => {
  const response = await axios.get('http://localhost:8080/member');
  return response.data;
};

export const addMember = async (name: string, email: string, position: string, status: boolean) => {
  const response = await axios.post('http://localhost:8080/member/add', { name: name, email: email, position: position, status: status });
  return response.data;
}

export const deleteMemberOperaton = async (id: string) => {
  const response = await axios.delete(`http://localhost:8080/member/delete/${id}`);
  return response.data;
}