
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AddPost from './pages/AddPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import EditPost from './pages/EditPost'
import Post from './pages/Post.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'

const router = createBrowserRouter(
 [
  {
    path:'/',
    element:<App/>,

    children:[{
      path:'/',
      element:<Home/>
    },
    {
      path:'/login',
      element:(<AuthLayout authentication={false}>
        <Login/>
      </AuthLayout>)
    },
    {
      path:'/signup',
      element:(<AuthLayout authentication={false}>
        <Signup/>
      </AuthLayout>)
    },
    {
      path:'/add-post',
      element:(<AuthLayout authentication={true}>
        <AddPost/>
      </AuthLayout>)
    },
    {
      path:'/edit-post/:slug',
      element:(<AuthLayout authentication={true}>
        <EditPost/>
      </AuthLayout>)
    },
    {
      path:"/all-posts",
      element:(<AuthLayout authentication={true}>
        <AllPosts/>
      </AuthLayout>)
    },
    {
      path:'/post/:slug',
      element:(<AuthLayout authentication={true}>
        <Post/>
      </AuthLayout>)
    }
  
  ]
  }
 ]   
)


ReactDOM.createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>

)
