import { PersonCard } from '../widgets/PersonCard/PersonCard';
import type { IPersonCardProps } from '../widgets/PersonCard/PersonCard';
import { FilterPanel } from '../widgets/FilterPanel/FilterPanel';
import personsListImage from '../assets/images/persons-list.png';
import './PersonsList.scss';
import { useEffect, useState } from 'react';
import { getCharacters, mapperCallback } from '../lib/api';
import { showToast } from '../lib/toast';
import { getErrorMessage } from '../lib/errorUtils';

export const Personslist = () => {
  const [persons, setPersons] = useState<IPersonCardProps[]>([]);

  useEffect(() => {
    getCharacters()
      .then((apiPersons) => {
        setPersons(mapperCallback(apiPersons));
      })
      .catch((error: unknown) => {
        const message = getErrorMessage(error);

        showToast(message, 'error');
      });
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
