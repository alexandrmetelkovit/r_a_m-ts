import { PersonCard } from '../components/PersonCard/PersonCard';
import './PersonsList.scss';
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

export const Personslist = () => {
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
      <div className='persons-list__body'>
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
