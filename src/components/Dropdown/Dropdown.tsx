import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './Dropdown.scss';

type DropdownVariant = 'default' | 'small';

interface IDropdownOption {
  label: string | number;
  value: string | number;
  color?: string; //опционально для маленького селекта
}

export interface IDropdownProps {
  options: IDropdownOption[];
  variant?: DropdownVariant;
  value?: string;
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (value: string | number) => void;
}

export const Dropdown: React.FC<IDropdownProps> = ({
  options,
  variant,
  value,
  defaultValue,
  placeholder,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(
    defaultValue || (variant === 'small' ? 'unknown' : null)
  );
  const dropdownInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (dropdownInnerRef.current && !dropdownInnerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  const currentValue = value || selectedOption;

  const selected = options.find((option) => option.value === currentValue);

  const className = `dropdown${variant === 'small' ? ' dropdown--small' : ''}`;

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={className}
      ref={dropdownInnerRef}
    >
      <button
        className='dropdown__button'
        onClick={handleClose}
      >
        {selected ? (
          <div className='dropdown__button-body'>
            {selected.label}
            {variant === 'small' && selected.color && (
              <span
                className='dropdown__dot'
                style={{ backgroundColor: selected.color }}
              />
            )}
          </div>
        ) : (
          placeholder
        )}
        <span
          className={classNames('dropdown__arrow', {
            active: isOpen
          })}
        ></span>
      </button>

      {isOpen && (
        <nav
          className={classNames('dropdown-inner', {
            active: isOpen
          })}
        >
          <ul className='dropdown__list'>
            {options.map(({ label, value, color }) => (
              <li
                key={value}
                className='dropdown__item'
                onClick={() => {
                  setSelectedOption(value);
                  onChange?.(value);
                  handleClose();
                }}
              >
                {label}
                {variant === 'small' && color && (
                  <span
                    className='dropdown__dot'
                    style={{ backgroundColor: color }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};
