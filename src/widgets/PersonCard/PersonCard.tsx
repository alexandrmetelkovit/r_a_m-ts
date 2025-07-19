import './PersonCard.scss';

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

const statusColorMap: Record<
  IPersonCardAttributes['status'],
  string
> = {
  Alive: 'green',
  Dead: 'red',
  Unknown: 'orange'
};

export const PersonCard = ({
  name,
  gender,
  species,
  location,
  status,
  imageSrc,
  imageSrcAlt
}: IPersonCardProps) => {
  return (
    <div className='person-card'>
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
        <div className='person-card__name'>
          <p>{name}</p>
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
            <p className='person-card__view'>{location}</p>
          </li>
          <li className='person-card__item'>
            <p className='person-card__title'>Status</p>
            <p className='person-card__view'>
              {status}
              <span
                className='dot'
                style={{
                  backgroundColor: statusColorMap[status]
                }}
              ></span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
