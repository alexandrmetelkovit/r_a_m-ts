import './Footer.scss';

interface IFooterTextProps {
  text: string;
}

export const Footer: React.FC<IFooterTextProps> = ({
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
