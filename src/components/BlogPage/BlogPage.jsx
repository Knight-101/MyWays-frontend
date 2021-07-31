import React, { useEffect, useState } from "react";
import Footer from "../Home/Footer";
import axios from "axios";
import Head from "../Home/Head";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./BlogPage.css";
import { useHistory } from "react-router";

export default function BlogPage(props) {
  const history = useHistory();
  const BASE_URL = "http://localhost:8000";
  const [blog, setblog] = useState({
    Title: "",
    Image: "",
    Content: "",
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/blogs/${props.match.params.id}`)
      .then((res) => {
        setblog({
          Title: res.data.blog.Title,
          Image: res.data.blog.Image,
          Content: res.data.blog.Content,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id]);
  return (
    <div>
      <Head />

      <div className="mid">
        <div className="blogs-head">
          <h1 id="blogs-heading">
            <b>MyWays Blogs</b>
          </h1>
          <h5
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBackIcon />
            back
          </h5>
        </div>
        <div className="blogpage-content">
          <h1 style={{ textAlign: "left", fontWeight: "bold" }}>
            {blog.Title}
          </h1>
          <img src={blog.Image} alt="blog-pic" id="blog-pic" />
          <div className="blog-content">
            <p>{blog.Content}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
