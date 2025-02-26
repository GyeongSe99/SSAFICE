import { Navbar } from '@/widgets/navbar'
import { Outlet } from 'react-router-dom'

export const baseLayout = (
  <div className='w-full h-full pb-spacing-32'>
    <Navbar />
    <Outlet />
  </div>
)
