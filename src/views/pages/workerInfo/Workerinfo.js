'use client'

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
  CAlert,
  CBadge,
  CListGroup,
  CListGroupItem,
  CAvatar,
  CButton,
  CForm,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
  cilPeople, 
  cilCalendar, 
  cilMedicalCross, 
  cilClock, 
  cilNotes,
  cilEnvelopeClosed,
  cilPhone,
  cilLocationPin,
  cilBriefcase,
  cilUser,
  cilPencil,
} from '@coreui/icons'

export default function WorkerInfo() {
  const [worker, setWorker] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [pets, setPets] = useState([])
  const [error, setError] = useState('')
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [editedSchedule, setEditedSchedule] = useState({})
  const [updateMessage, setUpdateMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const userType = localStorage.getItem('userType')
        
        if (!token || userType !== 'worker') {
          setError('Unauthorized access')
          return
        }

        const workerId = token.split('-')[2]
        
        const [workerResponse, appointmentsResponse, petsResponse] = await Promise.all([
          fetch(`http://localhost:3004/workers/${workerId}`),
          fetch(`http://localhost:3004/appointments?workerId=${workerId}`),
          fetch('http://localhost:3004/pets')
        ])

        const [workerData, appointmentsData, petsData] = await Promise.all([
          workerResponse.json(),
          appointmentsResponse.json(),
          petsResponse.json()
        ])

        setWorker(workerData)
        setEditedSchedule(workerData.schedule)
        setAppointments(appointmentsData)
        setPets(petsData)
      } catch (error) {
        setError('An error occurred while fetching data')
      }
    }

    fetchData()
  }, [])

  const getPetName = (petId) => {
    const pet = pets.find(p => p.id === petId)
    return pet ? pet.name : 'Unknown'
  }
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmada':
        return <CBadge color="success">Confirmada</CBadge>
      case 'pendiente':
        return <CBadge color="warning">Pendiente</CBadge>
      case 'en proceso':
        return <CBadge color="info">En proceso</CBadge>
      default:
        return <CBadge color="secondary">{status}</CBadge>
    }
  }

  const handleScheduleChange = (day, value) => {
    setEditedSchedule(prev => ({ ...prev, [day]: value }))
  }

  const handleScheduleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3004/workers/${worker.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schedule: editedSchedule }),
      })

      if (response.ok) {
        setWorker(prev => ({ ...prev, schedule: editedSchedule }))
        setShowScheduleModal(false)
        setUpdateMessage('Schedule updated successfully')
        setTimeout(() => setUpdateMessage(''), 3000)
      } else {
        throw new Error('Failed to update schedule')
      }
    } catch (error) {
      setError('An error occurred while updating the schedule')
    }
  }

  if (error) {
    return (
      <CAlert color="danger">
        {error}
      </CAlert>
    )
  }

  if (!worker) {
    return (
      <CAlert color="info">
        Loading worker information...
      </CAlert>
    )
  }

  return (
    <CRow>
      <CCol xs={12}>
        {updateMessage && (
          <CAlert color="success">
            {updateMessage}
          </CAlert>
        )}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Worker Information</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={4}>
                <CAvatar src={worker.avatar.src} size="xl" />
              </CCol>
              <CCol md={8}>
                <h2>{worker.user.name}</h2>
                <CListGroup flush>
                  <CListGroupItem>
                    <CIcon icon={cilEnvelopeClosed} className="me-2" />
                    Email: {worker.user.email}
                  </CListGroupItem>
                  <CListGroupItem>
                    <CIcon icon={cilPhone} className="me-2" />
                    Phone: {worker.user.phone}
                  </CListGroupItem>
                  <CListGroupItem>
                    <CIcon icon={cilLocationPin} className="me-2" />
                    Address: {worker.user.address}
                  </CListGroupItem>
                  <CListGroupItem>
                    <CIcon icon={cilBriefcase} className="me-2" />
                    Specialty: {worker.specialty}
                  </CListGroupItem>
                  <CListGroupItem>
                    <CIcon icon={cilUser} className="me-2" />
                    License Number: {worker.licenseNumber}
                  </CListGroupItem>
                </CListGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Work Schedule</strong>
            <CButton 
              color="primary" 
              size="sm" 
              className="float-end"
              onClick={() => setShowScheduleModal(true)}
            >
              <CIcon icon={cilPencil} /> Edit Schedule
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive className="table-striped table-bordered">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Day</CTableHeaderCell>
                  <CTableHeaderCell>Hours</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Object.entries(worker.schedule).map(([day, hours]) => (
                  <CTableRow key={day}>
                    <CTableDataCell>{day.charAt(0).toUpperCase() + day.slice(1)}</CTableDataCell>
                    <CTableDataCell>{hours || 'Closed'}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>My Appointments</strong>
          </CCardHeader>
          <CCardBody>
            {appointments.length === 0 ? (
              <CAlert color="info">
                You have no upcoming appointments.
              </CAlert>
            ) : (
              <CTable hover responsive className="table-striped table-bordered">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilCalendar} /> Date
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilClock} /> Time
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} /> Pet
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilMedicalCross} /> Type
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilNotes} /> Description
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {appointments.map((appointment) => (
                    <CTableRow key={appointment.id}>
                      <CTableDataCell className="text-center">{appointment.date}</CTableDataCell>
                      <CTableDataCell className="text-center">{appointment.time}</CTableDataCell>
                      <CTableDataCell>{getPetName(appointment.petId)}</CTableDataCell>
                      <CTableDataCell>{appointment.type}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {getStatusBadge(appointment.status)}
                      </CTableDataCell>
                      <CTableDataCell>{appointment.description}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showScheduleModal} onClose={() => setShowScheduleModal(false)}>
        <CModalHeader>
          <CModalTitle>Edit Schedule</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleScheduleSubmit}>
            {Object.entries(editedSchedule).map(([day, hours]) => (
              <div key={day} className="mb-3">
                <CFormInput
                  type="text"
                  id={day}
                  label={day.charAt(0).toUpperCase() + day.slice(1)}
                  value={hours}
                  onChange={(e) => handleScheduleChange(day, e.target.value)}
                  placeholder="e.g. 9:00 AM - 5:00 PM or Closed"
                />
              </div>
            ))}
            <CButton type="submit" color="primary">Save Changes</CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </CRow>
  )
}