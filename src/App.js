import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./Routes/Home";
import AddUser from "./Routes/AddUser";
import { handleGetUsers } from "./Redux/Actions/GetUsers";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetUsers());
  }, [dispatch, handleGetUsers]);

  const { users, loading } = useSelector(({ users }) => users);
  console.log(users, "userssss");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home users={users} />} />
          <Route path="/adduser" element={<AddUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
