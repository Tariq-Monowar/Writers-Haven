import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import "./OwnPost.css";
import UpdatePost from "./UpdatePost/UpdatePost";

const OwnPost = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false); // State variable for update success
  const token = localStorage.getItem("token");

  const handleDelete = async (postId) => {
    try {
      // Make a DELETE request to delete the post with the given postId
      await axios.delete(`http://localhost:5000/post/${postId}`, {
        headers: {
          Authorization: token,
        },
      });

      // After successful deletion, update the post state to remove the deleted post
      setPost((prevPosts) =>
        prevPosts.filter((postData) => postData._id !== postId)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("An error occurred while deleting the post.");
    }
  };

  useEffect(() => {
    const showOwnPost = async () => {
      try {
        const response = await axios.get("http://localhost:5000/post/ownpost", {
          headers: {
            Authorization: token,
          },
        });
        setPost(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    showOwnPost();
  }, [token, updateSuccess]); // Update the posts when updateSuccess state changes

  return (
    <section className="post-section ownPost-card">
      <div className="containers">
        {post.map((post) => (
          <div
            key={post._id}
            style={{
              backgroundImage: `url(data:image/png;base64,${Buffer.from(
                post.image.data
              ).toString("base64")})`,
            }}
            className="postDetalse"
          >
            {post.postBy && (
              <div className="post-by">
                <img
                  className="post-by-image"
                  src={`data:image/png;base64,${Buffer.from(
                    post.postBy.image.data
                  ).toString("base64")}`}
                  alt=""
                />
                <p className="post-by-title">{post.postBy.userName}</p>
                <UpdatePost onPostData={post} setUpdateSuccess={setUpdateSuccess} />
              </div>
            )}
            <p className="post-title">{post.bookName}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OwnPost;
