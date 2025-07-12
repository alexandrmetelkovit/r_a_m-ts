import { Loader } from '../components/Loader/Loader';
import './PersonsList.scss';

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
        <Loader text='Loading characters...' />
      </div>
    </div>
  );
};
