import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
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
  CForm,
  CFormInput,
  CFormSelect,
  CCol,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'

const tiposTrabajador = ['Veterinario', 'Peluquería', 'Baños']
const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

export default function WorkersSchedule() {
  const [Schedule, setSchedule] = useState([])
  const [editSchedule, setEditSchedule] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const agregarHorario = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const nuevoHorario = {
      id: Date.now(),
      nombre: formData.get('nombre'),
      tipo: formData.get('tipo'),
      dia: formData.get('dia'),
      horaInicio: formData.get('horaInicio'),
      horaFin: formData.get('horaFin'),
    }
    setSchedule([...Schedule, nuevoHorario])
    setModalVisible(false)
  }

  const editarHorario = (horario) => {
    setEditSchedule(horario)
    setModalVisible(true)
  }

  const actualizarHorario = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const horarioActualizado = {
      id: editSchedule.id,
      nombre: formData.get('nombre'),
      tipo: formData.get('tipo'),
      dia: formData.get('dia'),
      horaInicio: formData.get('horaInicio'),
      horaFin: formData.get('horaFin'),
    }
    setSchedule(Schedule.map(h => h.id === horarioActualizado.id ? horarioActualizado : h))
    setEditSchedule(null)
    setModalVisible(false)
  }

  const eliminarHorario = (id) => {
    setSchedule(Schedule.filter(h => h.id !== id))
  }

  return (
    <CCard className="mx-auto" style={{ maxWidth: '1000px' }}>
      <CCardHeader>
        <h2 className="mb-0">Horarios de Trabajadores</h2>
      </CCardHeader>
      <CCardBody>
        <CButton color="primary" onClick={() => setModalVisible(true)} className="mb-3">
          <CIcon icon={cilPlus} className="me-2" />
          Agregar Horario
        </CButton>

        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Día</CTableHeaderCell>
              <CTableHeaderCell scope="col">Hora Inicio</CTableHeaderCell>
              <CTableHeaderCell scope="col">Hora Fin</CTableHeaderCell>
              <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {Schedule.map((horario) => (
              <CTableRow key={horario.id}>
                <CTableDataCell>{horario.nombre}</CTableDataCell>
                <CTableDataCell>{horario.tipo}</CTableDataCell>
                <CTableDataCell>{horario.dia}</CTableDataCell>
                <CTableDataCell>{horario.horaInicio}</CTableDataCell>
                <CTableDataCell>{horario.horaFin}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" variant="ghost" size="sm" onClick={() => editarHorario(horario)} className="me-2">
                    <CIcon icon={cilPencil} size="sm" />
                  </CButton>
                  <CButton color="danger" variant="ghost" size="sm" onClick={() => eliminarHorario(horario.id)}>
                    <CIcon icon={cilTrash} size="sm" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CForm onSubmit={editSchedule ? actualizarHorario : agregarHorario}>
            <CModalHeader>
              <CModalTitle>{editSchedule ? 'Editar Horario' : 'Agregar Nuevo Horario'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="nombre"
                    name="nombre"
                    label="Nombre del Trabajador"
                    defaultValue={editSchedule?.nombre}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormSelect
                    id="tipo"
                    name="tipo"
                    label="Tipo de Trabajador"
                    options={tiposTrabajador.map(tipo => ({ label: tipo, value: tipo }))}
                    defaultValue={editSchedule?.tipo}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormSelect
                    id="dia"
                    name="dia"
                    label="Día de la Semana"
                    options={diasSemana.map(dia => ({ label: dia, value: dia }))}
                    defaultValue={editSchedule?.dia}
                    required
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={6}>
                  <CFormInput
                    type="time"
                    id="horaInicio"
                    name="horaInicio"
                    label="Hora de Inicio"
                    defaultValue={editSchedule?.horaInicio}
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="time"
                    id="horaFin"
                    name="horaFin"
                    label="Hora de Fin"
                    defaultValue={editSchedule?.horaFin}
                    required
                  />
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>
                Cancelar
              </CButton>
              <CButton color="primary" type="submit">
                {editSchedule ? 'Actualizar' : 'Agregar'}
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </CCardBody>
    </CCard>
  )
}