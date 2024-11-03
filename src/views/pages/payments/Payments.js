import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMoney, cilUser, cilMedicalCross } from '@coreui/icons'

// Dummy data for demonstration
const paymentsData = [
  { id: 1, date: '2023-05-20', amount: 50, patientName: 'Luna', ownerName: 'Carlos Rodríguez', service: 'Consulta', veterinarian: 'Dra. María García', treatment: 'Revisión general y vacunación' },
  { id: 2, date: '2023-05-21', amount: 30, patientName: 'Max', ownerName: 'Ana Martínez', service: 'Baño', veterinarian: 'Juan Pérez', treatment: 'Baño y corte de uñas' },
  { id: 3, date: '2023-05-22', amount: 40, patientName: 'Bella', ownerName: 'Juan López', service: 'Peluquería', veterinarian: 'Laura Sánchez', treatment: 'Corte de pelo y limpieza de oídos' },
  { id: 4, date: '2023-05-23', amount: 60, patientName: 'Rocky', ownerName: 'Pedro Gómez', service: 'Consulta', veterinarian: 'Dr. Carlos Ruiz', treatment: 'Tratamiento para infección cutánea' },
]

export default function PaymentAdminModule() {
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('Todos')

  const filteredPayments = filter === 'Todos' 
    ? paymentsData 
    : paymentsData.filter(payment => payment.service === filter)

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment)
    setShowModal(true)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <h2 className="mb-4">Administración de Pagos</h2>
            
            <CRow className="mb-3">
              <CCol sm={4}>
                <CFormSelect 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  options={[
                    { label: 'Todos los servicios', value: 'Todos' },
                    { label: 'Consulta', value: 'Consulta' },
                    { label: 'Baño', value: 'Baño' },
                    { label: 'Peluquería', value: 'Peluquería' },
                  ]}
                />
              </CCol>
            </CRow>

            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Fecha</CTableHeaderCell>
                  <CTableHeaderCell>Monto</CTableHeaderCell>
                  <CTableHeaderCell>Paciente</CTableHeaderCell>
                  <CTableHeaderCell>Dueño</CTableHeaderCell>
                  <CTableHeaderCell>Servicio</CTableHeaderCell>
                  <CTableHeaderCell>Veterinario</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredPayments.map((payment) => (
                  <CTableRow key={payment.id}>
                    <CTableDataCell>{payment.date}</CTableDataCell>
                    <CTableDataCell>${payment.amount}</CTableDataCell>
                    <CTableDataCell>{payment.patientName}</CTableDataCell>
                    <CTableDataCell>{payment.ownerName}</CTableDataCell>
                    <CTableDataCell>{payment.service}</CTableDataCell>
                    <CTableDataCell>{payment.veterinarian}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="primary" size="sm" onClick={() => handleViewDetails(payment)}>
                        Ver detalles
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <CModalTitle>Detalles del Pago</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedPayment && (
            <>
              <p><CIcon icon={cilMoney} /> <strong>Monto:</strong> ${selectedPayment.amount}</p>
              <p><CIcon icon={cilUser} /> <strong>Paciente:</strong> {selectedPayment.patientName}</p>
              <p><strong>Dueño:</strong> {selectedPayment.ownerName}</p>
              <p><strong>Fecha:</strong> {selectedPayment.date}</p>
              <p><strong>Servicio:</strong> {selectedPayment.service}</p>
              <p><strong>Veterinario:</strong> {selectedPayment.veterinarian}</p>
              <p><CIcon icon={cilMedicalCross} /> <strong>Tratamiento:</strong> {selectedPayment.treatment}</p>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}