import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPaw, cilCalendar, cilClock, cilMedicalCross, } from '@coreui/icons'

// Sample data for ongoing appointments
const sampleAppointments = [
  { id: 1, pet: 'Max',date:'2023-12-12', time: '10:00', status: 'Pendiente', type: 'Consulta' },
  { id: 2, pet: 'Luna', date: '2023-06-16', time: '14:30', status: 'Confirmada', type: 'Vacunación' },
  { id: 3, pet: 'Rocky', date: '2023-06-17', time: '11:00', status: 'En Proceso', type: 'Cirugía' },
]

const mydates = () => {
  const [appointments, setAppointments] = useState(sampleAppointments)

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pendientes':
        return <CBadge color="warning">Pendiente</CBadge>
      case 'Confirmadas':
        return <CBadge color="success">Confirmada</CBadge>
      case 'En Proceso':
        return <CBadge color="info">En Proceso</CBadge>
      default:
        return <CBadge color="secondary">{status}</CBadge>
    }
  }

  return (
    <CRow>
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <h2 className="text-center">Mis Citas en Proceso</h2>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPaw} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Mascota</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilCalendar} />
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilClock} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Tipo</CTableHeaderCell>
                  <CTableHeaderCell>Estado</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {appointments.map((appointment, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <CIcon icon={cilPaw} size="xl" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{appointment.pet}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{appointment.date}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{appointment.time}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{appointment.type}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{getStatusBadge(appointment.status)}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="primary" variant="outline" size="sm">
                        Ver Detalles
                      </CButton>
                    </CTableDataCell>
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

export default mydates