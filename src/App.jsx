import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Error from "./Components/Error";
import Profile from "./Components/profile/Profile";
import Post from "./Components/Post/Post";
import PostDetails from './Components/Post/postDetails/PostDetails';
const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/postdetails/:postId" element={<PostDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;



