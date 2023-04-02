import './App.css'
import About from './Components/About/About'
import { BrowserRouter as Router , Routes,Route } from 'react-router-dom'
import Signup from './Components/Sign/Signup'
import Signin from './Components/Sign/Signin'
import Events from './Components/Events/Events'
import MyDonation from './Components/MyDonation/MyDonation'
import Navbar from './Components/Navbar/Navbar'
import Donation from './Components/Donation/Donation'
import Footer from './Components/Footer/Footer'
import RequireAuth from './Route/RequireAuth'
import Autrement from './Components/Payment/Autrement'
import Event from './Components/Events/Event'
import Stripe from './Components/Payment/Stripe'
import RequireAuthAdmin from './Route/RequireAuthAdmin'
import Addevent from './Components/Addevent/Addevent'
import SkeletonEventCard from './Components/Skeletons/SkeletonEventCard'

function App() {
  return (
    <div className="bg-bgcolor min-h-[100vh] overflow-hidden">
      <Router>
        <Navbar />
        <Routes >
            {/* public route */}
            <Route exact path='/' element={<About/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/test' element={<SkeletonEventCard/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/events' element={<Events/>} />
            <Route path='/events/:id' element={<Event/>} />
            <Route path='/mydonation' element={<MyDonation/>} />
            <Route path='/donation' element={<Donation/>} />
            {/* protected route */}
            <Route element={<RequireAuth/>} >
              <Route path='/autrement' element={<Autrement/>} />
              <Route path='/stripe' element={<Stripe/>} />
            </Route>
            <Route element={<RequireAuthAdmin/>} >
              <Route path='/addevent' element={<Addevent/>} />
            </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
