import { useContext } from 'react';
import { Box, Card, Grid, TextField, Typography } from '@mui/material';
import { MyContext } from '../contexts/Provider';

export default function Header() {
  const {
    values: { name, power, minPower, maxPower },
    setters: { setPower, setName },
  } = useContext(MyContext);

  return (
    <>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
    </>
  );
}
