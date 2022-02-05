import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddUser from "./AddUser";
import { Link } from "react-router-dom";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Home({ users }) {
  return (
    <div className="t-container">
      <h1>Dashboard</h1>
      <div className="top-flex">
        <div>
          <h2>User List</h2>{" "}
        </div>
        <div>
          <Link to="/adduser">
            <Button variant="contained">Add New</Button>
          </Link>
        </div>
      </div>
      {/* <AddUser /> */}
      <TableContainer component={Paper} id="t-cont">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ height: "100px" }}>
              <TableCell id="t-cell">Id</TableCell>

              <TableCell id="t-cell">Name</TableCell>
              <TableCell id="t-cell" align="center">
                Username
              </TableCell>
              <TableCell id="t-cell" align="center">
                Email
              </TableCell>
              {/* <TableCell align="center">website</TableCell> */}
              <TableCell id="t-cell" align="center">
                City
              </TableCell>
              <TableCell id="t-cell" align="center">
                Edit
              </TableCell>
              <TableCell id="t-cell" align="center">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((users) => (
              <StyledTableRow
                key={users.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "90px",
                }}
              >
                <StyledTableCell component="th" scope="row" id="t-cell">
                  {users.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" id="t-cell">
                  {users.name}
                </StyledTableCell>
                <StyledTableCell align="center" id="t-cell">
                  {users.username}
                </StyledTableCell>
                <StyledTableCell align="center" id="t-cell">
                  {users.email}
                </StyledTableCell>
                {/* <StyledTableCell align="center">
                  {users.website}
                </StyledTableCell> */}
                <StyledTableCell align="center" id="t-cell">
                  {users.address.city}
                </StyledTableCell>
                <StyledTableCell align="center" id="t-cell">
                  <Button variant="contained" color="warning" id="t-btn">
                    Edit
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button variant="contained" color="error" id="t-btn">
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
