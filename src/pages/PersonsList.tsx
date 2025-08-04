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

  const [filterName, setFilterName] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    getCharacters({
      name: filterName,
      species: filterSpecies,
      gender: filterGender,
      status: filterStatus
    })
      .then((apiPersons) => {
        setPersons(mapperCallback(apiPersons));
      })
      .catch((error: unknown) => {
        const message = getErrorMessage(error);

        showToast(message, 'error');
      });
  }, [filterName, filterSpecies, filterGender, filterStatus]);

  return (
    <div className='persons-list container'>
      <div className='persons-list__image'>
        <img
          src={personsListImage}
          alt='Картинка Рик и Морти'
          width={600}
          height={200}
          loading='lazy'
        />
      </div>
      <div className='persons-list__body'>
        <FilterPanel
          name={filterName}
          selectedSpecies={filterSpecies}
          selectedGender={filterGender}
          selectedStatus={filterStatus}
          onNameChange={setFilterName}
          onSpeciesChange={setFilterSpecies}
          onGenderChange={setFilterGender}
          onStatusChange={setFilterStatus}
        />
        <div className='persons-list__cards'>
          {persons.map((item) => (
            <PersonCard
              key={item.id}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
