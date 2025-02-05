import { useState } from "react"
import { CCard, CCardHeader, CCardBody, CForm, CFormInput, CFormSelect, CButton, CAlert } from "@coreui/react"

const API_BASE_URL = "http://localhost:3001/api/v1"

export default function RegisterPets() {
  const [formData, setFormData] = useState({
    name: "",
    fk_breed: "",
    color: "",
    sex: "",
    date_birth: "",
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No se encontró token de autenticación. Por favor, inicie sesión.")
        return
      }

      const response = await fetch(`${API_BASE_URL}/pets/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.msg || "Mascota registrada exitosamente")
        setFormData({
          name: "",
          fk_breed: "",
          color: "",
          sex: "",
          date_birth: "",
        })
      } else {
        setError(data.msg || "Error al registrar la mascota")
      }
    } catch (error) {
      console.error("Error registering pet:", error)
      setError("Error de conexión con el servidor")
    }
  }

  return (
    <CCard className="mx-auto" style={{ maxWidth: "500px" }}>
      <CCardHeader>
        <h2 className="mb-0">Registrar Nueva Mascota</h2>
      </CCardHeader>
      <CCardBody>
        {error && <CAlert color="danger">{error}</CAlert>}
        {success && <CAlert color="success">{success}</CAlert>}
        <CForm onSubmit={handleSubmit}>
          <CFormInput
            type="text"
            id="name"
            name="name"
            label="Nombre"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mb-3"
          />
          <CFormInput
            type="number"
            id="fk_breed"
            name="fk_breed"
            label="ID de Raza"
            value={formData.fk_breed}
            onChange={handleInputChange}
            required
            className="mb-3"
          />
          <CFormInput
            type="text"
            id="color"
            name="color"
            label="Color"
            value={formData.color}
            onChange={handleInputChange}
            required
            className="mb-3"
          />
          <CFormSelect
            id="sex"
            name="sex"
            label="Sexo"
            value={formData.sex}
            onChange={handleInputChange}
            required
            className="mb-3"
          >
            <option value="">Seleccione el sexo</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </CFormSelect>
          <CFormInput
            type="date"
            id="date_birth"
            name="date_birth"
            label="Fecha de Nacimiento"
            value={formData.date_birth}
            onChange={handleInputChange}
            required
            className="mb-3"
          />
          <CButton color="primary" type="submit">
            Registrar Mascota
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

