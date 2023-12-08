import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from './components/Base';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Services from './components/pages/Services';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './components/pages/user_routes/UserDashboard';
import ProfileInfo from './components/pages/user_routes/ProfileInfo';
import PrivateRoutes from './components/PrivateRoutes';
import PostPage from './components/pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './components/Categories';
import UpdateBlog from './components/pages/UpdateBlog';
import UpdateProfile from './components/pages/user_routes/UpdateProfile';


function App() {
  return (
    <UserProvider>
   <BrowserRouter>
   <ToastContainer position='bottom-center'/>
      <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/services" element={<Services/>}/>

        <Route path="/private" element={<PrivateRoutes/>}>
          
          <Route path="userdashboard" element={<UserDashboard/>}/>
          <Route path="profileinfo" element={<ProfileInfo/>}/>
          <Route path="updateblog/:blogId" element={<UpdateBlog/>}/>
          <Route path="updateprofile/:userId" element={<UpdateProfile/>}/>

        </Route>

        <Route path="/post/:postId" element={<PostPage/>}/>
        <Route path="/categories/:categoryId" element={<Categories/>}/>

      </Routes>
   
   
   </BrowserRouter>
   </UserProvider>
  
  );
}

export default App;
