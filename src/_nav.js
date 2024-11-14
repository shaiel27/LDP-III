import React from 'react'
import  CIconSvg from '@coreui/icons-react'
import CIcon from '@coreui/icons-react'

import {
  cilDescription,
  cilNoteAdd,
  cilHome,
  cilStar,
  cilMedicalCross,
  cibFurryNetwork,
  cilClipboard,
  cilGroup,
  cilUserPlus,
  cilUser,
  cilCreditCard,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Explorar',
  },
 
  {
    
    component: CNavItem,
    name: 'Inicio',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
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
    name: 'Gestion',
  },
  {
    component: CNavItem,
    name: 'Inventario',
    to: '/pages/inventory',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />
        // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  
  {
    component: CNavGroup,
    name: 'Empleados',
    to: '/Workers',
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
        name: 'Horarios',
        to: '/pages/Schedule',
      },
      {
        component: CNavItem,
        name: 'Citas y consultas',
        to: '/pages/workerInfo',
      },
      {
        component: CNavItem,
        name: 'Pagos',
        to: '/pages/payments',
        icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
      },
    ]  
  },
  {
    component: CNavTitle,
    name: 'Usuarios',
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
      /*{
        component: CNavItem,
        name: 'Agregar Mascotas',
        to: '/base/accordion',
      },*/
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
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
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
