import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';
const CHARACTER_ENDPOINT = '/character';

export interface IApiPersons {
  id: number;
  name: string;
  gender: string;
  species: string;
  location: { name: string; url: string };
  status: string;
  image: string;
}

export const getCharacters = async (params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${CHARACTER_ENDPOINT}`, { params });
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
