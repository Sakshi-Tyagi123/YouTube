import { Routes , Route } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import Video from "./Pages/Video/Video"
import { useState } from "react"
import Search from "./Pages/Search/Search.jsx"


function App() {
  const [sidebar,setSidebar] = useState(true)

  return (
    <div>
      <Navbar setSidebar = {setSidebar}/>
      <Routes>
         <Route path='/' element={<Home sidebar = {sidebar}/>}/>
         <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
         <Route path='/Search/:query' element={<Search sidebar={sidebar} setSidebar={setSidebar}/>}/>
         <Route path="/Search/:query/video/:categoryId/:videoId" element={<Video/>} />
       
         
      </Routes>
    </div>
  )
}

export default App;
