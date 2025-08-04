import './Footer.scss';

interface IFooterTextProps {
  text: string;
}

export const Footer = ({ text }: IFooterTextProps) => {
  return (
    <footer className='footer'>
      <div className='footer__text'>
        <p>{text}</p>
      </div>
    </footer>
  );
};
