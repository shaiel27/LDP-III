import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilLockLocked,
  cilEnvelopeClosed,
  cilPhone,
  cilLocationPin,
  cilCalendar,
  cilGlobeAlt,
  cilBriefcase,
  cilLanguage,
  cilPeople,
} from '@coreui/icons'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    country: '',
    birthDate: '',
    gender: '',
    occupation: '',
    preferredLanguage: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden')
      return
    }

    try {
      const response = await fetch('http://localhost:3004/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userType: 'client',
          profilePicture: '/placeholder.svg?height=150&width=150',
          joinDate: new Date().toISOString().split('T')[0],
        }),
      })

      if (response.ok) {
        navigate('/login')
      } else {
        throw new Error('Registro fallido')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Registro fallido. Por favor, intente de nuevo.')
    }
  }

  return (
    <div className="register min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center ">
          <CCol md={12} lg={10} xl={8}>
            <CCard className="mx-4 bg-distortion">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1 className="mb-4 text-center">Registro</h1>
                  <p className="text-medium-emphasis text-center mb-4">Crea tu cuenta</p>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3 ">
                        <CInputGroupText className='bg-distortion' >
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Nombre Completo"
                          autoComplete="name"
                          name="name"
                          type='bg-distortion'
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className='bg-distortion'
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilEnvelopeClosed} />
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          placeholder="Correo Electrónico"
                          autoComplete="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className='bg-distortion'
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Contraseña"
                          autoComplete="new-password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className='bg-distortion'
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-4">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Repetir contraseña"
                          autoComplete="new-password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className='bg-distortion'
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilPhone} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Teléfono"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className='bg-distortion'
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilGlobeAlt} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="País"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className='bg-distortion'
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={12}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilLocationPin} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Dirección"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className='bg-distortion'
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bg-distortion' >
                          <CIcon icon={cilCalendar} />
                        </CInputGroupText>
                        <CFormInput
                          type="date"
                          placeholder="Fecha de Nacimiento"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleChange}
                          className='bg-distortion'
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormSelect
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className='bg-distortion'
                        >
                          <option value="">Seleccionar Género</option>
                          <option value="Male">Masculino</option>
                          <option value="Female">Femenino</option>
                          <option value="Other">Otro</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                    </CCol>
                    <CCol md={6}>
                     
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs={12}>
                      <div className="d-grid">
                        <CButton color="success" type="submit">Crear Cuenta</CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register