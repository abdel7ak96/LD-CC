import {
  Box,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import PokemonTable from './components/table';

function App() {
  return (
    <>
      <Container maxWidth="md">
        {/* -- Selection card -- */}
        <Card
          variant="outlined"
          sx={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
        >
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs="6">
                <TextField fullWidth id="search" label="Search" />
              </Grid>
              <Grid item xs="6">
                <TextField fullWidth id="power" label="Power threshold" />
              </Grid>
            </Grid>
            <Typography mt={4}>Min power: 253</Typography>
            <Typography>Max power: 540</Typography>
          </Box>
        </Card>

        {/* -- Table -- */}
        <Box mt={5}>
          <PokemonTable />
        </Box>
      </Container>
    </>
  );
}

export default App;
