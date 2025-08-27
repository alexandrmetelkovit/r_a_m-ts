import { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import './PersonDetails.scss';

import { getCharacterById, type IApiPersons } from '../lib/api';

import { Loader } from '../components/Loader/Loader';

import IconArrowLeftBlack from '../assets/icons/arrow-left_black.svg?react';

export const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState<IApiPersons | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getCharacterById(Number(id))
      .then((data) => setPerson(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Loader
        variant='default'
        text='Loading character card...'
      />
    );

  if (!person) return <p>Персонаж не найден</p>;

  return (
    <div className='person-details container'>
      <Link
        to='/'
        className='person-details__link'
        type='link'
      >
        <IconArrowLeftBlack
          width={24}
          height={24}
          aria-label='Стрелочка назад в меню'
        />
        GO BACK
      </Link>
      <div className='person-details__body'>
        <div className='person-details__header'>
          <img
            className='person-details__header-img-person'
            src={person.image}
            width={300}
            height={300}
            loading='lazy'
            alt={person.name}
          />
          <h1 className='person-details__header-name'>{person.name}</h1>
        </div>
        <div className='person-details__info'>
          <h2 className='person-details__info-title'>Information</h2>

          <ul className='person-details__list'>
            <li className='person-details__item'>
              <p className='person-details__title'>Gender</p>
              <p className='person-details__view'>{person.gender}</p>
            </li>
            <li className='person-details__item'>
              <p className='person-details__title'>Status</p>
              <p className='person-details__view'>{person.status}</p>
            </li>
            <li className='person-details__item'>
              <p className='person-details__title'>Species</p>
              <p className='person-details__view'>{person.species}</p>
            </li>
            <li className='person-details__item'>
              <p className='person-details__title'>Origin</p>
              <p className='person-details__view'>{person.origin?.name}</p>
            </li>
            <li className='person-details__item'>
              <p className='person-details__title'>Type</p>
              <p className='person-details__view'>{person.type || 'Unknown'}</p>
            </li>
            <li className='person-details__item'>
              <p className='person-details__title'>Location</p>
              <p className='person-details__view'>{person.location?.name}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
