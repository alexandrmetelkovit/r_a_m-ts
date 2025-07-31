import { useState } from 'react';
import './FilterPanel.scss';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Input } from '../../components/Input/Input';
import { genderOptions, speciesOptions, statusOptions } from '../../constants/filterOptions';

export const FilterPanel = () => {
  const [name, setName] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const placeholderInput = 'Filter by name...';

  const handleNameSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSpeciesChange = (value: string | number) => {
    setSelectedSpecies(String(value));
  };

  const handleGenderChange = (value: string | number) => {
    setSelectedGender(String(value));
  };

  const handleStatusChange = (value: string | number) => {
    setSelectedStatus(String(value));
  };

  return (
    <div className='filter-panel'>
      <Input
        variant='default'
        value={name}
        placeholder={placeholderInput}
        onChange={handleNameSearchFilter}
      />
      <Dropdown
        variant='default'
        options={speciesOptions}
        selectTitle='Species'
        value={selectedSpecies}
        onChange={handleSpeciesChange}
      />
      <Dropdown
        variant='default'
        options={genderOptions}
        selectTitle='Gender'
        value={selectedGender}
        onChange={handleGenderChange}
      />
      <Dropdown
        variant='default'
        options={statusOptions}
        selectTitle='Status'
        value={selectedStatus}
        onChange={handleStatusChange}
      />
    </div>
  );
};
