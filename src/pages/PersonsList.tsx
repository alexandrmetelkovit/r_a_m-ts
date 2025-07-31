import './PersonsList.scss';
import { PersonCard } from '../widgets/PersonCard/PersonCard';
import type { IPersonCardProps } from '../widgets/PersonCard/PersonCard';
import imageSrcOne from '../assets/images/person-card/1.jpg';
import personsListImage from '../assets/images/persons-list.png';
import { FilterPanel } from '../widgets/FilterPanel/FilterPanel';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { speciesOptions } from '../constants/filterOptions';

const arrPerson: IPersonCardProps[] = [
  {
    name: 'Rick Sanchez',
    gender: 'Male',
    species: 'Human',
    location: 'Earth',
    status: 'Alive',
    imageSrc: imageSrcOne,
    imageSrcAlt: 'картинка персонажа рик'
  }
];

export const Personslist = () => {
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
        {arrPerson.map((item, index) => (
          <PersonCard
            key={index}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
