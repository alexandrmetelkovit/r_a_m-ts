import { useEffect, useRef, useState } from 'react';
import './Dropdown.scss';

type DropdownVariant = 'default' | 'small';

interface DropdownOption {
  label: string | number;
  value: string | number;
  color?: string; //опционально для маленького селекта
}

interface DropdownProps {
  options: DropdownOption[];
  variant?: DropdownVariant;
  defaultValue?: string;
  selectTitle?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  selectTitle,
  options,
  variant,
  defaultValue
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    string | number | null
  >(
    defaultValue || (variant === 'small' ? 'unknown' : null)
  );
  const dropdownInnerRef = useRef<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (
        dropdownInnerRef.current &&
        !dropdownInnerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      'mousedown',
      handleDocumentClick
    );
    return () => {
      document.removeEventListener(
        'mousedown',
        handleDocumentClick
      );
    };
  }, []);

  const selected = options.find(
    (option) => option.value === selectedOption
  );

  const className = `dropdown${
    variant === 'small' ? ' dropdown--small' : ''
  }`;

  return (
    <div
      className={className}
      ref={dropdownInnerRef}
    >
      <button
        className='dropdown__button'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selected ? (
          <>
            {selected.label}
            {variant === 'small' && selected.color && (
              <span
                className='dropdown__dot'
                style={{ backgroundColor: selected.color }}
              />
            )}
          </>
        ) : (
          selectTitle
        )}
        <span
          className={`dropdown__arrow ${
            isOpen ? 'active' : ''
          }`}
        ></span>
      </button>

      {isOpen && (
        <nav
          className={`dropdown-inner ${
            isOpen ? 'active' : ''
          }`}
        >
          <ul className='dropdown__list'>
            {options.map(({ label, value, color }) => (
              <li
                key={value}
                className='dropdown__item'
                onClick={() => {
                  setSelectedOption(value);
                  setIsOpen(false);
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
