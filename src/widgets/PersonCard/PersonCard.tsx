import { useState } from 'react';
import './PersonCard.scss';
import { Input } from '../../components/Input/Input';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import classNames from 'classnames';

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

  const findStatusOption = (value: string) => {
    const option = optionsStatus.find((option) => option.value === value);
    return option?.label;
  };

  const getStatusColor = (statusValue: string) => {
    const option = optionsStatus.find((option) => option.value === statusValue);
    return option?.color;
  };

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
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-label='Закрыть редактирование'
                    role='img'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M16.2426 7.75725C16.6332 8.14777 16.6332 8.78094 16.2426 9.17146L13.4142 11.9999L16.2426 14.8283C16.6332 15.2188 16.6332 15.852 16.2426 16.2425C15.8521 16.6331 15.2189 16.6331 14.8284 16.2425L12 13.4141L9.17157 16.2425C8.78105 16.6331 8.14788 16.6331 7.75736 16.2425C7.36683 15.852 7.36683 15.2188 7.75736 14.8283L10.5858 11.9999L7.75736 9.17146C7.36683 8.78094 7.36683 8.14777 7.75736 7.75725C8.14788 7.36673 8.78104 7.36673 9.17157 7.75725L12 10.5857L14.8284 7.75725C15.2189 7.36672 15.8521 7.36672 16.2426 7.75725Z'
                      fill='black'
                    />
                  </svg>
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
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-label='Подтвердить изменения'
                    role='img'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M18.0096 7.75798C18.4001 8.14851 18.4001 8.78167 18.0096 9.17219L10.9396 16.2422C10.7521 16.4297 10.4977 16.5351 10.2325 16.5351C9.96729 16.5351 9.71294 16.4297 9.5254 16.2422L5.9904 12.7072C5.59988 12.3167 5.59988 11.6835 5.9904 11.293C6.38093 10.9025 7.01409 10.9025 7.40462 11.293L10.2325 14.1209L16.5954 7.75798C16.9859 7.36746 17.6191 7.36746 18.0096 7.75798Z'
                      fill='black'
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  className='person-card__actions-close'
                  onClick={handleCancelEdit}
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-label='Закрыть редактирование'
                    role='img'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M16.2426 7.75725C16.6332 8.14777 16.6332 8.78094 16.2426 9.17146L13.4142 11.9999L16.2426 14.8283C16.6332 15.2188 16.6332 15.852 16.2426 16.2425C15.8521 16.6331 15.2189 16.6331 14.8284 16.2425L12 13.4141L9.17157 16.2425C8.78105 16.6331 8.14788 16.6331 7.75736 16.2425C7.36683 15.852 7.36683 15.2188 7.75736 14.8283L10.5858 11.9999L7.75736 9.17146C7.36683 8.78094 7.36683 8.14777 7.75736 7.75725C8.14788 7.36673 8.78104 7.36673 9.17157 7.75725L12 10.5857L14.8284 7.75725C15.2189 7.36672 15.8521 7.36672 16.2426 7.75725Z'
                      fill='black'
                    />
                  </svg>
                </button>

                <button
                  className='person-card__actions-edit'
                  onClick={handleEditCard}
                >
                  <svg
                    width='17'
                    height='17'
                    viewBox='0 0 17 17'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-label='Редактировать карточку'
                    role='img'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M9.83073 2.62582C10.6606 1.79595 12.0061 1.79595 12.8359 2.62582L14.3741 4.16401C15.204 4.99388 15.204 6.33935 14.3741 7.16922L6.87587 14.6675C6.74303 14.8003 6.56286 14.8749 6.375 14.8749H2.83333C2.44213 14.8749 2.125 14.5578 2.125 14.1666V10.6249C2.125 10.4371 2.19963 10.2569 2.33247 10.1241L9.83073 2.62582ZM11.8342 3.62755C11.5576 3.35093 11.1091 3.35093 10.8325 3.62755L10.2101 4.24995L12.75 6.78988L13.3724 6.16748C13.649 5.89086 13.649 5.44237 13.3724 5.16575L11.8342 3.62755ZM11.7483 7.79162L9.20833 5.25168L3.54167 10.9183V13.4583H6.0816L11.7483 7.79162Z'
                      fill='black'
                    />
                  </svg>
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
                {findStatusOption(statusValue)}
                <span
                  className='dot'
                  style={{
                    backgroundColor: getStatusColor(statusValue)
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
