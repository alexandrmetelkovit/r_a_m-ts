import './Header.scss';

import imageHeader from '../../assets/images/header-logo/1.svg';

import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__inner container'>
        <Link to='/'>
          <img
            src={imageHeader}
            alt='Логотип приложения'
            width={46}
            height={49}
            loading='lazy'
          />
        </Link>
      </div>
    </header>
  );
};
