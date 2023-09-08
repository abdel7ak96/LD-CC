import { Box, Container } from '@mui/material';
import PokemonTable from './components/table';
import { useState, createContext } from 'react';
import Header from './components/header';

export const MyContext = createContext();

function App() {
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [minPower, setMinPower] = useState(0);
  const [maxPower, setMaxPower] = useState(0);

  return (
    <>
      <MyContext.Provider
        value={{
          values: { name, power, minPower, maxPower },
          setters: {
            setName,
            setPower,
            setMinPower,
            setMaxPower,
          },
        }}
      >
        <Container maxWidth="lg">
          <Box my={4}>
            <Header />
          </Box>
          <Box>
            <PokemonTable />
          </Box>
        </Container>
      </MyContext.Provider>
    </>
  );
}

export default App;
