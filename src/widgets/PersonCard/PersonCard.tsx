import { useState } from 'react';
import './PersonCard.scss';
import { Input } from '../../components/Input/Input';
import { Dropdown } from '../../components/Dropdown/Dropdown';

interface IPersonCardAttributes {
  gender: string;
  species: string;
  location: string;
  status: 'Alive' | 'Dead' | 'Unknown';
}

export interface IPersonCardProps
  extends IPersonCardAttributes {
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
  const [currentLocation, setCurrentLocation] =
    useState(location);
  const [statusValue, setStatusValue] = useState(
    status.toLowerCase()
  );
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

  const className = `person-card ${
    isEdit ? 'person-card--edit' : ''
  }`;

  return (
    <div className={className}>
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
                onChange={(e) => {
                  setCurrentName(e.target.value);
                  if (e.target.value.length >= 1)
                    setNameError('');
                }}
                onBlur={(e) => {
                  if (e.target.value.trim().length < 1)
                    setNameError(
                      'Имя не может быть пустым'
                    );
                }}
              />
              <div className='person-card__error'>
                {nameError}
              </div>
            </div>
          ) : (
            <p className='person-card__name'>
              {currentName}
            </p>
          )}

          <div className='person-card__actions'>
            {isEdit ? (
              <>
                <button
                  className='person-card__actions-close'
                  onClick={handleCancelEdit}
                >
                  <img
                    src='src/assets/icons/person-edit-close.svg'
                    alt=''
                    width={24}
                    height={24}
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
                  <img
                    src='src/assets/icons/check-edit.svg'
                    alt=''
                    width={24}
                    height={24}
                  />
                </button>
              </>
            ) : (
              <>
                <button
                  className='person-card__actions-close'
                  onClick={handleCancelEdit}
                >
                  <img
                    src='src/assets/icons/person-edit-close.svg'
                    alt=''
                    width={24}
                    height={24}
                  />
                </button>

                <button
                  className='person-card__actions-edit'
                  onClick={handleEditCard}
                >
                  <img
                    src='src/assets/icons/person-edit.svg'
                    alt=''
                    width={17}
                    height={17}
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
                  onChange={(e) => {
                    setCurrentLocation(e.target.value);
                    if (e.target.value.trim().length >= 1)
                      setLocationError('');
                  }}
                  onBlur={(e) => {
                    if (e.target.value.length < 1)
                      setLocationError(
                        'Локация не может быть пустой'
                      );
                  }}
                />
                <div className='person-card__error'>
                  {locationError}
                </div>
              </div>
            ) : (
              <p className='person-card__view'>
                {currentLocation}
              </p>
            )}
          </li>

          <li className='person-card__item'>
            <p className='person-card__title'>Status</p>

            {isEdit ? (
              <Dropdown
                variant='small'
                options={optionsStatus}
                defaultValue={statusValue}
                onChange={(value) =>
                  setStatusValue(
                    value.toString().toLowerCase()
                  )
                }
              />
            ) : (
              <p className='person-card__view'>
                {
                  optionsStatus.find(
                    (option) => option.value === statusValue
                  )?.label
                }
                <span
                  className='dot'
                  style={{
                    backgroundColor: optionsStatus.find(
                      (option) =>
                        option.value === statusValue
                    )?.color
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
