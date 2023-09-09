import { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { MyContext } from '../contexts/Provider';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function PokemonTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);

  const {
    values: { name, power },
    setters: { setMaxPower, setMinPower },
  } = useContext(MyContext);

  useEffect(() => {
    fetch('/pokemon.json')
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const rows = useMemo(() => {
    return data
      .filter(
        (item) =>
          item.name.toLowerCase().includes(name.toLowerCase()) || name == ''
      )
      .map((item) => ({
        ...item,
        power:
          item.hp +
          item.attack +
          item.defense +
          item.special_attack +
          item.special_defense +
          item.speed,
      }))
      .filter((item) => power == 0 || item.power >= power);
  }, [data, name, power]);

  useEffect(() => {
    const tmp = rows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    if (tmp.length > 0) {
      setMaxPower(
        tmp.reduce((max, curr) => (curr.power > max.power ? curr : max)).power
      );
      setMinPower(
        tmp.reduce((max, curr) => (curr.power < max.power ? curr : max)).power
      );
    }
  }, [page, rowsPerPage, rows, setMinPower, setMaxPower]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead sx={{ backgroundColor: '#F1F4F6' }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Health</TableCell>
            <TableCell align="right">Attack</TableCell>
            <TableCell align="right">Defense</TableCell>
            <TableCell align="right">Special Attack</TableCell>
            <TableCell align="right">Special Defense</TableCell>
            <TableCell align="right">Speed</TableCell>
            <TableCell align="right">Power</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.type}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.hp}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.attack}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.defense}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.special_attack}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.special_defense}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.speed}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.power}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={9} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={9}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
