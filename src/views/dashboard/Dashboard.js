import React from 'react'
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
  const progressExample = [
    { title: 'Consultas', value: '293 Mascotas', percent: 40, color: 'success' },
    { title: 'Vacunaciones', value: '123 Mascotas', percent: 20, color: 'info' },
    { title: 'Cirugías', value: '78 Procedimientos', percent: 60, color: 'warning' },
    { title: 'Nuevos Pacientes', value: '45 Mascotas', percent: 80, color: 'danger' },
    { title: 'Citas Agendadas', value: 'Promedio Diario', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Lunes', value1: 34, value2: 78 },
    { title: 'Martes', value1: 56, value2: 94 },
    { title: 'Miércoles', value1: 12, value2: 67 },
    { title: 'Jueves', value1: 43, value2: 91 },
    { title: 'Viernes', value1: 22, value2: 73 },
    { title: 'Sábado', value1: 53, value2: 82 },
    { title: 'Domingo', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Perros', icon: cilDog, value: 53 },
    { title: 'Gatos', icon: cilCat, value: 43 },
    { title: 'Otros', icon: cilMedicalCross, value: 4 },
  ]

  const progressGroupExample3 = [
    { title: 'Consultas Generales', icon: cilMedicalCross, percent: 56, value: '191' },
    { title: 'Vacunaciones', icon: cilMedicalCross, percent: 15, value: '51' },
    { title: 'Cirugías', icon: cilMedicalCross, percent: 11, value: '37' },
    { title: 'Emergencias', icon: cilMedicalCross, percent: 8, value: '27' },
  ]

  return (
    <>
      {/* <WidgetsDropdown className="mb-4" /> */}
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Actividad de la Clínica
              </h4>
              <div className="small text-body-secondary">Enero - Julio 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Día', 'Mes', 'Año'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Mes'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart />
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
                  {item.value} ({item.percent}%)
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
                        <div className="text-body-secondary text-truncate small">Nuevos Pacientes</div>
                        <div className="fs-5 fw-semibold">123</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Pacientes Recurrentes
                        </div>
                        <div className="fs-5 fw-semibold">643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Citas Totales</div>
                        <div className="fs-5 fw-semibold">786</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Vacunaciones</div>
                        <div className="fs-5 fw-semibold">491</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-body-secondary small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
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