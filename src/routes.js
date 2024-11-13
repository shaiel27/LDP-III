import { element } from 'prop-types';
import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Workers = React.lazy(() => import('./views/trabajador/Workers'));
const RegisterPets = React.lazy(() => import('./views/pages/Addpet/Addpet'));
const WorkersSchedule = React.lazy(() => import('./views/pages/Schedule/Schedule'));
const RegistrationForm = React.lazy(() => import('./views/pages/AddWorker/FormWorker'));
const PetRecords = React.lazy(() => import('./views/pages/Pets/pet'));
const AppointmentRequest = React.lazy(() => import('./views/pages/date/dates'));
const InventoryManagement = React.lazy(() => import('./views/pages/inventory/products'));
const UserAppointments = React.lazy(() => import('./views/pages/mydates/Userappointments'));
const EmployeeDashboard  = React.lazy(() => import('./views/pages/workerInfo/Workerinfo'))
const PaymentAdminModule = React.lazy (() => import ('./views/pages/payments/Payments'))
const prueba = React.lazy(() => import ('./views/pages/prueba/prueba'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/workers', name: 'Workers', element: Workers },
  { path: '/pages/addpet', name: 'AddPet', element: RegisterPets },
  { path: '/pages/schedule', name: 'Schedule', element: WorkersSchedule },
  { path: '/pages/addworker', name: 'FormWorker', element: RegistrationForm },
  { path: '/pages/pets', name: 'Pet', element: PetRecords },
  { path: '/pages/date', name: 'AppointmentManagement', element: AppointmentRequest },
  { path: '/pages/inventory', name: 'InventoryManagement', element: InventoryManagement },
  { path: '/pages/mydates', name: 'UserAppointments', element: UserAppointments },
  { path: '/pages/workerInfo', name: 'EmployeeModuleDesign ', element: EmployeeDashboard },
  { path: '/pages/payments', name: 'PaymentAdminModule ', element: PaymentAdminModule },
  { path: '/pages/prueba', name: 'prueba', element: prueba},
];

export default routes