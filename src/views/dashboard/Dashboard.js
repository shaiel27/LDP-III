import React, { useState, useEffect } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilCloudDownload,
  cilDog,
  cilCat,
  cilMedicalCross,
} from '@coreui/icons'
import MainChart from './MainChart'

const Dashboard = () => {
  const [data, setData] = useState({
    workers: [],
    pets: [],
    appointments: [],
    inventory: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [workersRes, petsRes, appointmentsRes, inventoryRes] = await Promise.all([
          fetch('http://localhost:3004/workers'),
          fetch('http://localhost:3004/pets'),
          fetch('http://localhost:3004/appointments'),
          fetch('http://localhost:3004/inventory')
        ])

        if (!workersRes.ok || !petsRes.ok || !appointmentsRes.ok || !inventoryRes.ok) {
          throw new Error('Error al cargar algunos datos')
        }

        const [workers, pets, appointments, inventory] = await Promise.all([
          workersRes.json(),
          petsRes.json(),
          appointmentsRes.json(),
          inventoryRes.json()
        ])

        setData({
          workers,
          pets,
          appointments,
          inventory
        })
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Error cargando datos: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <CSpinner color="primary" />
      </div>
    )
  }

  if (error) {
    return (
      <CCard className="mb-4">
        <CCardBody>
          <div className="text-center text-danger">
            {error}
          </div>
        </CCardBody>
      </CCard>
    )
  }

  const { workers, pets, appointments, inventory } = data

  const totalPatients = pets.length
  const confirmedAppointments = appointments.filter(apt => apt.status === 'Confirmada').length
  const inProcessAppointments = appointments.filter(apt => apt.status === 'En Proceso').length
  const pendingAppointments = appointments.filter(apt => apt.status === 'Pendiente').length
  const totalInventory = inventory.reduce((acc, item) => acc + item.quantity, 0)

  const progressExample = [
    {
      title: 'Total Pacientes',
      value: totalPatients,
      percent: totalPatients > 0 ? 100 : 0,
      color: 'success',
    },
    {
      title: 'Citas Confirmadas',
      value: confirmedAppointments,
      percent: appointments.length > 0 ? (confirmedAppointments / appointments.length) * 100 : 0,
      color: 'info',
    },
    {
      title: 'Citas En Proceso',
      value: inProcessAppointments,
      percent: appointments.length > 0 ? (inProcessAppointments / appointments.length) * 100 : 0,
      color: 'warning',
    },
    {
      title: 'Citas Pendientes',
      value: pendingAppointments,
      percent: appointments.length > 0 ? (pendingAppointments / appointments.length) * 100 : 0,
      color: 'danger',
    },
  ]

  const dogCount = pets.filter(pet => pet.species.toLowerCase() === 'perro').length
  const catCount = pets.filter(pet => pet.species.toLowerCase() === 'gato').length
  const otherCount = pets.filter(pet => !['perro', 'gato'].includes(pet.species.toLowerCase())).length

  const progressGroupExample2 = [
    { title: 'Perros', icon: cilDog, value: dogCount, percent: totalPatients > 0 ? (dogCount / totalPatients) * 100 : 0 },
    { title: 'Gatos', icon: cilCat, value: catCount, percent: totalPatients > 0 ? (catCount / totalPatients) * 100 : 0 },
    { title: 'Otros', icon: cilMedicalCross, value: otherCount, percent: totalPatients > 0 ? (otherCount / totalPatients) * 100 : 0 },
  ]

  const appointmentTypes = appointments.reduce((acc, apt) => {
    if (!acc[apt.type]) {
      acc[apt.type] = { count: 0, total: appointments.length }
    }
    acc[apt.type].count++
    return acc
  }, {})

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Actividad de la Clínica
              </h4>
              <div className="small text-body-secondary">Resumen de actividades</div>
            </CCol>
          </CRow>
          <MainChart appointments={appointments} />
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            {progressExample.map((item, index) => (
              <CCol
                className="mb-sm-2 mb-0"
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold">
                  {item.value} ({item.percent.toFixed(1)}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Estadísticas de la Clínica</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">Total Veterinarios</div>
                        <div className="fs-5 fw-semibold">{workers.length}</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Total Pacientes
                        </div>
                        <div className="fs-5 fw-semibold">{totalPatients}</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-body-secondary small">({item.percent.toFixed(1)}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Citas Totales</div>
                        <div className="fs-5 fw-semibold">{appointments.length}</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Citas Confirmadas</div>
                        <div className="fs-5 fw-semibold">{confirmedAppointments}</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {Object.entries(appointmentTypes).map(([type, data], index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={cilMedicalCross} size="lg" />
                        <span>{type}</span>
                        <span className="ms-auto fw-semibold">
                          {data.count}{' '}
                          <span className="text-body-secondary small">
                            ({((data.count / data.total) * 100).toFixed(1)}%)
                          </span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={(data.count / data.total) * 100} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard