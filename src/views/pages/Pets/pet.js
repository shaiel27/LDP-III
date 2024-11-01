import React, { useState } from 'react'
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

// Datos de ejemplo
const petData = [
  {
    id: 1,
    name: 'Max',
    species: 'Perro',
    breed: 'Labrador',
    age: 5,
    owner: 'Juan Pérez',
    medicalHistory: [
      { date: '2023-05-15', description: 'Vacunación anual', vet: 'Dra. García' },
      { date: '2023-02-10', description: 'Tratamiento para pulgas', vet: 'Dr. Rodríguez' },
    ],
  },
  {
    id: 2,
    name: 'Luna',
    species: 'Gato',
    breed: 'Siamés',
    age: 3,
    owner: 'María López',
    medicalHistory: [
      { date: '2023-06-01', description: 'Esterilización', vet: 'Dra. Martínez' },
      { date: '2023-03-20', description: 'Revisión dental', vet: 'Dr. Sánchez' },
    ],
  },
]

export default function PetRecords() {
  const [selectedPet, setSelectedPet] = useState(null)

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
              <PetDetails pet={petData.find((p) => p.id === selectedPet)} />
            ) : (
              <p>Selecciona una mascota para ver sus detalles.</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

function PetDetails({ pet }) {
  const [showHistory, setShowHistory] = useState(false)

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
        <CCol sm={9}>{pet.age} años</CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>
          <strong>Dueño:</strong>
        </CCol>
        <CCol sm={9}>{pet.owner}</CCol>
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
                <CTableDataCell>{record.vet}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCollapse>
    </>
  )
}