import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import "./post.css";
import Loding from './../loding/Loding';

const Post = (props) => {
  const [bookName, setBookName] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [errorMessage, seterrorMessage] = useState(false)

  const editor = useRef(null);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("bookName", bookName);
      formData.append("writer", writer);
      formData.append("descriptions", content);
      formData.append("image", image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/post",
        formData,
        config
      );

      if (response.status === 200) {
        // Post created successfully, do something with the response data if needed
        console.log(response.data);
        seterrorMessage(false)
        setLoading(false)
        props.onClosePermission(true)
      }
    } catch (error) {
      setLoading(false)
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <div className="userPost">
        {/* <h2 className="postHeader">Create Post</h2> */}
        <form className="post-form" onSubmit={handleSubmit}>
          <div className="post-input-dev">
            <input
              className="post-input"
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Book Name"
              required
            />
          </div>

          <div className="post-input-dev">
            <input
              className="post-input"
              type="text"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              placeholder="book Writer"
              required
            />
          </div>
          <div className="post-input-dev">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="post-input-dev">
            <JoditEditor
              className="JoditEditor"
              ref={editor}
              value={content}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <div className="loading">
            {
              loading && <Loding />
            }
            
          </div>
          <button className="post-submit-btn" type="submit">
            Create Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
