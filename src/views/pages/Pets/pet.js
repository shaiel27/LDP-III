import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
  CButton,
  CCollapse,
  CBadge,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

export default function PetRecords() {
  const [petData, setPetData] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)
  const [workers, setWorkers] = useState([])
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const userId = token.split('-')[2] // Assuming token format is 'dummy-token-userId'
      setCurrentUserId(userId)
      fetchPets(userId)
      fetchWorkers()
    }
  }, [])

  const fetchPets = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3004/pets?ownerId=${userId}`)
      const data = await response.json()
      setPetData(data)
    } catch (error) {
      console.error('Error fetching pets:', error)
    }
  }

  const fetchWorkers = async () => {
    try {
      const response = await fetch('http://localhost:3004/workers')
      const data = await response.json()
      setWorkers(data)
    } catch (error) {
      console.error('Error fetching workers:', error)
    }
  }

  return (
    <CRow>
      <CCol md={4}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Mis Mascotas</strong>
          </CCardHeader>
          <CCardBody>
            <CListGroup>
              {petData.map((pet) => (
                <CListGroupItem
                  key={pet.id}
                  onClick={() => setSelectedPet(pet.id === selectedPet ? null : pet.id)}
                  active={pet.id === selectedPet}
                  className="d-flex justify-content-between align-items-center"
                >
                  {pet.name}
                  <CBadge color="primary" shape="rounded-pill">
                    {pet.species}
                  </CBadge>
                </CListGroupItem>
              ))}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={8}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Detalles de la Mascota</strong>
          </CCardHeader>
          <CCardBody>
            {selectedPet ? (
              <PetDetails pet={petData.find((p) => p.id === selectedPet)} workers={workers} />
            ) : (
              <p>Selecciona una mascota para ver sus detalles.</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

function PetDetails({ pet, workers }) {
  const [showHistory, setShowHistory] = useState(false)

  const getVetName = (workerId) => {
    const worker = workers.find(w => w.id === workerId)
    return worker ? worker.user.name : 'Desconocido'
  }

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  return (
    <>
      <CRow className="mb-3">
        <CCol sm={3}>
          <strong>Nombre:</strong>
        </CCol>
        <CCol sm={9}>{pet.name}</CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>
          <strong>Especie:</strong>
        </CCol>
        <CCol sm={9}>{pet.species}</CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>
          <strong>Raza:</strong>
        </CCol>
        <CCol sm={9}>{pet.breed}</CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>
          <strong>Edad:</strong>
        </CCol>
        <CCol sm={9}>{calcularEdad(pet.birthDate)} años</CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>
          <strong>Color:</strong>
        </CCol>
        <CCol sm={9}>{pet.color}</CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>
          <strong>Peso:</strong>
        </CCol>
        <CCol sm={9}>{pet.weight} kg</CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol>
          <CButton onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? 'Ocultar' : 'Mostrar'} Historial Médico
          </CButton>
        </CCol>
      </CRow>
      <CCollapse visible={showHistory}>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Fecha</CTableHeaderCell>
              <CTableHeaderCell>Descripción</CTableHeaderCell>
              <CTableHeaderCell>Veterinario</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {pet.medicalHistory.map((record, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{record.date}</CTableDataCell>
                <CTableDataCell>{record.description}</CTableDataCell>
                <CTableDataCell>{getVetName(record.workerId)}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCollapse>
    </>
  )
}