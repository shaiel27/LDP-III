'use client'

import React, { useState } from 'react'
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
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
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
  cilArrowRight,
  cilMedicalCross,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const tableExample = [
  {
    avatar: { src: avatar1, status: 'success' },
    user: { name: 'Yiorgos Avraamu', new: true, registered: 'Jan 1, 2023' },
    country: { name: 'USA', flag: cifUs },
    usage: { value: 50, period: 'Jun 11, 2023 - Jul 10, 2023', color: 'success' },
    payment: { name: 'General Practice', icon: cibCcMastercard },
    activity: '10 sec ago',
    stats: {
      patientsSeen: 309,
      surgeriesPerformed: 42,
      vaccinationsGiven: 156,
      emergencyCases: 23,
      clientSatisfaction: '95.8%',
      upcomingAppointments: 28
    }
  },
  {
    avatar: { src: avatar2, status: 'danger' },
    user: { name: 'Avram Tarasios', new: false, registered: 'Jan 1, 2023' },
    country: { name: 'Brazil', flag: cifBr },
    usage: { value: 22, period: 'Jun 11, 2023 - Jul 10, 2023', color: 'info' },
    payment: { name: 'Orthopedics', icon: cibCcVisa },
    activity: '5 minutes ago',
    stats: {
      patientsSeen: 245,
      surgeriesPerformed: 78,
      vaccinationsGiven: 92,
      emergencyCases: 15,
      clientSatisfaction: '94.2%',
      upcomingAppointments: 22
    }
  },
  {
    avatar: { src: avatar3, status: 'warning' },
    user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2023' },
    country: { name: 'India', flag: cifIn },
    usage: { value: 74, period: 'Jun 11, 2023 - Jul 10, 2023', color: 'warning' },
    payment: { name: 'Dentistry', icon: cibCcStripe },
    activity: '1 hour ago',
    stats: {
      patientsSeen: 187,
      surgeriesPerformed: 56,
      vaccinationsGiven: 78,
      emergencyCases: 9,
      clientSatisfaction: '96.5%',
      upcomingAppointments: 19
    }
  },
  {
    avatar: { src: avatar4, status: 'secondary' },
    user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2023' },
    country: { name: 'France', flag: cifFr },
    usage: { value: 98, period: 'Jun 11, 2023 - Jul 10, 2023', color: 'danger' },
    payment: { name: 'Cardiology', icon: cibCcPaypal },
    activity: 'Last month',
    stats: {
      patientsSeen: 276,
      surgeriesPerformed: 34,
      vaccinationsGiven: 112,
      emergencyCases: 31,
      clientSatisfaction: '93.7%',
      upcomingAppointments: 25
    }
  },
  {
    avatar: { src: avatar5, status: 'success' },
    user: { name: 'Shaiel Becerra', new: true, registered: 'Jan 1, 2023' },
    country: { name: 'Spain', flag: cifEs },
    usage: { value: 22, period: 'Jun 12, 2023 - Jul 10, 2023', color: 'primary' },
    payment: { name: 'Neurology', icon: cibCcApplePay },
    activity: 'Last week',
    stats: {
      patientsSeen: 198,
      surgeriesPerformed: 28,
      vaccinationsGiven: 87,
      emergencyCases: 18,
      clientSatisfaction: '97.1%',
      upcomingAppointments: 16
    }
  },
  {
    avatar: { src: avatar6, status: 'danger' },
    user: { name: 'Friderik Dávid', new: true, registered: 'Jan 1, 2023' },
    country: { name: 'Poland', flag: cifPl },
    usage: { value: 43, period: 'Jun 11, 2023 - Jul 10, 2023', color: 'success' },
    payment: { name: 'Dermatology', icon: cibCcAmex },
    activity: 'Last week',
    stats: {
      patientsSeen: 231,
      surgeriesPerformed: 19,
      vaccinationsGiven: 134,
      emergencyCases: 7,
      clientSatisfaction: '98.3%',
      upcomingAppointments: 31
    }
  },
]

export default function VetWorkersDashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Desempeño del personal veterinario</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Empleado</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Direccion</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Pacientes atendidos</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Especializacion</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Ultima actividad</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow key={index} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? 'New' : 'Experienced'}</span> | Se unio: {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
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
                      <CTableDataCell className="text-center">
                        {item.payment.name}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Ultima actividad</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
      {selectedEmployee && (
        <>
          <CRow>
            <CCol xs={6}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilPaw} height={24} />}
                title="Total de Pacientes atentidos"
                value={selectedEmployee.stats.patientsSeen.toString()}
              />
            </CCol>
            <CCol xs={6}>
              <CWidgetStatsF
                className="mb-3"
                color="warning"
                icon={<CIcon icon={cilMedicalCross} height={26} />}
                title="Cirugías realizadas"
                value={selectedEmployee.stats.surgeriesPerformed.toString()}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={6}>
              <CWidgetStatsF
                className="mb-3"
                color="success"
                icon={<CIcon icon={cilPaw} height={24} />}
                padding={false}
                title="Vacunas administradas"
                value={selectedEmployee.stats.vaccinationsGiven.toString()}
              />
            </CCol>
            <CCol xs={6}>
              <CWidgetStatsF
                className="mb-3"
                color="danger"
                icon={<CIcon icon={cilMedicalCross} height={26} />}
                padding={false}
                title="Casos de emergencia"
                value={selectedEmployee.stats.emergencyCases.toString()}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={6}>
              <CWidgetStatsF
                className="mb-3"
                color="info"
                icon={<CIcon icon={cilPaw} height={24} />}
                title="Clientes satisfechos"
                value={selectedEmployee.stats.clientSatisfaction}
              />
            </CCol>
            <CCol xs={6}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilMedicalCross} height={24} />}
                title="Próximas citas"
                value={selectedEmployee.stats.upcomingAppointments.toString()}
              />
            </CCol>
          </CRow>
        </>
      )}
    </>
  )
}