import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
      <Route path='/tag/:hashtag' element={<Home />} />
      <Route path='/page/:pageNumber' element={<Home />} />
      <Route path='/search/:searchQuery' element={<Home />} />
    </>
  )
);

function App() {
  return (
    <ThemeProvider>
      <PostProvider>
        <RouterProvider router={router}></RouterProvider>
      </PostProvider>
    </ThemeProvider>
  );
}

export default App;
