import './Loader.scss';

interface ILoaderTextProps {
  text: string;
}

export const Loader = ({ text }: ILoaderTextProps) => {
  return (
    <div className='loader'>
      <img
        className='loader__image'
        src='/src/assets/images/Loading-big.png'
        alt=''
        width={475}
        height={465}
        loading='lazy'
      />
      <div className='loader__text'>
        <p>{text}</p>
      </div>
    </div>
  );
};
