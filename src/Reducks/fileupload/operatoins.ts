import axios from 'axios';

export const fetchFile = async () => {
  const response = await axios.get('http://localhost:8080/file');
  return response.data;
};

export const addFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('http://localhost:8080/file/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}

export const addFile2 = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post('http://localhost:8080/file/add2', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}
