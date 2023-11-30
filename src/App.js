import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Posts from './pages/Posts';
import GetPosts from './pages/GetPosts';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/allposts" element={<GetPosts />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
