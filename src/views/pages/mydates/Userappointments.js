import React, { useState, useEffect } from 'react'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPaw, cilCalendar, cilClock, cilUser, cilNotes } from '@coreui/icons'

const MyDates = () => {
  const [appointments, setAppointments] = useState([])
  const [workers, setWorkers] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3004/appointments').then(res => res.json()),
      fetch('http://localhost:3004/workers').then(res => res.json())
    ]).then(([appointmentsData, workersData]) => {
      setAppointments(appointmentsData)
      setWorkers(workersData)
    }).catch(error => console.error('Error fetching data:', error))
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pendiente':
        return <CBadge color="warning">Pendiente</CBadge>
      case 'Confirmada':
        return <CBadge color="success">Confirmada</CBadge>
      case 'En Proceso':
        return <CBadge color="info">En Proceso</CBadge>
      default:
        return <CBadge color="secondary">{status}</CBadge>
    }
  }

  const handleShowDetails = (appointment) => {
    const worker = workers.find(w => w.id === appointment.workerId)
    setSelectedAppointment({ ...appointment, doctor: worker ? worker.user.name : 'Unknown' })
    setShowModal(true)
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
                      <CButton 
                        color="primary" 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShowDetails(appointment)}
                      >
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

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Detalles de la Cita</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedAppointment && (
            <div>
              <p><CIcon icon={cilPaw} /> Mascota: {selectedAppointment.pet}</p>
              <p><CIcon icon={cilCalendar} /> Fecha: {selectedAppointment.date}</p>
              <p><CIcon icon={cilClock} /> Hora: {selectedAppointment.time}</p>
              <p><CIcon icon={cilUser} /> Doctor: {selectedAppointment.doctor}</p>
              <p><CIcon icon={cilNotes} /> Descripción: {selectedAppointment.description}</p>
              <p>Tipo: {selectedAppointment.type}</p>
              <p>Estado: {getStatusBadge(selectedAppointment.status)}</p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default MyDates