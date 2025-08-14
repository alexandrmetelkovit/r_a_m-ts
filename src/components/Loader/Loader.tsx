import './Loader.scss';

type LoaderVariant = 'default' | 'small';

interface ILoaderTextProps {
  variant: LoaderVariant;
  text?: string;
}

export const Loader = ({ variant, text }: ILoaderTextProps) => {
  const isSmall = variant === 'small';

  return (
    <div className='loader'>
      <img
        className='loader__image'
        src={
          isSmall ? '/src/assets/images/Loading-small.png' : '/src/assets/images/Loading-big.png'
        }
        alt='Индикатор загрузки'
        width={isSmall ? 103 : 475}
        height={isSmall ? 101 : 465}
        loading='lazy'
      />
      {text && (
        <div className='loader__text'>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};
