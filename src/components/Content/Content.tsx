import './Content.scss';

interface IContentProps {
  children: React.ReactNode;
}

export const Content: React.FC<IContentProps> = ({
  children
}) => {
  return (
    <main className='content container'>{children}</main>
  );
};
