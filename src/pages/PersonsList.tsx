import { PersonCard } from '../widgets/PersonCard/PersonCard';
import './PersonsList.scss';
import imageSrcOne from '../assets/images/person-card/1.jpg';
import type { IPersonCardProps } from '../widgets/PersonCard/PersonCard';

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
          src='/src/assets/images/persons-list.png'
          alt=''
          width={600}
          height={200}
          loading='lazy'
        />
      </div>
      <div className='persons-list__body'>
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
