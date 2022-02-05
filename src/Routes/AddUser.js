import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { handleAddUSer } from "../Redux/Actions/User";
import { getIn, useFormik } from "formik";
import * as Yup from "yup";

export default function AddUser() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
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
        city: Yup.string()
          .min(5, "Must be 5 characters or more")
          .required("Required"),
      }),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(handleAddUSer(values));
      console.log("submited");
    },
  });

  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    city: "",
    email: "",
    address: {
      city: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  const handleCity = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      address: {
        ...userDetails.address,
        [name]: value,
      },
    });
    console.log(userDetails.address.city, "city");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(handleAddUSer());
    // console.log(body, "bodyy");
  };

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
              //   onChange={handleChange}
              {...formik.getFieldProps("name")}
            />
            {/* {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null} */}
          </div>

          <div className="item">
            <label>Username</label>
            <TextField
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              error={Boolean(formik.touched.username && formik.errors.username)}
              id="fullWidth"
              name="username"
              //   onChange={handleChange}
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
              //   onChange={handleChange}
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
            <Button variant="outlined" color="error">
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
