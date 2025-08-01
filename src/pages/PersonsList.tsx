import { PersonCard } from '../widgets/PersonCard/PersonCard';
import type { IPersonCardProps } from '../widgets/PersonCard/PersonCard';
import { FilterPanel } from '../widgets/FilterPanel/FilterPanel';
import personsListImage from '../assets/images/persons-list.png';
import './PersonsList.scss';
import { useEffect, useState } from 'react';
import { getCharacters, type IApiPersons } from '../lib/api';

export const Personslist = () => {
  const [persons, setPersons] = useState<IPersonCardProps[]>([]);

  useEffect(() => {
    getCharacters()
      .then((apiPersons) => {
        const mapped = apiPersons.map((person: IApiPersons) => ({
          name: person.name,
          gender: person.gender,
          species: person.species,
          location: person.location?.name || '',
          status: person.status as 'Alive' | 'Dead' | 'Unknown',
          imageSrc: person.image,
          imageSrcAlt: person.name
        }));
        setPersons(mapped);
      })
      .catch((error) => console.log(error, 'ошибка загрузки'));
  }, []);

  return (
    <div className='persons-list container'>
      <div className='persons-list__image'>
        <img
          src={personsListImage}
          alt=''
          width={600}
          height={200}
          loading='lazy'
        />
      </div>
      <div className='persons-list__body'>
        <FilterPanel />
        <div className='persons-list__cards'>
          {persons.map((item, index) => (
            <PersonCard
              key={index}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
