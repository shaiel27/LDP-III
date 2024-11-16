import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'

export default function RegisterPets() {
  const [mascotas, setMascotas] = useState([])
  const [mascotaEditando, setMascotaEditando] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const userId = token.split('-')[2] // Assuming token format is 'dummy-token-userId'
      setCurrentUserId(userId)
      fetchPets(userId)
    }
  }, [])

  const fetchPets = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3004/pets?ownerId=${userId}`)
      const data = await response.json()
      setMascotas(data)
    } catch (error) {
      console.error('Error fetching pets:', error)
    }
  }

  const AddPet = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const nuevaMascota = {
      name: formData.get('nombre'),
      species: formData.get('especie'),
      breed: formData.get('raza'),
      birthDate: formData.get('fechaNacimiento'),
      color: formData.get('color'),
      weight: Number(formData.get('peso')),
      ownerId: currentUserId,
      medicalHistory: []
    }
    try {
      const response = await fetch('http://localhost:3004/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaMascota),
      })
      if (response.ok) {
        fetchPets(currentUserId)
        setModalVisible(false)
      }
    } catch (error) {
      console.error('Error adding pet:', error)
    }
  }

  const editarMascota = (mascota) => {
    setMascotaEditando(mascota)
    setModalVisible(true)
  }

  const actualizarMascota = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const mascotaActualizada = {
      id: mascotaEditando.id,
      name: formData.get('nombre'),
      species: formData.get('especie'),
      breed: formData.get('raza'),
      birthDate: formData.get('fechaNacimiento'),
      color: formData.get('color'),
      weight: Number(formData.get('peso')),
      ownerId: currentUserId,
      medicalHistory: mascotaEditando.medicalHistory
    }
    try {
      const response = await fetch(`http://localhost:3004/pets/${mascotaActualizada.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mascotaActualizada),
      })
      if (response.ok) {
        fetchPets(currentUserId)
        setMascotaEditando(null)
        setModalVisible(false)
      }
    } catch (error) {
      console.error('Error updating pet:', error)
    }
  }

  const eliminarMascota = async (id) => {
    try {
      const response = await fetch(`http://localhost:3004/pets/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchPets(currentUserId)
      }
    } catch (error) {
      console.error('Error deleting pet:', error)
    }
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
    <CCard className="mx-auto" style={{ maxWidth: '100vw' }}>
      <CCardHeader>
        <h2 className="mb-0">Mis Mascotas</h2>
      </CCardHeader>
      <CCardBody>
        <CButton color="primary" onClick={() => setModalVisible(true)} className="mb-3">
          <CIcon icon={cilPlus} className="me-2" />
          Agregar Mascota
        </CButton>

        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
              <CTableHeaderCell scope="col">Especie</CTableHeaderCell>
              <CTableHeaderCell scope="col">Raza</CTableHeaderCell>
              <CTableHeaderCell scope="col">Edad</CTableHeaderCell>
              <CTableHeaderCell scope="col">Color</CTableHeaderCell>
              <CTableHeaderCell scope="col">Peso (kg)</CTableHeaderCell>
              <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {mascotas.map((mascota) => (
              <CTableRow key={mascota.id}>
                <CTableDataCell>{mascota.name}</CTableDataCell>
                <CTableDataCell>{mascota.species}</CTableDataCell>
                <CTableDataCell>{mascota.breed}</CTableDataCell>
                <CTableDataCell>{calcularEdad(mascota.birthDate)} años</CTableDataCell>
                <CTableDataCell>{mascota.color}</CTableDataCell>
                <CTableDataCell>{mascota.weight}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" variant="ghost" size="sm" onClick={() => editarMascota(mascota)} className="me-2">
                    <CIcon icon={cilPencil} size="sm" />
                  </CButton>
                  <CButton color="danger" variant="ghost" size="sm" onClick={() => eliminarMascota(mascota.id)}>
                    <CIcon icon={cilTrash} size="sm" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CForm onSubmit={mascotaEditando ? actualizarMascota : AddPet}>
            <CModalHeader>
              <CModalTitle>{mascotaEditando ? 'Editar Mascota' : 'Agregar Nueva Mascota'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                type="text"
                id="nombre"
                name="nombre"
                label="Nombre"
                defaultValue={mascotaEditando?.name}
                required
                className="mb-3"
              />
              <CFormInput
                type="text"
                id="especie"
                name="especie"
                label="Especie"
                defaultValue={mascotaEditando?.species}
                required
                className="mb-3"
              />
              <CFormInput
                type="text"
                id="raza"
                name="raza"
                label="Raza"
                defaultValue={mascotaEditando?.breed}
                required
                className="mb-3"
              />
              <CFormInput
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                label="Fecha de Nacimiento"
                defaultValue={mascotaEditando?.birthDate}
                required
                className="mb-3"
              />
              <CFormInput
                type="text"
                id="color"
                name="color"
                label="Color"
                defaultValue={mascotaEditando?.color}
                required
                className="mb-3"
              />
              <CFormInput
                type="number"
                id="peso"
                name="peso"
                label="Peso (kg)"
                defaultValue={mascotaEditando?.weight}
                required
                className="mb-3"
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>
                Cancelar
              </CButton>
              <CButton color="primary" type="submit">
                {mascotaEditando ? 'Actualizar' : 'Agregar'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </CCardBody>
    </CCard>
  )
}