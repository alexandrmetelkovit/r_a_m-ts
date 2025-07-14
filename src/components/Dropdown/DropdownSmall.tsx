import { useEffect, useRef, useState } from 'react';
import './DropdownSmall.scss';

interface TOptions {
  label: string | number;
  value: string | number;
  color: string;
}

const options: TOptions[] = [
  { value: 'alive', label: 'Alive', color: 'green' },
  { value: 'dead', label: 'Dead', color: 'red' },
  { value: 'unknown', label: 'Unknown', color: 'orange' }
];

export const DropdownSmall = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    string | number | null
  >('alive');
  const dropdownInnerRef = useRef<HTMLDivElement | null>(
    null
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (
        dropdownInnerRef.current &&
        !dropdownInnerRef.current.contains(
          event.target as Node
        )
      ) {
        handleClose();
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

  return (
    <div
      className='dropdown-small'
      ref={dropdownInnerRef}
    >
      <button
        className='dropdown-small__button'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selected ? (
          <>
            {selected.label}
            <span
              className='dropdown-small__dot'
              style={{ backgroundColor: selected.color }}
            />
          </>
        ) : (
          'Alive'
        )}
        <span
          className={`dropdown-small__arrow ${
            isOpen ? 'active' : ''
          }`}
        ></span>
      </button>
      {isOpen && (
        <nav
          className={`dropdown-small-inner ${
            isOpen ? 'active' : ''
          }`}
        >
          <ul className='dropdown-small__list'>
            {options.map(({ label, value, color }) => (
              <li
                key={value}
                className='dropdown-small__item'
                onClick={() => {
                  setSelectedOption(value);
                  handleClose();
                }}
              >
                {label}
                <span
                  className='dropdown-small__dot'
                  style={{ backgroundColor: color }}
                />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};
