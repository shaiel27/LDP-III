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
      alert('Passwords do not match')
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
        throw new Error('Registration failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Registration failed. Please try again.')
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
                  <h1 className="mb-4 text-center">Register</h1>
                  <p className="text-medium-emphasis text-center mb-4">Create your account</p>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3 ">
                        <CInputGroupText className='bg-distortion' >
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Full Name"
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
                          placeholder="Email"
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
                          placeholder="Password"
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
                          placeholder="Repeat password"
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
                          placeholder="Phone"
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
                          placeholder="Country"
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
                          placeholder="Address"
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
                          placeholder="Birth Date"
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
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilBriefcase} />
                        </CInputGroupText>
                        <CFormInput
                        className='bg-distortion'
                          placeholder="Occupation"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilLanguage} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Preferred Language"
                          name="preferredLanguage"
                          value={formData.preferredLanguage}
                          onChange={handleChange}
                          className='bg-distortion'
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <h5 className="mt-4 mb-3">Emergency Contact</h5>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          className='bg-distortion'
                          placeholder="Emergency Contact Name"
                          name="emergencyContact.name"
                          value={formData.emergencyContact.name}
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilPeople} />
                        </CInputGroupText>
                        <CFormInput
                          className='bg-distortion'
                          placeholder="Emergency Contact Relationship"
                          name="emergencyContact.relationship"
                          value={formData.emergencyContact.relationship}
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-4">
                        <CInputGroupText className='bg-distortion'>
                          <CIcon icon={cilPhone} />
                        </CInputGroupText>
                        <CFormInput
                          className='bg-distortion'
                          placeholder="Emergency Contact Phone"
                          name="emergencyContact.phone"
                          value={formData.emergencyContact.phone}
                          onChange={handleChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs={12}>
                      <div className="d-grid">
                        <CButton color="success" type="submit">Create Account</CButton>
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