import React, { useState } from 'react'
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
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'

export default function RegisterPets() {
  const [mascotas, setMascotas] = useState([])
  const [mascotaEditando, setMascotaEditando] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const AddPet = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const nuevaMascota = {
      id: Date.now(),
      nombre: formData.get('nombre'),
      especie: formData.get('especie'),
      raza: formData.get('raza'),
      edad: Number(formData.get('edad')),
      propietario: formData.get('propietario'),
    }
    setMascotas([...mascotas, nuevaMascota])
    setModalVisible(false)
  }

  const editarMascota = (mascota) => {
    setMascotaEditando(mascota)
    setModalVisible(true)
  }

  const actualizarMascota = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const mascotaActualizada = {
      id: mascotaEditando.id,
      nombre: formData.get('nombre'),
      especie: formData.get('especie'),
      raza: formData.get('raza'),
      edad: Number(formData.get('edad')),
      propietario: formData.get('propietario'),
    }
    setMascotas(mascotas.map(m => m.id === mascotaActualizada.id ? mascotaActualizada : m))
    setMascotaEditando(null)
    setModalVisible(false)
  }

  const eliminarMascota = (id) => {
    setMascotas(mascotas.filter(m => m.id !== id))
  }

  return (
    <CCard className="mx-auto" style={{ maxWidth: '100vw' }}>
      <CCardHeader>
        <h2 className="mb-0">Registro de Mascotas</h2>
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
              <CTableHeaderCell scope="col">Propietario</CTableHeaderCell>
              <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {mascotas.map((mascota) => (
              <CTableRow key={mascota.id}>
                <CTableDataCell>{mascota.nombre}</CTableDataCell>
                <CTableDataCell>{mascota.especie}</CTableDataCell>
                <CTableDataCell>{mascota.raza}</CTableDataCell>
                <CTableDataCell>{mascota.edad}</CTableDataCell>
                <CTableDataCell>{mascota.propietario}</CTableDataCell>
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
                defaultValue={mascotaEditando?.nombre}
                required
                className="mb-3"
              />
              <CFormInput
                type="text"
                id="especie"
                name="especie"
                label="Especie"
                defaultValue={mascotaEditando?.especie}
                required
                className="mb-3"
              />
              <CFormInput
                type="text"
                id="raza"
                name="raza"
                label="Raza"
                defaultValue={mascotaEditando?.raza}
                required
                className="mb-3"
              />
              <CFormInput
                type="number"
                id="edad"
                name="edad"
                label="Edad"
                defaultValue={mascotaEditando?.edad}
                required
                className="mb-3"
              />
              <CFormInput
                type="text"
                id="propietario"
                name="propietario"
                label="Propietario"
                defaultValue={mascotaEditando?.propietario}
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