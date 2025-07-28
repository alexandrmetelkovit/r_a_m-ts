import { useState } from 'react';
import './PersonCard.scss';
import { Input } from '../../components/Input/Input';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import classNames from 'classnames';
import CloseIcon from '../../assets/icons/person-edit-close.svg?react';
import DoneIcon from '../../assets/icons/check-edit.svg?react';
import EditIcon from '../../assets/icons/person-edit.svg?react';

interface IPersonCardAttributes {
  gender: string;
  species: string;
  location: string;
  status: 'Alive' | 'Dead' | 'Unknown';
}

export interface IPersonCardProps extends IPersonCardAttributes {
  name: string;
  imageSrc: string;
  imageSrcAlt: string;
}

const optionsStatus = [
  { label: 'Alive', value: 'alive', color: 'green' },
  { label: 'Dead', value: 'dead', color: 'red' },
  { label: 'Unknown', value: 'unknown', color: 'orange' }
];

export const PersonCard = ({
  name,
  gender,
  species,
  location,
  status,
  imageSrc,
  imageSrcAlt
}: IPersonCardProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [currentLocation, setCurrentLocation] = useState(location);

  const [statusValue, setStatusValue] = useState(status.toLowerCase());
  const [nameError, setNameError] = useState('');
  const [locationError, setLocationError] = useState('');

  const handleSaveChange = () => {
    setIsEdit(false);
  };

  const handleEditCard = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setNameError('');
    setLocationError('');
    setCurrentName(name);
    setCurrentLocation(location);
    setStatusValue(status.toLocaleLowerCase());
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.target.value);
    if (e.target.value.trim().length >= 1) setNameError('');
  };

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length < 1) setNameError('Имя не может быть пустым');
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLocation(e.target.value);
    if (e.target.value.length >= 1) setLocationError('');
  };

  const handleLocationBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length < 1) setLocationError('Локация не может быть пустой');
  };

  const handleStatusChange = (value: string | number) =>
    setStatusValue(value.toString().toLowerCase());

  const label = optionsStatus.find((option) => option.value === statusValue)?.label;

  const color = optionsStatus.find((option) => option.value === statusValue)?.color;

  return (
    <div
      className={classNames('person-card', {
        'person-card--edit': isEdit
      })}
    >
      <div className='person-card__image'>
        <img
          src={imageSrc}
          width={240}
          height={234}
          loading='lazy'
          alt={imageSrcAlt}
        />
      </div>
      <div className='person-card__body'>
        <div className='person-card__header'>
          {isEdit ? (
            <div className='person-card__name-inner'>
              <Input
                variant='personEdit'
                value={currentName}
                placeholder=''
                onChange={handleNameChange}
                onBlur={handleNameBlur}
              />
              <div className='person-card__error'>{nameError}</div>
            </div>
          ) : (
            <p className='person-card__name'>{currentName}</p>
          )}

          <div className='person-card__actions'>
            {isEdit ? (
              <>
                <button
                  className='person-card__actions-close'
                  onClick={handleCancelEdit}
                >
                  <CloseIcon
                    width={24}
                    height={24}
                    aria-label='Закрыть редактирование'
                  />
                </button>
                <button
                  className='person-card__actions-done'
                  onClick={handleSaveChange}
                  disabled={
                    Boolean(nameError) ||
                    Boolean(locationError) ||
                    currentName.length < 1 ||
                    currentLocation.length < 1
                  }
                >
                  <DoneIcon
                    width={24}
                    height={24}
                    aria-label='Подтвердить изменения'
                  />
                </button>
              </>
            ) : (
              <>
                <button
                  className='person-card__actions-close'
                  onClick={handleCancelEdit}
                >
                  <CloseIcon
                    width={24}
                    height={24}
                    aria-label='Закрыть редактирование'
                  />
                </button>

                <button
                  className='person-card__actions-edit'
                  onClick={handleEditCard}
                >
                  <EditIcon
                    width={17}
                    height={17}
                    aria-label='Редактировать карточку'
                  />
                </button>
              </>
            )}
          </div>
        </div>

        <ul className='person-card__list'>
          <li className='person-card__item'>
            <p className='person-card__title'>Gender</p>
            <p className='person-card__view'>{gender}</p>
          </li>
          <li className='person-card__item'>
            <p className='person-card__title'>Species</p>
            <p className='person-card__view'>{species}</p>
          </li>
          <li className='person-card__item'>
            <p className='person-card__title'>Location</p>
            {isEdit ? (
              <div className='person-card__view-inner'>
                <Input
                  variant='small'
                  value={currentLocation}
                  placeholder=''
                  onChange={handleLocationChange}
                  onBlur={handleLocationBlur}
                />
                <div className='person-card__error'>{locationError}</div>
              </div>
            ) : (
              <p className='person-card__view'>{currentLocation}</p>
            )}
          </li>

          <li className='person-card__item'>
            <p className='person-card__title'>Status</p>

            {isEdit ? (
              <Dropdown
                variant='small'
                options={optionsStatus}
                defaultValue={statusValue}
                onChange={handleStatusChange}
              />
            ) : (
              <p className='person-card__view'>
                {label}
                <span
                  className='dot'
                  style={{
                    backgroundColor: color
                  }}
                />
              </p>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
