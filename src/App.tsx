import { Content } from './components/Content/Content';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';

import { Personslist } from './pages/PersonsList';
import { PersonDetails } from './pages/PersonDetails';

function App() {
  return (
    <>
      <Header />
      <Content>
        <Routes>
          <Route
            path='/'
            element={<Personslist />}
          />
          <Route
            path='/details'
            element={<PersonDetails />}
          />
        </Routes>
      </Content>
      <Footer text='Made with love by AlexanderMetelkov' />
    </>
  );
}

export default App;
