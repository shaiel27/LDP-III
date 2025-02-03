import { useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAlert,
  CBadge,
  CButton,
  CForm,
  CFormSelect,
  CFormInput,
  CFormTextarea,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilPeople, cilCalendar, cilMedicalCross, cilClock, cilNotes } from "@coreui/icons"

const WorkerInfo = () => {
  const [worker, setWorker] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [consultations, setConsultations] = useState([])
  const [inventory, setInventory] = useState([])
  const [error, setError] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [observations, setObservations] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("No se ha iniciado sesión")
          return
        }

        const workerId = token.split("-")[2] // Asumiendo que el token tiene el formato "worker-token-id"

        const [workerResponse, appointmentsResponse, inventoryResponse] = await Promise.all([
          fetch(`http://localhost:3004/workers/${workerId}`),
          fetch(`http://localhost:3004/appointments?workerId=${workerId}`),
          fetch("http://localhost:3004/inventory"),
        ])

        if (!workerResponse.ok || !appointmentsResponse.ok || !inventoryResponse.ok) {
          throw new Error("Error al obtener los datos")
        }

        const [workerData, appointmentsData, inventoryData] = await Promise.all([
          workerResponse.json(),
          appointmentsResponse.json(),
          inventoryResponse.json(),
        ])

        setWorker(workerData)
        setAppointments(appointmentsData.filter((apt) => apt.status !== "Completada"))
        setConsultations(appointmentsData.filter((apt) => apt.status === "Completada"))
        setInventory(inventoryData)
      } catch (error) {
        setError("Ocurrió un error al cargar los datos")
      }
    }

    fetchData()
  }, [])

  const handleConfirmAppointment = (appointment) => {
    setSelectedAppointment(appointment)
    setSelectedProducts([])
    setObservations("")
    setShowConfirmModal(true)
  }

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { id: "", quantity: 1 }])
  }

  const handleProductChange = (index, field, value) => {
    const updatedProducts = selectedProducts.map((product, i) => {
      if (i === index) {
        return { ...product, [field]: value }
      }
      return product
    })
    setSelectedProducts(updatedProducts)
  }

  const handleRemoveProduct = (index) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index))
  }

  const handleSubmitConsultation = async () => {
    try {
      const productsUsed = selectedProducts.map((sp) => {
        const product = inventory.find((item) => item.id === sp.id)
        return {
          id: sp.id,
          name: product.name,
          quantity: sp.quantity,
        }
      })

      const updatedAppointment = {
        ...selectedAppointment,
        status: "Completada",
        productsUsed,
        observations,
      }

      const response = await fetch(`http://localhost:3004/appointments/${selectedAppointment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAppointment),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar la cita")
      }

      // Actualizar el inventario
      for (const product of selectedProducts) {
        const inventoryItem = inventory.find((item) => item.id === product.id)
        if (inventoryItem) {
          await fetch(`http://localhost:3004/inventory/${product.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: inventoryItem.quantity - product.quantity,
            }),
          })
        }
      }

      setAppointments(appointments.filter((apt) => apt.id !== selectedAppointment.id))
      setConsultations([...consultations, updatedAppointment])
      setShowConfirmModal(false)
    } catch (error) {
      setError("Ocurrió un error al confirmar la consulta")
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pendiente":
        return <CBadge color="warning">Pendiente</CBadge>
      case "Confirmada":
        return <CBadge color="success">Confirmada</CBadge>
      case "En proceso":
        return <CBadge color="info">En proceso</CBadge>
      case "Completada":
        return <CBadge color="primary">Completada</CBadge>
      default:
        return <CBadge color="secondary">{status}</CBadge>
    }
  }

  if (error) {
    return <CAlert color="danger">{error}</CAlert>
  }

  if (!worker) {
    return <CAlert color="info">Cargando información del trabajador...</CAlert>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Información del Trabajador</h4>
          </CCardHeader>
          <CCardBody>
            <p>
              <strong>Nombre:</strong> {worker.user.name}
            </p>
            <p>
              <strong>Email:</strong> {worker.user.email}
            </p>
            <p>
              <strong>Especialidad:</strong> {worker.specialty}
            </p>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Citas Pendientes</h4>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">
                    <CIcon icon={cilCalendar} /> Fecha
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CIcon icon={cilClock} /> Hora
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CIcon icon={cilPeople} /> Mascota
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CIcon icon={cilMedicalCross} /> Tipo
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CIcon icon={cilNotes} /> Descripción
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Acción</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {appointments.map((appointment) => (
                  <CTableRow key={appointment.id}>
                    <CTableDataCell>{appointment.date}</CTableDataCell>
                    <CTableDataCell>{appointment.time}</CTableDataCell>
                    <CTableDataCell>{appointment.pet}</CTableDataCell>
                    <CTableDataCell>{appointment.type}</CTableDataCell>
                    <CTableDataCell>{getStatusBadge(appointment.status)}</CTableDataCell>
                    <CTableDataCell>{appointment.description}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="primary" size="sm" onClick={() => handleConfirmAppointment(appointment)}>
                        Confirmar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h4>Consultas Completadas</h4>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">
                    <CIcon icon={cilCalendar} /> Fecha
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CIcon icon={cilPeople} /> Mascota
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CIcon icon={cilMedicalCross} /> Tipo
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <CIcon icon={cilNotes} /> Descripción
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Productos Usados</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Observaciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {consultations.map((consultation) => (
                  <CTableRow key={consultation.id}>
                    <CTableDataCell>{consultation.date}</CTableDataCell>
                    <CTableDataCell>{consultation.pet}</CTableDataCell>
                    <CTableDataCell>{consultation.type}</CTableDataCell>
                    <CTableDataCell>{consultation.description}</CTableDataCell>
                    <CTableDataCell>
                      {consultation.productsUsed?.map((product) => `${product.name} (${product.quantity})`).join(", ")}
                    </CTableDataCell>
                    <CTableDataCell>{consultation.observations}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Consulta</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <h5>Productos Utilizados</h5>
            {selectedProducts.map((product, index) => (
              <CRow key={index} className="mb-3">
                <CCol xs={6}>
                  <CFormSelect value={product.id} onChange={(e) => handleProductChange(index, "id", e.target.value)}>
                    <option value="">Seleccionar producto</option>
                    {inventory.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol xs={4}>
                  <CFormInput
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, "quantity", Number.parseInt(e.target.value))}
                    min="1"
                  />
                </CCol>
                <CCol xs={2}>
                  <CButton color="danger" onClick={() => handleRemoveProduct(index)}>
                    X
                  </CButton>
                </CCol>
              </CRow>
            ))}
            <CButton color="success" onClick={handleAddProduct} className="mb-3">
              Agregar Producto
            </CButton>
            <CFormTextarea
              id="observations"
              label="Observaciones"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={3}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleSubmitConsultation}>
            Confirmar
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default WorkerInfo

