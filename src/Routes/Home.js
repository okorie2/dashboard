import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SortIcon from "@mui/icons-material/Sort";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Componets/Loader";
import { handleDeleteUser } from "../Redux/Actions/DeleteUser";
import _ from "underscore";
import AZ from "../../src/SVGs/text-sort-ascending-svgrepo-com.svg";
import ZA from "../../src/SVGs/text-sort-descending-svgrepo-com.svg";

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
  const dispatch = useDispatch();
  const { loading } = useSelector(({ users }) => users);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userList, SetUserList] = useState(users);
  const handleOpen = (id) => {
    setOpen(true);
    setUserId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (id) => {
    dispatch(handleDeleteUser(id));
    setOpen(false);
  };

  const getUsers = () => {
    SetUserList(users);
  };
  const sortUsers = () => {
    const iteratees = (obj) => obj.username;
    const sorted = _.sortBy(users, iteratees);
    SetUserList(sorted);
  };

  const sortUsersReverse = () => {
    const iteratees = (obj) => obj.username;
    const sorted = _.sortBy(users, iteratees);
    SetUserList(sorted.reverse());
  };

  useEffect(() => {
    getUsers();
  }, [users]);

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
      {loading ? (
        <div className="loader-parent">
          <Loader />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ height: "100px" }}>
                <TableCell id="">ID</TableCell>

                <TableCell id="t-cell">Name</TableCell>
                <TableCell id="t-cell" align="center">
                  <div className="username-head">
                    <span>Username</span>{" "}
                    <span>
                      <div
                        className="sort-button1"
                        onClick={() => sortUsersReverse()}
                      >
                        <img src={ZA} alt="za" />
                      </div>
                      <div className="sort-button2" onClick={() => sortUsers()}>
                        <img src={AZ} alt="az" />
                      </div>
                    </span>
                  </div>
                </TableCell>
                <TableCell id="t-cell" align="center">
                  Email
                </TableCell>
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
              {userList?.map((users, i) => (
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

                  <StyledTableCell align="center" id="t-cell">
                    {users.address?.city}
                  </StyledTableCell>
                  <StyledTableCell align="center" id="t-cell">
                    <Link to={`/edituser/${users.id}`}>
                      <Button variant="contained" color="warning" id="t-btn">
                        Edit
                      </Button>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      id="t-btn"
                      onClick={() => handleOpen(users.id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          {users.length === 0 && (
            <div className="null">
              <h3>No Users Present</h3>
            </div>
          )}
        </TableContainer>
      )}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modal-content">
            <h3>Delete</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="b-flex">
              <Button
                variant="contained"
                color="warning"
                id="t-btn"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                id="t-btn"
                onClick={() => handleDelete(userId)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
