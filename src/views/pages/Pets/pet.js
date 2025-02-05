import { useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAlert,
  CSpinner,
} from "@coreui/react"

const API_BASE_URL = "http://localhost:3001/api/v1"

const PetRecords = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("No se ha iniciado sesión")
        }

        const response = await fetch(`${API_BASE_URL}/pets/user-pets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Error al obtener las mascotas")
        }

        const data = await response.json()
        if (data.ok) {
          setPets(data.pets)
        } else {
          throw new Error(data.msg || "Error desconocido al obtener las mascotas")
        }
      } catch (error) {
        console.error("Error fetching pets:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPets()
  }, [])

  if (loading) {
    return (
      <div className="text-center p-3">
        <CSpinner color="primary" />
        <p className="mt-2">Cargando información de mascotas...</p>
      </div>
    )
  }

  if (error) {
    return <CAlert color="danger">{error}</CAlert>
  }

  if (pets.length === 0) {
    return <CAlert color="info">No tienes mascotas registradas.</CAlert>
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
    <CCard>
      <CCardHeader>
        <h2 className="mb-0">Mis Mascotas</h2>
      </CCardHeader>
      <CCardBody>
        <CTable responsive bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Raza</CTableHeaderCell>
              <CTableHeaderCell>Color</CTableHeaderCell>
              <CTableHeaderCell>Sexo</CTableHeaderCell>
              <CTableHeaderCell>Edad</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {pets.map((pet) => (
              <CTableRow key={pet.id}>
                <CTableDataCell>{pet.name}</CTableDataCell>
                <CTableDataCell>{pet.breed_name}</CTableDataCell>
                <CTableDataCell>{pet.color}</CTableDataCell>
                <CTableDataCell>{pet.sex}</CTableDataCell>
                <CTableDataCell>{calcularEdad(pet.date_birth)} años</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default PetRecords

