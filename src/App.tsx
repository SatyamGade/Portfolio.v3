import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Loader from './components/Loader'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { useSetRecoilState } from 'recoil'
import { isLoggedIn, token } from './assets/store/state'
import Education from './pages/Education'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
// import Certificates from './pages/Certificates'
import ProjectDetailPage from './pages/ProjectDetailPage'

// admin routes lazy import
const Signin = lazy(()=> import('./admin/Signin'));
const AddEducation = lazy(()=> import('./admin/AddEducation'));  
const AddSkill = lazy(()=> import('./admin/AddSkill'));  
const AddProject = lazy(()=> import('./admin/AddProject'));
// const AddCertificate = lazy(()=> import('./admin/AddCertificate'));

function App() {

  const setIsloggedin = useSetRecoilState(isLoggedIn);
  const setJwtToken = useSetRecoilState(token);

  useEffect(()=>{
    const jwt = localStorage.getItem("portfolioToken");
    if(jwt){
      setIsloggedin(true);
      setJwtToken(jwt);
    }
  },[])

  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/education' element={<Education />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/projects' element={<Projects />} />
          {/* <Route path='/certificates' element={<Certificates />} /> */}
          <Route path='/contact' element={<Contact />} />
          <Route path='/project/:id' element={<ProjectDetailPage />} />

          <Route path='/admin'>
            <Route path='signin' element={<Signin/>}/>
            <Route path='education/add' element={<AddEducation/>}/>
            <Route path='skill/add' element={<AddSkill/>}/>
            <Route path='project/add' element={<AddProject/>}/>
            {/* <Route path='certificate/add' element={<AddCertificate/>}/> */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
