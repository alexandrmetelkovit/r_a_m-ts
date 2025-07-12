import './Content.scss';

interface TContentProps {
  children: React.ReactNode;
}

export const Content: React.FC<TContentProps> = ({
  children
}) => {
  return (
    <main className='content container'>{children}</main>
  );
};
