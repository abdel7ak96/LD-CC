import {
  Box,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import PokemonTable from './components/table';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [power, setPower] = useState('');
  const [minPower, setMinPower] = useState(0);
  const [maxPower, setMaxPower] = useState(0);

  const minPowerHandler = (newValue) => {
    setMinPower(newValue);
  };
  const maxPowerHandler = (newValue) => {
    setMaxPower(newValue);
  };

  return (
    <>
      <Container maxWidth="lg">
        {/* -- Selection card -- */}
        <Card
          variant="outlined"
          sx={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
        >
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="search"
                  label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="power"
                  label="Power threshold"
                  value={power}
                  type="number"
                  onChange={(e) => setPower(e.target.value)}
                />
              </Grid>
            </Grid>
            <Typography mt={4}>Min power: {minPower}</Typography>
            <Typography>Max power: {maxPower}</Typography>
          </Box>
        </Card>

        {/* -- Table -- */}
        <Box mt={5}>
          <PokemonTable
            search={search}
            power={parseInt(power || '0')}
            setMaxPower={maxPowerHandler}
            setMinPower={minPowerHandler}
          />
        </Box>
      </Container>
    </>
  );
}

export default App;
