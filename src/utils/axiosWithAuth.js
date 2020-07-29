import axios from 'axios';

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem('token'));

  return axios.create({
    headers: {
      token: token
    },
    baseURL: "https://bw-usemytechstuff.herokuapp.com"
  });
};