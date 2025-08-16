import { useEffect, useState } from 'react';
import type { IPersonCardProps } from '../widgets/PersonCard/PersonCard';
import { PersonCard } from '../widgets/PersonCard/PersonCard';
import { FilterPanel } from '../widgets/FilterPanel/FilterPanel';
import personsListImage from '../assets/images/persons-list.png';
import './PersonsList.scss';
import { getCharacters, mapperCallback } from '../lib/api';
import { getErrorMessage } from '../lib/errorUtils';
import { showToast } from '../lib/toast';
import { Loader } from '../components/Loader/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Personslist = () => {
  const [persons, setPersons] = useState<IPersonCardProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [filterName, setFilterName] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getCharacters({
      page: page,
      name: filterName,
      species: filterSpecies,
      gender: filterGender,
      status: filterStatus
    })
      .then((apiPersons) => {
        const mapped = mapperCallback(apiPersons.results || []).map((person) => ({
          ...person,
          onSave: handleSavePerson
        }));

        if (page === 1) {
          setPersons(mapped);
        } else {
          setPersons((prev) => [...prev, ...mapped]);
        }

        if (apiPersons.info.next !== null) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }

        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setPersons([]);
          setHasMore(false);
        } else {
          const message = getErrorMessage(error);
          showToast(message, 'error');
        }
        setIsLoading(false);
      });
  }, [page, filterName, filterSpecies, filterGender, filterStatus]);

  useEffect(() => {
    setPage(1);
    setPersons([]);
    setHasMore(true);
    setIsLoading(true);
  }, [filterName, filterSpecies, filterGender, filterStatus]);

  const handleNewPage = () => {
    setPage((prev) => prev + 1);
  };

  const handleSavePerson = (
    id: number,
    newName: string,
    newLocation: string,
    newStatus: string
  ) => {
    setPersons((prev) =>
      prev.map((person) =>
        person.id === id
          ? { ...person, name: newName, location: newLocation, status: newStatus }
          : person
      )
    );
  };

  return (
    <div className='persons-list container'>
      <div className='persons-list__image'>
        <img
          src={personsListImage}
          alt='Картинка Рик и Морти'
          width={600}
          height={200}
          loading='lazy'
        />
      </div>
      <div className='persons-list__body'>
        <FilterPanel
          name={filterName}
          selectedSpecies={filterSpecies}
          selectedGender={filterGender}
          selectedStatus={filterStatus}
          onNameChange={setFilterName}
          onSpeciesChange={setFilterSpecies}
          onGenderChange={setFilterGender}
          onStatusChange={setFilterStatus}
        />

        <div className='persons-list__cards-inner'>
          {isLoading && page === 1 ? (
            <Loader variant='default' />
          ) : persons.length === 0 ? (
            <div className='persons-list__not-found'>
              <p>Персонажи не найдены по выбранным фильтрам</p>
            </div>
          ) : (
            <InfiniteScroll
              className='persons-list__cards'
              dataLength={persons.length}
              next={() => {
                if (!isLoading) {
                  setIsLoading(true);
                  handleNewPage();
                }
              }}
              hasMore={hasMore}
              loader={<Loader variant='small' />}
            >
              {persons.map((person) => (
                <PersonCard
                  key={person.id}
                  {...person}
                  onSave={handleSavePerson}
                />
              ))}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};
