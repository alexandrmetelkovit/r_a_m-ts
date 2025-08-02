import axios from 'axios';
import type { IPersonCardProps } from '../widgets/PersonCard/PersonCard';

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

export const mapperCallback = (persons: IApiPersons[]): IPersonCardProps[] => {
  return persons.map((person) => ({
    name: person.name,
    gender: person.gender,
    species: person.species,
    location: person.location?.name || '',
    status: person.status as 'Alive' | 'Dead' | 'Unknown',
    imageSrc: person.image,
    imageSrcAlt: person.name
  }));
};

export const getCharacters = async (params = {}) => {
  const response = await axios.get(`${BASE_URL}${CHARACTER_ENDPOINT}`, { params });
  return response.data.results;
};
