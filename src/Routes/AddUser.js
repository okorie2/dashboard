import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getIn, useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { handleAddUSer } from "../Redux/Actions/AddUser";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, users } = useSelector(({ users }) => users);

  const formik = useFormik({
    initialValues: {
      id: users[users.length - 1]?.id + 1,
      name: "",
      username: "",
      email: "",
      address: {
        city: "",
      },
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
      username: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),

      address: Yup.object().shape({
        city: Yup.string().required("Required"),
      }),
    }),
    onSubmit: (values) => {
      dispatch(handleAddUSer(values));
      if (!loading) {
        navigate("/");
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-flex">
          <div className="item">
            <label>Name</label>
            <TextField
              helperText={formik.touched.name && formik.errors.name}
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              id="fullWidth"
              name="name"
              {...formik.getFieldProps("name")}
            />
          </div>

          <div className="item">
            <label>Username</label>
            <TextField
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              error={Boolean(formik.touched.username && formik.errors.username)}
              id="fullWidth"
              name="username"
              {...formik.getFieldProps("username")}
            />
          </div>

          <div className="item">
            <label>Email</label>
            <TextField
              fullWidth
              id="fullWidth"
              name="email"
              helperText={formik.touched.email && formik.errors.email}
              error={Boolean(formik.touched.email && formik.errors.email)}
              {...formik.getFieldProps("email")}
            />
          </div>

          <div className="item">
            <label>City</label>
            <TextField
              fullWidth
              id="fullWidth"
              name="city"
              helperText={
                getIn(formik.touched, "address.city") &&
                getIn(formik.errors, "address.city")
              }
              error={Boolean(
                getIn(formik.touched, "address.city") &&
                  getIn(formik.errors, "address.city")
              )}
              {...formik.getFieldProps("address.city")}
            />
          </div>
          <div className="item btns">
            <Link to="/">
              <Button variant="outlined" color="error">
                Cancel
              </Button>
            </Link>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
