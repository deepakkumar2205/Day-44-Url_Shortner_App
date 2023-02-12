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
  const APIFront = 'https://s-u.netlify.app'
  const APIFrontShow = 's-u.netlify.app'
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
              navigate("/")
          }
        })
      }

  return (
    <div>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S.No</StyledTableCell>
            <StyledTableCell width={200}>Title</StyledTableCell>
            <StyledTableCell width={200}  align="right">Base Url</StyledTableCell>
            <StyledTableCell  width={200}   align="right" >Short Url</StyledTableCell>
            <StyledTableCell align="right">Total Clicks</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row,index) => (
            <StyledTableRow key={`${index}`}>
              <StyledTableCell style={{minHeight:"38px"}} component="th" scope="row">{index+1}</StyledTableCell>
              <StyledTableCell style={{minHeight:"38px"}}>{row.title}</StyledTableCell>
              <StyledTableCell style={{inlineSize:'auto', overflow:'hidden',width:"600px",display:'inline-block',wordWrap:"break-word",minHeight:"38px"}} align="right">{row.baseUrl}</StyledTableCell>
              <StyledTableCell align="right" style={{minHeight:"38px"}}>
                <a href={`${APIFront}/${row.shortUrl}`}>{`${APIFrontShow}/${row.shortUrl}`}</a>
              </StyledTableCell>
              <StyledTableCell align="right" >{row.count}</StyledTableCell>
              <StyledTableCell align="right" style={{minHeight:"38px"}}>
              <Button onClick={()=>handleDelete(row._id)}>del</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
      <marquee direction="right" behavior='alternate'>Created by Deepakkumar 😅</marquee>
      </div>
  );
}

