import { useEffect, useRef, useState } from 'react';
import './Dropdown.scss';

interface TOptions {
  label: string | number;
  value: string | number;
}

const options: TOptions[] = [
  { value: 'human', label: 'Human' },
  { value: 'alien', label: 'Alien' },
  { value: 'humanoid', label: 'Humanoid' },
  { value: 'animal', label: 'Animal' },
  { value: 'robot', label: 'Robot' }
];

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    string | number | null
  >(null);
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

  return (
    <div
      className='dropdown'
      ref={dropdownInnerRef}
    >
      <button
        className='dropdown__button'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selectedOption
          ? options.find(
              (option) => option.value === selectedOption
            )?.label
          : 'Species'}
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
            {options.map(({ label, value }) => (
              <li
                key={value}
                className='dropdown__item'
                onClick={() => {
                  setSelectedOption(value);
                  handleClose();
                }}
              >
                {label}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};
