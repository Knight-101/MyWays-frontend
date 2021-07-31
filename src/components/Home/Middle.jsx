import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import "./Middle.css";
import axios from "axios";
import { useSelector } from "react-redux";
import CreateBlogModal from "./CreateBlogModal";

const Middle = () => {
  const BASE_URL = "https://rocky-ravine-81290.herokuapp.com";
  const [blogsArray, setblogsArray] = useState([]);
  const user = useSelector((state) => state.userData);
  useEffect(() => {
    axios
      .get(BASE_URL + "/blogs/list")
      .then((res) => {
        setblogsArray(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="mid">
        <div className="blogs-head">
          <h1 id="blogs-heading">
            <b>MyWays Blogs</b>
          </h1>
          {user.permission && <CreateBlogModal blogsArray={setblogsArray} />}
        </div>
        {blogsArray ? (
          <div className="mid-content">
            {blogsArray
              .slice()
              .reverse()
              .map((blog, index) => (
                <BlogCard
                  key={index}
                  id={blog._id}
                  Title={blog.Title}
                  Content={blog.Content}
                  Image={blog.Image}
                  permission={user.permission}
                  blogsArray={setblogsArray}
                />
              ))}
          </div>
        ) : (
          <h3>No Blogs Found</h3>
        )}
      </div>
    </div>
  );
};

export default Middle;
