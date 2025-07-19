import './Input.scss';
import classNames from 'classnames';

type InputVariant = 'default' | 'personEdit';

export interface IInputProps {
  variant?: InputVariant;
  value?: string | number;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const Input: React.FC<IInputProps> = ({
  variant = 'default',
  value,
  placeholder,
  onChange
}) => {
  return (
    <div
      className={classNames('input', {
        'input--person-edit': variant === 'personEdit'
      })}
    >
      <div className='input__inner'>
        {variant === 'default' && (
          <img
            className='input__image'
            src='./src/assets/icons/search-filter.svg'
            alt=''
            width={24}
            height={24}
            loading='lazy'
          />
        )}
        <input
          className='input__form'
          type='text'
          placeholder={placeholder || 'Filter by name...'}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
