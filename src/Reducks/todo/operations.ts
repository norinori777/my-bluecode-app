import axios from 'axios';

export const fetchTodo = async () => {
  const response = await axios.get('http://localhost:8080/todo')
  return response.data
}

export const addTodo = async (text: string) => {
    const response = await axios.post('http://localhost:8080/todo', { text: text })
    return response.data
}

export const doneTodo = async (id: number) => {
    const response = await axios.put(`http://localhost:8080/todo/${id}`)
    return response.data
}

export const deleteTodo = async (id: number) => {
    const response = await axios.delete(`http://localhost:8080/todo/${id}`)
    return response.data
}