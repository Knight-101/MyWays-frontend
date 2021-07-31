import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
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
    width: 700,
    height: 700,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "grid",
    gridTemplateRows: "10px 40px 40px 420px",
    rowGap: "1.5rem",
  },
  create: {
    backgroundColor: "#3c5a5f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 0",
  },
  input: {
    borderRadius: "5px",
  },
  close: {
    justifySelf: "end",
    cursor: "pointer",
  },
}));

export default function CreateBlogModal(props) {
  const BASE_URL = "https://rocky-ravine-81290.herokuapp.com";
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [created, setcreated] = useState(false);

  const [newBlog, setnewBlog] = useState({
    Title: "",
    Image: "",
    Content: "",
  });

  const createdClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setcreated(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setnewBlog((prevData) => {
      return {
        ...prevData,
        [id]: value,
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const createBlog = (event) => {
    event.preventDefault();
    axios
      .post(BASE_URL + "/blogs/createblog", {
        headers: { Authorization: localStorage.getItem("token") },
        newBlog,
      })
      .then(async (res) => {
        if (res.data.ok) {
          setnewBlog({ Title: "", Image: "", Content: "" });
          setOpen(false);
          setcreated(true);
          props.blogsArray((prev) => {
            return [...prev, newBlog];
          });
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button className="grid-item blogCRUD" onClick={handleOpen}>
        Create Blog
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
            <CloseIcon className={classes.close} onClick={handleClose} />
            <label htmlFor="Title" className="visually-hidden">
              Title
            </label>
            <input
              id="Title"
              className={classes.input}
              placeholder="Title"
              value={newBlog.Title}
              onChange={handleChange}
            />
            <label htmlFor="Image" className="visually-hidden">
              Image Link
            </label>
            <input
              id="Image"
              className={classes.input}
              placeholder="Image Link"
              value={newBlog.Image}
              onChange={handleChange}
            />
            <label htmlFor="Content" className="visually-hidden">
              Content
            </label>
            <textarea
              style={{ resize: "none" }}
              id="Content"
              placeholder="Content"
              className={classes.input}
              value={newBlog.Content}
              onChange={handleChange}
            />
            <button className={classes.create} onClick={createBlog}>
              Create
            </button>
          </div>
        </Fade>
      </Modal>
      <Snackbar open={created} autoHideDuration={3000} onClose={createdClose}>
        <Alert onClose={createdClose} severity="success">
          Blog Created
        </Alert>
      </Snackbar>
    </div>
  );
}
