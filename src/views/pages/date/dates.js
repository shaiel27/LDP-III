import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CFormLabel,
  CButton
} from '@coreui/react'

export default function AppointmentRequest() {
  return (
    <CRow>
      <CCol md={8} className="mx-auto">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Solicita una cita</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mb-3">
                {/* <CCol md={6}>
                  <CFormLabel htmlFor="petName">Nombre de la mascota</CFormLabel>
                  <CFormInput id="petName" placeholder="Ingresa el nombre de tu mascota" />
                </CCol> */}
                <CCol md={6}>
                  <CFormLabel htmlFor="petType">Mascota</CFormLabel>
                  <CFormSelect id="petType">
                    <option>Selecciona tu mascota</option>
                    <option >Max</option>
                    <option >Luna</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="serviceType">Tipo de Servicio</CFormLabel>
                  <CFormSelect id="serviceType">
                    <option>Selecciona un Servicio</option>
                    <option value="consultation">Consultation</option>
                    <option value="bath">Bath</option>
                    <option value="grooming">Grooming</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="preferredVet">Veterinario (Optional)</CFormLabel>
                  <CFormInput id="preferredVet" placeholder="Ingresa el Veterinario que desees para tu mascota" />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="appointmentDate">Fecha preferida</CFormLabel>
                  <CFormInput type="date" id="appointmentDate" />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="appointmentTime">Hora</CFormLabel>
                  <CFormInput type="time" id="appointmentTime" />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="description">Razon de la solitud de tu cita</CFormLabel>
                  <CFormTextarea
                    id="description"
                    rows={3}
                    placeholder="Describe el motivo de tu solicitud"
                  ></CFormTextarea>
                </CCol>
              </CRow>

              <CRow>
                <CCol>
                  <CButton color="primary" type="submit" className="mt-3">
                    Hacer solicitud
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}