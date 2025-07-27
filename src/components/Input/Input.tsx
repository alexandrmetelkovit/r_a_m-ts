import './Input.scss';
import classNames from 'classnames';

type InputVariant = 'default' | 'personEdit' | 'small';

export interface IInputProps {
  variant?: InputVariant;
  value?: string | number;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<IInputProps> = ({
  variant = 'default',
  value,
  placeholder,
  onChange,
  onBlur
}) => {
  return (
    <div
      className={classNames('input', {
        'input--person-edit': variant === 'personEdit',
        'input--small': variant === 'small'
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
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};
