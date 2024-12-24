import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const VetWorkersDashboard = React.lazy(() => import('./views/trabajador/Workers'))
const RegisterPets = React.lazy(() => import('./views/pages/Addpet/Addpet'))
const WorkersSchedule = React.lazy(() => import('./views/pages/Schedule/Schedule'))
const RegistrationForm = React.lazy(() => import('./views/pages/AddWorker/FormWorker'))
const PetRecords = React.lazy(() => import('./views/pages/Pets/pet'))
const AppointmentRequest = React.lazy(() => import('./views/pages/date/dates'))
const InventoryManagement = React.lazy(() => import('./views/pages/inventory/products'))
const UserAppointments = React.lazy(() => import('./views/pages/mydates/Userappointments'))
const EmployeeDashboard = React.lazy(() => import('./views/pages/workerInfo/Workerinfo'))
const PaymentAdminModule = React.lazy(() => import('./views/pages/payments/Payments'))
const Profile = React.lazy(() => import('./views/pages/profile/Profile'))
const UserManagement = React.lazy(() => import('./views/pages/users/Users'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/workers', name: 'Workers', element: VetWorkersDashboard },
  { path: '/pages/addpet', name: 'Add Pet', element: RegisterPets },
  { path: '/pages/schedule', name: 'Schedule', element: WorkersSchedule },
  { path: '/pages/addworker', name: 'Add Worker', element: RegistrationForm },
  { path: '/pages/pets', name: 'Pet Records', element: PetRecords },
  { path: '/pages/date', name: 'Appointment Management', element: AppointmentRequest },
  { path: '/pages/inventory', name: 'Inventory Management', element: InventoryManagement },
  { path: '/pages/mydates', name: 'User Appointments', element: UserAppointments },
  { path: '/pages/workerInfo', name: 'Employee Dashboard', element: EmployeeDashboard },
  { path: '/pages/payments', name: 'Payment Admin Module', element: PaymentAdminModule },
  { path: '/pages/profile', name: 'Profile', element: Profile },
  { path: '/pages/users', name: 'User Management', element: UserManagement },
]

export default routes
