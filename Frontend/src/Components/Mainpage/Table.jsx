import { Button, CircularProgress, LinearProgress, Tooltip, Zoom } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TableAction } from '../../Redux/Reducers/urls.reducer';
import { getUrlsFromDb, handleDeleteUrl, toastFuncDanger } from './axios';

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
  console.log(tableData);
  return (
    <div>
      {tableData === [] ? <CircularProgress/> :<div>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
              <Tooltip
                  title="Serial Number of the Urls"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <p id="totalclicks" style={{ margin: "0" }}>
                    S.No
                  </p>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell width={200} >
              <Tooltip
                  title="Title is to identify the what url is this"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <p id="totalclicks" style={{ margin: "0" }}>
                    Title
                  </p>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell width={200}  style={{textAlign:"center"}}>
              <Tooltip
                  title="This is the original Url what you want to open when access the related short url"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <p id="totalclicks" style={{ margin: "0" }}>
                    Base Url
                  </p>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell width={200} style={{textAlign:"center"}}>
              <Tooltip
                  title="Now you can copy and share this shot url to anyone"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <p id="totalclicks" style={{ margin: "0" }}>
                    Short Url
                  </p>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell style={{textAlign:"center"}}>
                <Tooltip
                  title="This Total Clicks represent How many short url is used"
                  arrow
                  TransitionComponent={Zoom}
                >
                  <p id="totalclicks" style={{ margin: "0" }}>
                    Total Clicks
                  </p>
                </Tooltip>
              </StyledTableCell>
              <StyledTableCell  style={{textAlign:"center"}}>
              <Tooltip
                  title={`If you delete short url the link will expire and it show page not found when you try use that url.`}
                  TransitionComponent={Zoom}
                  arrow
                >
                <p id='del' style={{margin:"0"}}>Action</p>
                </Tooltip>
                </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((row, index) => (
              <StyledTableRow key={`${index}`}>
                <StyledTableCell
                  style={{ minHeight: "38px" }}
                  component="th"
                  scope="row"
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell style={{ minHeight: "38px" }}>
                  {row.title}
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    inlineSize: "auto",
                    overflow: "hidden",
                    width: "600px",
                    display: "inline-block",
                    wordWrap: "break-word",
                    minHeight: "38px",
                    textAlign:'left'
                  }}
               
                >
                  {row.baseUrl}
                </StyledTableCell>
                <StyledTableCell style={{ minHeight: "38px",textAlign:'left' }}>
                  <a
                    href={`${APIFront}/${row.shortUrl}`}
                  >{`${APIFrontShow}/${row.shortUrl}`}</a>
                </StyledTableCell>
                <StyledTableCell  style={{textAlign:'center'}}>{row.count}</StyledTableCell>
                <StyledTableCell  style={{ minHeight: "38px" ,textAlign:'center'}}>
                  <Button onClick={() => handleDelete(row._id)}>del</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />  
     
      <marquee direction="right" behavior="alternate">
        Created by Deepakkumar 😅
      </marquee>
      </div>}
    </div>
  );
}

