import './Header.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__inner container'>
        <Link to='/'>
          <img
            src='/src/assets/images/header-logo/1.svg'
            alt=''
            width={46}
            height={49}
            loading='lazy'
          />
        </Link>
      </div>
    </header>
  );
};
