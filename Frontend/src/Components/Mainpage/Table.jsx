import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getUrlsFromDb, handleDeleteUrl, toastFuncDanger, toastFuncSuccess } from './axios';
import { TableAction } from '../../Redux/Reducers/urls.reducer';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export  function AllocationTableComp() {
  const APIFront = 'http://localhost:5173'
  const tableData = useSelector((state)=>state.urls.table)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleDelete(id){
         handleDeleteUrl(id).then((res)=>{
          //! axios
          getUrlsFromDb()
          .then((res)=>{
            toastFuncDanger("Deleted Successfully")
            dispatch(TableAction(res.data))
          })
         
         }) .catch((err)=>{
          if(err.request.status === 401){
              navigate("/signin")
          }
        })
      }

  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S.No</StyledTableCell>
            <StyledTableCell width={200}>Title</StyledTableCell>
            <StyledTableCell width={200}  align="right">Base Url</StyledTableCell>
            <StyledTableCell  width={200}   align="right" >Short Url</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row,index) => (
            <StyledTableRow key={`${index}`}>
              <StyledTableCell  component="th" scope="row">{index+1}</StyledTableCell>
              <StyledTableCell >{row.title}</StyledTableCell>
              <StyledTableCell style={{inlineSize:'auto', overflow:'hidden',width:"600px",display:'inline-block',wordWrap:"break-word"}} align="right">{row.baseUrl}</StyledTableCell>
              <StyledTableCell align="right">
                <a href={`${APIFront}/${row.shortUrl}`}>{row.shortUrl}</a>
              </StyledTableCell>
              <StyledTableCell align="right">
              <Button onClick={()=>handleDelete(row._id)}>del</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

