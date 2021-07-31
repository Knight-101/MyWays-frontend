import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import "./BlogCard.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 410,
  },
  delete: {
    color: "red",
  },
  readmore: {
    position: "relative",
    bottom: "20px",
  },
});

export default function BlogCard(props) {
  const BASE_URL = "https://rocky-ravine-81290.herokuapp.com";
  const classes = useStyles();
  const [deleted, setdeleted] = useState(false);

  const deletedClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setdeleted(false);
  };

  const deleteHandler = () => {
    axios
      .delete(`${BASE_URL}/blogs/deleteblog/${props.id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.ok) {
          console.log("deleted");
          setdeleted(true);
          props.blogsArray((prevArray) => {
            return prevArray.filter((item, index) => {
              return item._id !== props.id;
            });
          });
        }
      });
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea disabled>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="180"
            image={props.Image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" className="title">
              {props.Title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="content"
            >
              {props.Content}...
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.readmore}>
          <Link to={`./blogpage/${props.id}`}>
            <Button size="small" color="primary">
              Read More
            </Button>
          </Link>
          {props.permission && (
            <Button
              size="small"
              className={classes.delete}
              onClick={deleteHandler}
            >
              Delete Blog
            </Button>
          )}
        </CardActions>
      </Card>
      <Snackbar open={deleted} autoHideDuration={3000} onClose={deletedClose}>
        <Alert onClose={deletedClose} severity="success">
          Blog Deleted
        </Alert>
      </Snackbar>
    </div>
  );
}
