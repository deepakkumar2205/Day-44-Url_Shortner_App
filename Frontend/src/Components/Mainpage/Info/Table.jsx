import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({data ,url}) {
  
  return (
    <TableContainer component={Paper} >
        <h5>Url:  {url}   </h5>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.no</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Product</TableCell>  
            <TableCell align="right">Manufacturer</TableCell>  
            <TableCell align="right">Description</TableCell>  
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,i) => (
            <TableRow
              key={`${i}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i+1}
              </TableCell>
              <TableCell component="th" scope="row">
                {new Date(row.date).toLocaleString()}
              </TableCell>
              <TableCell align="right">{row.product === null ? 'PC/Laptop': row.product}</TableCell>
              <TableCell align="right">{row.manufacturer === null ? 'Nof found' :row.manufacturer}</TableCell>
              <TableCell align="right">{row.info}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}