import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import "./ShowAllpost.css";
import { Link } from "react-router-dom";

const ShowAllpost = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/post");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="post-section">
      <div className="containers">
        {posts.map((post) => (
          <Link to={`/postdetails/${post._id}`} state={{post}}  key={post._id}>
            <div
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
                </div>
              )}
              <p className="post-title">{post.bookName}</p>

              {/* <div dangerouslySetInnerHTML={{ __html: post.descriptions }} /> */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShowAllpost;
