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
  CSpinner,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPaw, cilCalendar, cilClock, cilUser, cilNotes } from '@coreui/icons'

const MyDates = () => {
  const [appointments, setAppointments] = useState([])
  const [workers, setWorkers] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Simulating getting the current user ID from a token or context
        const currentUserId = localStorage.getItem('currentUserId') || '1'

        const [appointmentsResponse, workersResponse] = await Promise.all([
          fetch('http://localhost:3004/appointments'),
          fetch('http://localhost:3004/workers')
        ])

        if (!appointmentsResponse.ok || !workersResponse.ok) {
          throw new Error('Error al obtener los datos')
        }

        const [appointmentsData, workersData] = await Promise.all([
          appointmentsResponse.json(),
          workersResponse.json()
        ])

        // Filter appointments for the current user
        const userAppointments = appointmentsData.filter(appointment => appointment.ownerId === currentUserId)

        setAppointments(userAppointments)
        setWorkers(workersData)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Hubo un problema al cargar los datos. Por favor, intente de nuevo.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
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
    setSelectedAppointment({ ...appointment, doctor: worker ? worker.user.name : 'No asignado' })
    setShowModal(true)
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <CSpinner color="primary" />
      </div>
    )
  }

  if (error) {
    return <CAlert color="danger">{error}</CAlert>
  }

  return (
    <CRow>
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <h2 className="text-center">Mis Citas</h2>
          </CCardHeader>
          <CCardBody>
            {appointments.length === 0 ? (
              <CAlert color="info">No tienes citas programadas en este momento.</CAlert>
            ) : (
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
            )}
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