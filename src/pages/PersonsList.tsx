// import { Loader } from '../components/Loader/Loader';
// import { useState } from 'react';
// import { Dropdown } from '../components/Dropdown/Dropdown';
import { PersonCard } from '../components/PersonCard/PersonCard';
import './PersonsList.scss';
// import { Input } from '../components/Input/Input';
import imageSrcOne from '../assets/images/person-card/1.jpg';

type Person = {
  name: string;
  gender: string;
  species: string;
  location: string;
  status: 'Alive' | 'Dead' | 'Unknown';
  imageSrc: string;
};

const arrPerson: Person[] = [
  {
    name: 'Rick Sanchez',
    gender: 'Male',
    species: 'Human',
    location: 'Earth',
    status: 'Alive',
    imageSrc: imageSrcOne
  }
];

// interface DropdownOption {
//   label: string | number;
//   value: string | number;
//   color?: string; //опционально для маленького селекта
// }
// const optionsSpecies: DropdownOption[] = [
//   { value: 'human', label: 'Human' },
//   { value: 'alien', label: 'Alien' },
//   { value: 'humanoid', label: 'Humanoid' },
//   { value: 'animal', label: 'Animal' },
//   { value: 'robot', label: 'Robot' }
// ];

// const optionsStatus: DropdownOption[] = [
//   { value: 'alive', label: 'Alive', color: 'green' },
//   { value: 'dead', label: 'Dead', color: 'red' },
//   { value: 'unknown', label: 'Unknown', color: 'orange' }
// ];

export const Personslist = () => {
  // const [personName, setPersonName] = useState('');
  // const [searchName, setSearchName] = useState('');

  return (
    <div className='persons-list container'>
      <div className='persons-list__image'>
        <img
          src='/src/assets/images/persons-list.png'
          alt=''
          width={600}
          height={200}
          loading='lazy'
        />
      </div>
      {/* <Loader text='Loading characters...' /> */}
      <div className='persons-list__body'>
        {/* <Input
          variant='personEdit'
          value={personName}
          placeholder='Rick Sanchez'
          onChange={(e) => setPersonName(e.target.value)}
        /> */}

        {/* <Input
          variant='default'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder='Filter by name...'
        /> */}

        {/* <Dropdown
          selectTitle='Species'
          options={optionsSpecies}
        />
        <Dropdown
          options={optionsStatus}
          variant='small'
        /> */}
        {arrPerson.map(
          (
            {
              name,
              gender,
              location,
              status,
              species,
              imageSrc
            },
            index
          ) => (
            <PersonCard
              key={index}
              name={name}
              gender={gender}
              location={location}
              status={status}
              species={species}
              imageSrc={imageSrc}
            />
          )
        )}
      </div>
    </div>
  );
};
