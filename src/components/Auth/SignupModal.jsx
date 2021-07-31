import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./Login.css";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
    width: 400,
  },
}));

export default function SignupModal(props) {
  const BASE_URL = "http://localhost:8000";
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleErrClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErr(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setUserData((prevData) => {
      return {
        ...prevData,
        [id]: value,
      };
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post(BASE_URL + "/auth/register", userData)
      .then((res) => {
        if (res.data === "Email already exists") {
          setOpenErr(true);
          setUserData({
            fullName: "",
            email: "",
            password: "",
          });
        }
        if (res.data.ok) {
          localStorage.setItem("token", res.data.token);
          console.log(res.data);
          //   dispatch(setData(userData.username, userData.email, userData.role));
          //   history.push("/emailV");
          setUserData({
            fullName: "",
            email: "",
            password: "",
          });
          setOpen(false);
          props.auth(true);
        } else {
          setUserData({
            fullName: "",
            email: "",
            password: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button id="signup" type="button" onClick={handleOpen}>
        <b>Sign Up</b>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <main className="form-signin">
              <form style={{ lineHeight: "5rem" }} onSubmit={submitHandler}>
                <h1 className="createAcc">Register</h1>

                <label htmlFor="firstName" className="visually-hidden">
                  Full name
                </label>
                <div class="input-group mb-3  signupInput">
                  <input
                    type="text"
                    required
                    class="form-control"
                    placeholder="Full Name"
                    id="fullName"
                    value={userData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <label htmlFor="inputEmail" className="visually-hidden">
                  Email address
                </label>
                <div class="input-group mb-3  signupInput">
                  <input
                    type="email"
                    required
                    class="form-control"
                    placeholder="Email"
                    id="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </div>

                <label htmlFor="inputPassword" className="visually-hidden">
                  Password
                </label>
                <div class="input-group mb-3  signupInput">
                  <input
                    type="password"
                    required
                    class="form-control"
                    placeholder="Password"
                    id="password"
                    value={userData.password}
                    onChange={handleChange}
                  />
                </div>

                <button className="w-50 btn btn-sm loginB" type="submit">
                  Sign Up
                </button>
              </form>
            </main>
          </div>
        </Fade>
      </Modal>
      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleErrClose}>
        <Alert onClose={handleErrClose} severity="error">
          Email already exists
        </Alert>
      </Snackbar>
    </div>
  );
}
