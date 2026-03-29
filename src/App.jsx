import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PropertyDetail from './pages/PropertyDetail'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
      <Footer />
    </>
  )
}
