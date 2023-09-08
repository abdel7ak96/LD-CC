import { Box, Container } from '@mui/material';
import PokemonTable from './components/table';
import Header from './components/header';
import MyProvider from './contexts/Provider';

function App() {
  return (
    <MyProvider>
      <Container maxWidth="lg">
        <Box my={4}>
          <Header />
        </Box>
        <Box>
          <PokemonTable />
        </Box>
      </Container>
    </MyProvider>
  );
}

export default App;
