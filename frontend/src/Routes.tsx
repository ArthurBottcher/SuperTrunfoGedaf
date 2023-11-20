import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Room } from './pages/Room'
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/r/:room/u/:user" element={<Room />} />
    </Routes>
  )
}
