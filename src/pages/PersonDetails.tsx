import './PersonDetails.scss';
import { Loader } from '../components/Loader/Loader';
import { Link } from 'react-router-dom';

export const PersonDetails = () => {
  return (
    <>
      <div className='person-details container'>
        <Link
          to='/'
          className='person-details__link'
          type='link'
        >
          <img
            src='./src/assets/icons/arrow-left_black.svg'
            alt=''
            width={24}
            height={24}
          />
          GO BACK
        </Link>
        <div className='person-details__body'>
          <Loader text='Loading characters...' />
        </div>
      </div>
    </>
  );
};
