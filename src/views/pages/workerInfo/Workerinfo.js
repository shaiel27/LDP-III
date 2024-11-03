import React from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CWidgetStatsF,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilCheckCircle, cilClock } from '@coreui/icons'

// Dummy data for demonstration
const employeeData = {
  name: '	Yiorgos Avraamu',
  role: 'Veterinaria',
  id: 'VET001',
  email: 'YiorgosAvraamu@clinicaveterinaria.com',
}

const pendingAppointments = [
  { id: 1, date: '2023-05-20', time: '10:00', petName: 'Luna', ownerName: 'Carlos Rodríguez', service: 'Consulta general' },
  { id: 2, date: '2023-05-20', time: '11:30', petName: 'Max', ownerName: 'Ana Martínez', service: 'Vacunación' },
  { id: 3, date: '2023-05-21', time: '09:00', petName: 'Bella', ownerName: 'Juan López', service: 'Peluquería' },
]

const completedAppointments = [
  { id: 4, date: '2023-05-19', time: '15:00', petName: 'Rocky', ownerName: 'Laura Sánchez', service: 'Consulta general' },
  { id: 5, date: '2023-05-19', time: '16:30', petName: 'Milo', ownerName: 'Pedro Gómez', service: 'Vacunación' },
]

export default function EmployeeDashboard() {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <h2 className="mb-4">Información del Empleado</h2>
            <p><strong>Nombre:</strong> {employeeData.name}</p>
            <p><strong>Cargo:</strong> {employeeData.role}</p>
            <p><strong>ID:</strong> {employeeData.id}</p>
            <p><strong>Email:</strong> {employeeData.email}</p>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} sm={6}>
        <CWidgetStatsF
          className="mb-3"
          icon={<CIcon icon={cilClock} height={24} />}
          title="Citas Pendientes"
          value={pendingAppointments.length}
          color="primary"
        />
      </CCol>

      <CCol xs={12} sm={6}>
        <CWidgetStatsF
          className="mb-3"
          icon={<CIcon icon={cilCheckCircle} height={24} />}
          title="Citas Completadas"
          value={completedAppointments.length}
          color="success"
        />
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <h3 className="mb-3">Citas Pendientes</h3>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Fecha</CTableHeaderCell>
                  <CTableHeaderCell>Hora</CTableHeaderCell>
                  <CTableHeaderCell>Mascota</CTableHeaderCell>
                  <CTableHeaderCell>Dueño</CTableHeaderCell>
                  <CTableHeaderCell>Servicio</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {pendingAppointments.map((appointment) => (
                  <CTableRow key={appointment.id}>
                    <CTableDataCell>{appointment.date}</CTableDataCell>
                    <CTableDataCell>{appointment.time}</CTableDataCell>
                    <CTableDataCell>{appointment.petName}</CTableDataCell>
                    <CTableDataCell>{appointment.ownerName}</CTableDataCell>
                    <CTableDataCell>{appointment.service}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard>
          <CCardBody>
            <h3 className="mb-3">Citas Completadas</h3>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Fecha</CTableHeaderCell>
                  <CTableHeaderCell>Hora</CTableHeaderCell>
                  <CTableHeaderCell>Mascota</CTableHeaderCell>
                  <CTableHeaderCell>Dueño</CTableHeaderCell>
                  <CTableHeaderCell>Servicio</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {completedAppointments.map((appointment) => (
                  <CTableRow key={appointment.id}>
                    <CTableDataCell>{appointment.date}</CTableDataCell>
                    <CTableDataCell>{appointment.time}</CTableDataCell>
                    <CTableDataCell>{appointment.petName}</CTableDataCell>
                    <CTableDataCell>{appointment.ownerName}</CTableDataCell>
                    <CTableDataCell>{appointment.service}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}