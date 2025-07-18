import './Footer.scss';

interface TFooterTextProps {
  text: string;
}

export const Footer: React.FC<TFooterTextProps> = ({
  text
}) => {
  return (
    <footer className='footer'>
      <div className='footer__text'>
        <p>{text}</p>
      </div>
    </footer>
  );
};
