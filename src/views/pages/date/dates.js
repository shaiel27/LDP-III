import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CFormLabel,
  CButton,
  CAlert,
  CSpinner
} from '@coreui/react'

const AppointmentRequest = () => {
  const [pets, setPets] = useState([])
  const [workers, setWorkers] = useState([])
  const [formData, setFormData] = useState({
    petId: '',
    type: '',
    workerId: '',
    date: '',
    time: '',
    description: '',
    status: 'Pendiente'
  })
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }
        const userId = token.split('-')[2] 

        const [petsResponse, workersResponse] = await Promise.all([
          fetch(`http://localhost:3004/pets?ownerId=${userId}`),
          fetch('http://localhost:3004/workers')
        ])

        if (!petsResponse.ok || !workersResponse.ok) {
          throw new Error('Error al obtener los datos')
        }

        const [petsData, workersData] = await Promise.all([
          petsResponse.json(),
          workersResponse.json()
        ])

        setPets(petsData)
        setWorkers(workersData)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Hubo un problema al cargar los datos. Por favor, intente de nuevo.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setMessage(null)
    
    if (!formData.petId || !formData.type || !formData.date || !formData.time) {
      setMessage({ type: 'danger', content: 'Por favor, complete todos los campos requeridos.' })
      setIsLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('token')
      const userId = token.split('-')[2]
      const selectedPet = pets.find(pet => pet.id === formData.petId)
      const appointmentData = {
        ...formData,
        id: Date.now().toString(),
        pet: selectedPet.name,
        ownerId: userId,
        status: 'Pendiente'
      }

      const response = await fetch('http://localhost:3004/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      })

      if (response.ok) {
        setMessage({ type: 'success', content: 'Cita solicitada con éxito.' })
        setFormData({
          petId: '',
          type: '',
          workerId: '',
          date: '',
          time: '',
          description: '',
          status: 'Pendiente'
        })
      } else {
        throw new Error('Failed to submit appointment')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Hubo un error al solicitar la cita. Por favor, inténtelo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <CSpinner color="primary" />
      </div>
    )
  }

  if (error) {
    return <CAlert color="danger">{error}</CAlert>
  }

  return (
    <CRow>
      <CCol md={8} className="mx-auto">
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Solicita una cita</strong>
          </CCardHeader>
          <CCardBody>
            {message && (
              <CAlert color={message.type} dismissible onClose={() => setMessage(null)}>
                {message.content}
              </CAlert>
            )}
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="petId">Mascota</CFormLabel>
                  <CFormSelect id="petId" value={formData.petId} onChange={handleInputChange} required>
                    <option value="">Selecciona tu mascota</option>
                    {pets.map(pet => (
                      <option key={pet.id} value={pet.id}>{pet.name}</option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="type">Tipo de Servicio</CFormLabel>
                  <CFormSelect id="type" value={formData.type} onChange={handleInputChange} required>
                    <option value="">Selecciona un Servicio</option>
                    <option value="Consulta">Consulta</option>
                    <option value="Vacunación">Vacunación</option>
                    <option value="Cirugía">Cirugía</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="workerId">Veterinario (Opcional)</CFormLabel>
                  <CFormSelect id="workerId" value={formData.workerId} onChange={handleInputChange}>
                    <option value="">Selecciona un Veterinario</option>
                    {workers.map(worker => (
                      <option key={worker.id} value={worker.id}>{worker.user.name}</option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="date">Fecha preferida</CFormLabel>
                  <CFormInput type="date" id="date" value={formData.date} onChange={handleInputChange} required />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="time">Hora</CFormLabel>
                  <CFormInput type="time" id="time" value={formData.time} onChange={handleInputChange} required />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="description">Razón de la solicitud de tu cita</CFormLabel>
                  <CFormTextarea
                    id="description"
                    rows={3}
                    placeholder="Describe el motivo de tu solicitud"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></CFormTextarea>
                </CCol>
              </CRow>

              <CRow>
                <CCol>
                  <CButton color="primary" type="submit" className="mt-3" disabled={isLoading}>
                    {isLoading ? <CSpinner size="sm" /> : 'Hacer solicitud'}
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AppointmentRequest