import React from 'react'
import CIcon from '@coreui/icons-react'

import {
  cilDescription,
  cilHome,
  cilMedicalCross,
  cibFurryNetwork,
  cilClipboard,
  cilGroup,
  cilUserPlus,
  cilUser,
  cilCreditCard,
  cilBriefcase,
  cilCalendar,
  cilContact,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'General',
  },
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Login',
    to: '/login',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Register',
    to: '/register',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Administrador',
  },
  {
    component: CNavGroup,
    name: 'Gestión',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Inventario',
        to: '/pages/inventory',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />
      },
      {
        component: CNavItem,
        name: 'Usuarios',
        to: '/pages/users',
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />
      },
      {
        component: CNavGroup,
        name: 'Empleados',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Mis empleados',
            to: '/Workers',
          },
          {
            component: CNavItem,
            name: 'Añadir Empleados',
            to: '/pages/AddWorker'
          },
          {
            component: CNavItem,
            name: 'Pagos',
            to: '/pages/payments',
            icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
          },
        ]
      },
    ]
  },
  {
    component: CNavTitle,
    name: 'Empleado',
  },
  {
    component: CNavGroup,
    name: 'Gestión de Trabajo',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Mis Citas',
        to: '/pages/workerInfo',
      },
    ]
  },
  {
    component: CNavTitle,
    name: 'Usuario',
  },
  {
    component: CNavGroup,
    name: 'Mascotas',
    to: '/base',
    icon: <CIcon icon={cibFurryNetwork} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Agregar Mascotas',
        to: 'pages/Addpet',
      },
      {
        component: CNavItem,
        name: 'Mis Mascotas',
        to: 'pages/Pets',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Citas',
    to: '/buttons',
    icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Agregar Cita',
        to: '/pages/date',
      },
      {
        component: CNavItem,
        name: 'Ver mis Citas',
        to: 'pages/mydates',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav