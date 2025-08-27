import classNames from 'classnames';

import './Input.scss';

import SearchFilterIcon from '../../assets/icons/search-filter.svg?react';

type InputVariant = 'default' | 'personEdit' | 'small';

export interface IInputProps {
  variant?: InputVariant;
  value?: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = ({
  variant = 'default',
  value,
  placeholder,
  onChange,
  onBlur
}: IInputProps) => {
  return (
    <div
      className={classNames('input', {
        'input--person-edit': variant === 'personEdit',
        'input--small': variant === 'small'
      })}
    >
      <div className='input__inner'>
        {variant === 'default' && (
          <SearchFilterIcon
            className='input__image'
            width={24}
            height={24}
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
