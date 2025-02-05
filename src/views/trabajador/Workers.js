"use client"

import { useState, useEffect } from "react"
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsF,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
  cilPaw,
  cilMedicalCross,
  cilPencil,
  cilTrash,
  cilEnvelopeClosed,
  cilPhone,
  cilCalendar,
  cilLocationPin,
} from "@coreui/icons"

const avatarMap = {
  avatar1: "https://api.dicebear.com/7.x/initials/svg?seed=YA",
  avatar2: "https://api.dicebear.com/7.x/initials/svg?seed=AT",
  avatar3: "https://api.dicebear.com/7.x/initials/svg?seed=QE",
  avatar4: "https://api.dicebear.com/7.x/initials/svg?seed=EK",
  avatar5: "https://api.dicebear.com/7.x/initials/svg?seed=SB",
  avatar6: "https://api.dicebear.com/7.x/initials/svg?seed=FD",
}

const countryFlagMap = {
  USA: cifUs,
  Brazil: cifBr,
  India: cifIn,
  France: cifFr,
  Spain: cifEs,
  Poland: cifPl,
}

const paymentIconMap = {
  "General Practice": cibCcMastercard,
  Orthopedics: cibCcVisa,
  Dentistry: cibCcStripe,
  Cardiology: cibCcPaypal,
  Neurology: cibCcApplePay,
  Dermatology: cibCcAmex,
}

export default function VetWorkersDashboard() {
  const [workers, setWorkers] = useState([])
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [editingWorker, setEditingWorker] = useState(null)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  useEffect(() => {
    fetchWorkers()
  }, [])

  const fetchWorkers = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:3001/api/v1/workers/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (response.ok) {
        setWorkers(data.workers)
      } else {
        console.error("Error loading data:", data.message)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const handleRowClick = (worker) => {
    setSelectedWorker(worker)
  }

  const handleEdit = (e, worker) => {
    e.stopPropagation()
    setEditingWorker({ ...worker })
    setIsEditModalVisible(true)
  }

  const handleDelete = (e, worker) => {
    e.stopPropagation()
    setEditingWorker(worker)
    setIsDeleteModalVisible(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3001/api/v1/workers/${editingWorker.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingWorker),
      })
      if (response.ok) {
        setIsEditModalVisible(false)
        fetchWorkers()
      } else {
        console.error("Failed to update worker")
      }
    } catch (error) {
      console.error("Error updating worker:", error)
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3001/api/v1/workers/${editingWorker.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        setIsDeleteModalVisible(false)
        fetchWorkers()
        if (selectedWorker && selectedWorker.id === editingWorker.id) {
          setSelectedWorker(null)
        }
      } else {
        console.error("Failed to delete worker")
      }
    } catch (error) {
      console.error("Error deleting worker:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("schedule-")) {
      const day = name.split("-")[1]
      setEditingWorker((prev) => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [day]: value,
        },
      }))
    } else {
      setEditingWorker((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      }))
    }
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Desempeño del personal veterinario</strong>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Empleado</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Pacientes atendidos</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Última actividad</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {workers.map((item, index) => (
                    <CTableRow key={index} onClick={() => handleRowClick(item)} style={{ cursor: "pointer" }}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={avatarMap[item.avatar.src]} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? "Nuevo" : "Experimentado"}</span> | Se unió: {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{item.usage.value} Pacientes</div>
                          <div className="ms-3">
                            <small className="text-body-secondary">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Última actividad</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          color="primary"
                          variant="ghost"
                          size="sm"
                          className="me-2"
                          onClick={(e) => handleEdit(e, item)}
                        >
                          <CIcon icon={cilPencil} size="sm" />
                        </CButton>
                        <CButton color="danger" variant="ghost" size="sm" onClick={(e) => handleDelete(e, item)}>
                          <CIcon icon={cilTrash} size="sm" />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {selectedWorker && (
        <>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Detalles del empleado: {selectedWorker.user.name}</strong>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md={6}>
                      <p>
                        <strong>País:</strong> {selectedWorker.country.name}
                      </p>
                      <p>
                        <strong>Especialización:</strong> {selectedWorker.payment.name}
                      </p>
                      <p>
                        <strong>Estado:</strong> {selectedWorker.user.new ? "Nuevo" : "Experimentado"}
                      </p>
                      <p>
                        <strong>Fecha de registro:</strong> {selectedWorker.user.registered}
                      </p>
                      <p>
                        <CIcon icon={cilEnvelopeClosed} className="me-2" />
                        <strong>Email:</strong> {selectedWorker.user.email}
                      </p>
                      <p>
                        <CIcon icon={cilPhone} className="me-2" />
                        <strong>Teléfono:</strong> {selectedWorker.user.phone}
                      </p>
                    </CCol>
                    <CCol md={6}>
                      <p>
                        <strong>Última actividad:</strong> {selectedWorker.activity}
                      </p>
                      <p>
                        <strong>Periodo de uso:</strong> {selectedWorker.usage.period}
                      </p>
                      <p>
                        <strong>Pacientes atendidos:</strong> {selectedWorker.usage.value}
                      </p>
                      <p>
                        <strong>Rendimiento:</strong>{" "}
                        <CProgress thin color={selectedWorker.usage.color} value={selectedWorker.usage.value} />
                      </p>
                      <p>
                        <CIcon icon={cilCalendar} className="me-2" />
                        <strong>Fecha de nacimiento:</strong> {selectedWorker.user.birthDate}
                      </p>
                      <p>
                        <CIcon icon={cilLocationPin} className="me-2" />
                        <strong>Dirección:</strong> {selectedWorker.user.address}
                      </p>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={6} sm={4} lg={3.5}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilPaw} height={24} />}
                title="Pacientes atendidos"
                value={selectedWorker.stats.patientsSeen.toString()}
              />
            </CCol>
            <CCol xs={6} sm={4} lg={3.5}>
              <CWidgetStatsF
                className="mb-3"
                color="warning"
                icon={<CIcon icon={cilMedicalCross} height={26} />}
                title="Cirugías realizadas"
                value={selectedWorker.stats.surgeriesPerformed.toString()}
              />
            </CCol>
            <CCol xs={6} sm={4} lg={3.5}>
              <CWidgetStatsF
                className="mb-3"
                color="success"
                icon={<CIcon icon={cilPaw} height={24} />}
                title="Vacunas administradas"
                value={selectedWorker.stats.vaccinationsGiven.toString()}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={6} sm={4} lg={3.5}>
              <CWidgetStatsF
                className="mb-3"
                color="danger"
                icon={<CIcon icon={cilMedicalCross} height={26} />}
                title="Casos de emergencia"
                value={selectedWorker.stats.emergencyCases.toString()}
              />
            </CCol>
            <CCol xs={6} sm={4} lg={3.5}>
              <CWidgetStatsF
                className="mb-3"
                color="info"
                icon={<CIcon icon={cilPaw} height={24} />}
                title="Satisfacción del cliente"
                value={selectedWorker.stats.clientSatisfaction}
              />
            </CCol>
            <CCol xs={6} sm={4} lg={3.5}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilMedicalCross} height={24} />}
                title="Próximas citas"
                value={selectedWorker.stats.upcomingAppointments.toString()}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4">
            <CCol xs={12}>
              <CCard>
                <CCardHeader>
                  <strong>Horario de trabajo</strong>
                </CCardHeader>
                <CCardBody>
                  <CTable responsive small>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>Día</CTableHeaderCell>
                        <CTableHeaderCell>Horario</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {Object.entries(selectedWorker.schedule).map(([day, hours]) => (
                        <CTableRow key={day}>
                          <CTableDataCell>{day.charAt(0).toUpperCase() + day.slice(1)}</CTableDataCell>
                          <CTableDataCell>{hours}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}

      <CModal visible={isEditModalVisible} onClose={() => setIsEditModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Editar Empleado</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditSubmit}>
            <CFormInput
              type="text"
              id="name"
              name="name"
              label="Nombre"
              value={editingWorker?.user.name || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="email"
              id="email"
              name="email"
              label="Email"
              value={editingWorker?.user.email || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="tel"
              id="phone"
              name="phone"
              label="Teléfono"
              value={editingWorker?.user.phone || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="date"
              id="birthDate"
              name="birthDate"
              label="Fecha de nacimiento"
              value={editingWorker?.user.birthDate || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="text"
              id="address"
              name="address"
              label="Dirección"
              value={editingWorker?.user.address || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormSelect
              id="country"
              name="country"
              label="País"
              value={editingWorker?.country.name || ""}
              onChange={(e) =>
                setEditingWorker((prev) => ({ ...prev, country: { ...prev.country, name: e.target.value } }))
              }
              className="mb-3"
            >
              <option value="">Seleccionar País</option>
              {Object.keys(countryFlagMap).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </CFormSelect>
            <CFormSelect
              id="specialization"
              name="specialization"
              label="Especialización"
              value={editingWorker?.payment.name || ""}
              onChange={(e) =>
                setEditingWorker((prev) => ({ ...prev, payment: { ...prev.payment, name: e.target.value } }))
              }
              className="mb-3"
            >
              <option value="">Seleccionar Especialización</option>
              {Object.keys(paymentIconMap).map((specialization) => (
                <option key={specialization} value={specialization}>
                  {specialization}
                </option>
              ))}
            </CFormSelect>
            <div className="mb-3">
              <h5>Horario de trabajo</h5>
              {Object.entries(editingWorker?.schedule || {}).map(([day, hours]) => (
                <CFormInput
                  key={day}
                  type="text"
                  id={`schedule-${day}`}
                  name={`schedule-${day}`}
                  label={day.charAt(0).toUpperCase() + day.slice(1)}
                  value={hours}
                  onChange={handleInputChange}
                  className="mb-2"
                />
              ))}
            </div>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setIsEditModalVisible(false)}>
                Cancelar
              </CButton>
              <CButton color="primary" type="submit">
                Guardar Cambios
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal visible={isDeleteModalVisible} onClose={() => setIsDeleteModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>¿Está seguro de que desea eliminar al empleado {editingWorker?.user.name}?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsDeleteModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDeleteConfirm}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

