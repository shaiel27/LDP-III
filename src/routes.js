import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Workers = React.lazy(() => import('./views/trabajador/Workers'))
const RegisterPets = React.lazy(() => import('./views/pages/Addpet/Addpet'))
const WorkersSchedule = React.lazy(() => import('./views/pages/Schedule/Schedule'))
const RegistrationForm = React.lazy(() => import('./views/pages/AddWorker/FormWorker'))
const PetRecords = React.lazy(() => import('./views/pages/Pets/pet.js'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Workers', name: 'Workers', element: Workers },
  { path: '/pages/Addpet', name: 'AddPet', element: RegisterPets },
  { path: '/pages/Schedule', name: 'Schedule', element: WorkersSchedule },
  { path: '/pages/AddWorker', name: 'Formworker', element: RegistrationForm },
  { path: '/pages/Pets', name: 'pet', element: PetRecords },
]

export default routes