import './FilterPanel.scss';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Input } from '../../components/Input/Input';
import { genderOptions, speciesOptions, statusOptions } from '../../constants/filterOptions';

interface IFilterPanelProps {
  name: string;
  selectedSpecies: string;
  selectedGender: string;
  selectedStatus: string;

  onNameChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const FilterPanel = ({
  name,
  selectedSpecies,
  selectedGender,
  selectedStatus,
  onNameChange,
  onSpeciesChange,
  onGenderChange,
  onStatusChange
}: IFilterPanelProps) => {
  const placeholderInput = 'Filter by name...';
  const placeholderSpecies = 'Species';
  const placeholderGender = 'Gender';
  const placeholderStatus = 'Status';

  const handleNameSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };
  const handleSpeciesChange = (value: string | number) => {
    onSpeciesChange(String(value));
  };

  const handleGenderChange = (value: string | number) => {
    onGenderChange(String(value));
  };

  const handleStatusChange = (value: string | number) => {
    onStatusChange(String(value));
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
        placeholder={placeholderSpecies}
        value={selectedSpecies}
        onChange={handleSpeciesChange}
      />
      <Dropdown
        variant='default'
        options={genderOptions}
        placeholder={placeholderGender}
        value={selectedGender}
        onChange={handleGenderChange}
      />
      <Dropdown
        variant='default'
        options={statusOptions}
        placeholder={placeholderStatus}
        value={selectedStatus}
        onChange={handleStatusChange}
      />
    </div>
  );
};
