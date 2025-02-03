import { useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CBadge,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CAlert,
  CSpinner,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilMedicalCross, cilCalendar, cilUser, cilNotes, cilBasket } from "@coreui/icons"

const PetRecords = () => {
  const [pets, setPets] = useState([])
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("No se ha iniciado sesión")
        }

        const userId = token.split("-")[2]

        // Obtener mascotas, trabajadores y citas
        const [petsResponse, workersResponse, appointmentsResponse] = await Promise.all([
          fetch(`http://localhost:3004/pets?ownerId=${userId}`),
          fetch("http://localhost:3004/workers"),
          fetch(`http://localhost:3004/appointments?ownerId=${userId}&status=Completada`),
        ])

        if (!petsResponse.ok || !workersResponse.ok || !appointmentsResponse.ok) {
          throw new Error("Error al obtener los datos")
        }

        const [petsData, workersData, appointmentsData] = await Promise.all([
          petsResponse.json(),
          workersResponse.json(),
          appointmentsResponse.json(),
        ])

        // Combinar las citas completadas con el historial médico de las mascotas
        const updatedPets = petsData.map((pet) => {
          const petAppointments = appointmentsData.filter((app) => app.petId === pet.id)
          const updatedMedicalHistory = [
            ...(pet.medicalHistory || []),
            ...petAppointments.map((app) => ({
              date: app.date,
              description: app.description,
              productsUsed: app.productsUsed || [],
              observations: app.observations || "",
              workerId: app.workerId,
            })),
          ]
          return { ...pet, medicalHistory: updatedMedicalHistory }
        })

        setPets(updatedPets)
        setWorkers(workersData)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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

  return (
    <CRow>
      {pets.map((pet) => (
        <CCol xs={12} key={pet.id} className="mb-4">
          <PetCard pet={pet} workers={workers} />
        </CCol>
      ))}
    </CRow>
  )
}

const PetCard = ({ pet, workers }) => {
  const getVetName = (workerId) => {
    const worker = workers.find((w) => w.id === workerId)
    return worker ? worker.user.name : "Desconocido"
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  return (
    <CCard>
      <CCardHeader className="bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">{pet.name}</h4>
          <CBadge color="primary">{pet.species}</CBadge>
        </div>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-4">
          <CCol md={3} className="mb-3">
            <div className="text-medium-emphasis small">Raza</div>
            <div className="fw-bold">{pet.breed}</div>
          </CCol>
          <CCol md={3} className="mb-3">
            <div className="text-medium-emphasis small">Edad</div>
            <div className="fw-bold">{calcularEdad(pet.birthDate)} años</div>
          </CCol>
          <CCol md={3} className="mb-3">
            <div className="text-medium-emphasis small">Color</div>
            <div className="fw-bold">{pet.color}</div>
          </CCol>
          <CCol md={3} className="mb-3">
            <div className="text-medium-emphasis small">Peso</div>
            <div className="fw-bold">{pet.weight} kg</div>
          </CCol>
        </CRow>

        <CAccordion flush>
          <CAccordionItem itemKey={1}>
            <CAccordionHeader>
              <CIcon icon={cilMedicalCross} className="me-2" />
              Historial Médico
            </CAccordionHeader>
            <CAccordionBody>
              {pet.medicalHistory && pet.medicalHistory.length > 0 ? (
                <CTable responsive bordered small>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>
                        <CIcon icon={cilCalendar} className="me-2" />
                        Fecha
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        <CIcon icon={cilNotes} className="me-2" />
                        Descripción
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        <CIcon icon={cilBasket} className="me-2" />
                        Productos Utilizados
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        <CIcon icon={cilNotes} className="me-2" />
                        Observaciones
                      </CTableHeaderCell>
                      <CTableHeaderCell>
                        <CIcon icon={cilUser} className="me-2" />
                        Veterinario
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {pet.medicalHistory.map((record, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{formatDate(record.date)}</CTableDataCell>
                        <CTableDataCell>{record.description}</CTableDataCell>
                        <CTableDataCell>
                          {record.productsUsed && record.productsUsed.length > 0 ? (
                            <ul className="mb-0 ps-3">
                              {record.productsUsed.map((product, idx) => (
                                <li key={idx}>
                                  {product.name} ({product.quantity} unidades)
                                </li>
                              ))}
                            </ul>
                          ) : (
                            "No se utilizaron productos"
                          )}
                        </CTableDataCell>
                        <CTableDataCell>{record.observations || "Sin observaciones"}</CTableDataCell>
                        <CTableDataCell>{getVetName(record.workerId)}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <CAlert color="info" className="mb-0">
                  No hay registros médicos disponibles.
                </CAlert>
              )}
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </CCardBody>
    </CCard>
  )
}

export default PetRecords

