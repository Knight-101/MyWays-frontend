import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setData } from "../../Redux/userData/userDataActions";

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

export default function LoginModal(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const BASE_URL = "http://localhost:8000";
  const [fail, setfail] = useState("");
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setuserData((prevData) => {
      return {
        ...prevData,
        [id]: value,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    await axios
      .post(BASE_URL + "/auth/login", userData)
      .then((res) => {
        if (res.data === '"email" must be a valid email') {
          setfail("Enter a valid email(abc@def.xy)");
        } else {
          if (res.data === "Email doesn't match our records") {
            setfail("Email or Password does not match our records");
          } else {
            if (res.data === "invalid password") {
              setfail("Email or Password does not match our records");
            } else {
              localStorage.setItem("token", res.data.token);
              dispatch(
                setData(
                  res.data.user.fullName,
                  res.data.user.email,
                  res.data.user.permission
                )
              );
              setOpen(false);
              props.auth(true);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button id="login" type="button" onClick={handleOpen}>
        <b>Log In</b>
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
                <h1 className="createAcc">Login</h1>
                <p style={{ color: "red", marginBottom: "0" }}>{fail}</p>
                <label htmlFor="inputEmail" className="visually-hidden">
                  Email address
                </label>
                <div class="input-group mb-3  loginInput">
                  {/* <span class="input-group-text" id="basic-addon1">
                  <img src={imgmail} className="userImg" alt="logo"></img>
                </span> */}
                  <input
                    required
                    value={userData.email}
                    id="email"
                    onChange={handleChange}
                    type="email"
                    class="form-control"
                    placeholder="Email"
                  />
                </div>

                <label htmlFor="inputPassword" className="visually-hidden">
                  Password
                </label>
                <div class="input-group mb-3  loginInput">
                  {/* <span class="input-group-text" id="basic-addon1">
                  <img src={imglock} className="userImg" alt="logo"></img>
                </span> */}
                  <input
                    required
                    value={userData.password}
                    onChange={handleChange}
                    id="password"
                    type="password"
                    class="form-control"
                    placeholder="Password"
                  />
                </div>

                <button className="w-50 btn btn-sm loginB" type="submit">
                  Login
                </button>
              </form>
            </main>
            {/* <p style={{ marginTop: "2rem" }}>
              Don't have an account yet? <span id="newRegister" onClick={openRegister}>Register</span>
            </p> */}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
