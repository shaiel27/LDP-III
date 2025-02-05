import { useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilPencil, cilTrash } from "@coreui/icons"

const API_BASE_URL = "http://localhost:3001/api/v1"

export default function ViewWorkers() {
  const [workers, setWorkers] = useState([])
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchWorkers()
  }, [])

  const fetchWorkers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/workers/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await response.json()
      if (response.ok) {
        setWorkers(data.workers)
      } else {
        setError(data.msg || "Error al cargar los trabajadores")
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Error al conectar con el servidor")
    }
  }

  const handleDelete = (worker) => {
    setSelectedWorker(worker)
    setIsDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/workers/${selectedWorker.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.ok) {
        setWorkers(workers.filter((w) => w.id !== selectedWorker.id))
        setIsDeleteModalVisible(false)
      } else {
        const data = await response.json()
        setError(data.msg || "Error al eliminar el trabajador")
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Error al conectar con el servidor")
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Lista de Trabajadores</strong>
      </CCardHeader>
      <CCardBody>
        {error && <CAlert color="danger">{error}</CAlert>}
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Rol</CTableHeaderCell>
              <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {workers.map((worker) => (
              <CTableRow key={worker.id}>
                <CTableDataCell>{`${worker.first_name} ${worker.last_name}`}</CTableDataCell>
                <CTableDataCell>{worker.email}</CTableDataCell>
                <CTableDataCell>{worker.role_name}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="info" variant="outline" className="me-2">
                    <CIcon icon={cilPencil} size="sm" />
                  </CButton>
                  <CButton color="danger" variant="outline" onClick={() => handleDelete(worker)}>
                    <CIcon icon={cilTrash} size="sm" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CModal visible={isDeleteModalVisible} onClose={() => setIsDeleteModalVisible(false)}>
          <CModalHeader>
            <CModalTitle>Confirmar Eliminación</CModalTitle>
          </CModalHeader>
          <CModalBody>
            ¿Está seguro de que desea eliminar al trabajador {selectedWorker?.first_name} {selectedWorker?.last_name}?
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setIsDeleteModalVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="danger" onClick={confirmDelete}>
              Eliminar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

