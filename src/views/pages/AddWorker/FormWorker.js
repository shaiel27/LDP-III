import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
  CRow,
} from '@coreui/react'

export default function RegistrationForm() {
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Registro de Trabajador de Veterinaria</strong>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputName">Nombre</CFormLabel>
              <CFormInput id="inputName" placeholder="Ingrese el nombre" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputLastName">Apellido</CFormLabel>
              <CFormInput id="inputLastName" placeholder="Ingrese el apellido" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputEmail">Correo Electrónico</CFormLabel>
              <CFormInput type="email" id="inputEmail" placeholder="nombre@ejemplo.com" />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputPhone">Número de Teléfono</CFormLabel>
              <CFormInput id="inputPhone" placeholder="Ingrese el número de teléfono" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="selectSpecialty">Especialidad</CFormLabel>
              <CFormSelect id="selectSpecialty">
                <option>Seleccione una especialidad</option>
                <option value="general">Veterinario General</option>
                <option value="surgery">Cirujano Veterinario</option>
                <option value="dermatology">Dermatólogo Veterinario</option>
                <option value="nutrition">Nutricionista Veterinario</option>
                <option value="groomer">Personal de Baños Veterinarios</option>
                <option value="stylist"> Estilista Veterinario</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="inputStartDate">Fecha de Nacimiento</CFormLabel>
              <CFormInput type="date" id="inputStartDate" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="inputPhoto">Foto Personal</CFormLabel>
              <CFormInput type="file" id="inputPhoto" accept="image/*" />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CButton color="primary" type="submit">
                Registrar Trabajador
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}