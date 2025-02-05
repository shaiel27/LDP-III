import { useState } from "react"
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
  CFormTextarea,
  CAlert,
} from "@coreui/react"

const API_BASE_URL = "http://localhost:3001/api/v1"

export default function RegisterWorker() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    telephone_number: "",
    role_id: "",
    status: "active",
    date_birth: "",
    location: "",
    gender: "",
    license_number: "",
    years_experience: "",
    education: "",
    certifications: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`${API_BASE_URL}/workers/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.msg)
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          telephone_number: "",
          role_id: "",
          status: "active",
          date_birth: "",
          location: "",
          gender: "",
          license_number: "",
          years_experience: "",
          education: "",
          certifications: "",
        })
      } else {
        setError(data.msg || "Error al registrar el trabajador")
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Error al conectar con el servidor")
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Registro de Trabajador</strong>
      </CCardHeader>
      <CCardBody>
        {error && <CAlert color="danger">{error}</CAlert>}
        {success && <CAlert color="success">{success}</CAlert>}
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="first_name">Nombre</CFormLabel>
              <CFormInput id="first_name" value={formData.first_name} onChange={handleChange} required />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="last_name">Apellido</CFormLabel>
              <CFormInput id="last_name" value={formData.last_name} onChange={handleChange} required />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="email">Correo Electrónico</CFormLabel>
              <CFormInput type="email" id="email" value={formData.email} onChange={handleChange} required />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="password">Contraseña</CFormLabel>
              <CFormInput type="password" id="password" value={formData.password} onChange={handleChange} required />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="telephone_number">Teléfono</CFormLabel>
              <CFormInput id="telephone_number" value={formData.telephone_number} onChange={handleChange} required />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="role_id">Rol</CFormLabel>
              <CFormSelect id="role_id" value={formData.role_id} onChange={handleChange} required>
                <option value="">Seleccione un rol</option>
                <option value="1">Veterinario</option>
                <option value="2">Asistente</option>
                <option value="3">Recepcionista</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="date_birth">Fecha de Nacimiento</CFormLabel>
              <CFormInput type="date" id="date_birth" value={formData.date_birth} onChange={handleChange} required />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="location">Ubicación</CFormLabel>
              <CFormInput id="location" value={formData.location} onChange={handleChange} required />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="gender">Género</CFormLabel>
              <CFormSelect id="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Seleccione un género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="license_number">Número de Licencia</CFormLabel>
              <CFormInput id="license_number" value={formData.license_number} onChange={handleChange} />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="years_experience">Años de Experiencia</CFormLabel>
              <CFormInput
                type="number"
                id="years_experience"
                value={formData.years_experience}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="education">Educación</CFormLabel>
              <CFormTextarea id="education" value={formData.education} onChange={handleChange} rows={3} />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="certifications">Certificaciones</CFormLabel>
              <CFormTextarea id="certifications" value={formData.certifications} onChange={handleChange} rows={3} />
            </CCol>
          </CRow>
          <CButton color="primary" type="submit">
            Registrar Trabajador
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

