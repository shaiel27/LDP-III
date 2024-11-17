import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
  CRow,
  CFormTextarea,
  CAlert,
} from '@coreui/react'

export default function FormWorker() {
  const [formData, setFormData] = useState({
    id: '',
    avatar: {
      src: '',
      status: 'success'
    },
    user: {
      name: '',
      new: true,
      registered: '',
      email: '',
      password: '',
      phone: '',
      birthDate: '',
      address: '',
      country: '',
      gender: '',
      occupation: 'Veterinarian',
      preferredLanguage: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      },
      userType: 'employee',
      profilePicture: '/placeholder.svg?height=150&width=150',
      joinDate: ''
    },
    country: {
      name: '',
      flag: ''
    },
    usage: {
      value: 50,
      period: '',
      color: 'success'
    },
    payment: {
      name: '',
      icon: 'cibCcMastercard'
    },
    activity: 'Recently added',
    stats: {
      patientsSeen: 0,
      surgeriesPerformed: 0,
      vaccinationsGiven: 0,
      emergencyCases: 0,
      clientSatisfaction: '0%',
      upcomingAppointments: 0
    },
    specialty: '',
    licenseNumber: '',
    yearsOfExperience: 0,
    education: [],
    certifications: [],
    schedule: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    }
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { id, value, files } = e.target
    
    if (id.startsWith('user.')) {
      const field = id.split('.')[1]
      setFormData(prev => ({
        ...prev,
        user: {
          ...prev.user,
          [field]: value
        }
      }))
    } else if (id.startsWith('emergencyContact.')) {
      const field = id.split('.')[1]
      setFormData(prev => ({
        ...prev,
        user: {
          ...prev.user,
          emergencyContact: {
            ...prev.user.emergencyContact,
            [field]: value
          }
        }
      }))
    } else if (id.startsWith('schedule.')) {
      const day = id.split('.')[1]
      setFormData(prev => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [day]: value
        }
      }))
    } else if (id === 'avatar') {
      if (files?.[0]) {
        const file = files[0]
        setFormData(prev => ({
          ...prev,
          avatar: {
            src: file.name,
            status: 'success'
          }
        }))
      }
    } else if (id === 'country') {
      setFormData(prev => ({
        ...prev,
        country: {
          name: value,
          flag: `cif${value.slice(0, 2).toUpperCase()}`
        },
        user: {
          ...prev.user,
          country: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [id]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Prepare the worker data
    const workerData = {
      ...formData,
      id: Date.now().toString().slice(-4),
      user: {
        ...formData.user,
        new: true,
        registered: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        joinDate: new Date().toISOString().split('T')[0]
      },
      education: formData.education.split('\n').map(edu => {
        const [degree, institution, year] = edu.split(',').map(item => item.trim())
        return { degree, institution, year: parseInt(year) }
      }),
      certifications: formData.certifications.split('\n').map(cert => cert.trim()),
      payment: {
        name: formData.specialty,
        icon: 'cibCcMastercard'
      },
      usage: {
        value: 50,
        period: `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        color: 'success'
      }
    }

    try {
      const response = await fetch('http://localhost:3004/workers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workerData)
      })

      if (response.ok) {
        setSuccess('Worker registered successfully')
        // Reset form
        setFormData({
          id: '',
          avatar: {
            src: '',
            status: 'success'
          },
          user: {
            name: '',
            new: true,
            registered: '',
            email: '',
            password: '',
            phone: '',
            birthDate: '',
            address: '',
            country: '',
            gender: '',
            occupation: 'Veterinarian',
            preferredLanguage: '',
            emergencyContact: {
              name: '',
              relationship: '',
              phone: ''
            },
            userType: 'employee',
            profilePicture: '/placeholder.svg?height=150&width=150',
            joinDate: ''
          },
          country: {
            name: '',
            flag: ''
          },
          usage: {
            value: 50,
            period: '',
            color: 'success'
          },
          payment: {
            name: '',
            icon: 'cibCcMastercard'
          },
          activity: 'Recently added',
          stats: {
            patientsSeen: 0,
            surgeriesPerformed: 0,
            vaccinationsGiven: 0,
            emergencyCases: 0,
            clientSatisfaction: '0%',
            upcomingAppointments: 0
          },
          specialty: '',
          licenseNumber: '',
          yearsOfExperience: 0,
          education: [],
          certifications: [],
          schedule: {
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: ''
          }
        })
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to register worker')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error connecting to server')
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Veterinary Worker Registration</strong>
      </CCardHeader>
      <CCardBody>
        {error && <CAlert color="danger">{error}</CAlert>}
        {success && <CAlert color="success">{success}</CAlert>}
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="user.name">Full Name</CFormLabel>
              <CFormInput
                id="user.name"
                placeholder="Enter full name"
                value={formData.user.name}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="user.email">Email</CFormLabel>
              <CFormInput
                type="email"
                id="user.email"
                placeholder="name@example.com"
                value={formData.user.email}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="user.password">Password</CFormLabel>
              <CFormInput
                type="password"
                id="user.password"
                placeholder="Enter password"
                value={formData.user.password}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="user.phone">Phone Number</CFormLabel>
              <CFormInput
                id="user.phone"
                placeholder="Enter phone number"
                value={formData.user.phone}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="user.birthDate">Birth Date</CFormLabel>
              <CFormInput
                type="date"
                id="user.birthDate"
                value={formData.user.birthDate}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="user.address">Address</CFormLabel>
              <CFormInput
                id="user.address"
                placeholder="Enter address"
                value={formData.user.address}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={4}>
              <CFormLabel htmlFor="country">Country</CFormLabel>
              <CFormInput
                id="country"
                placeholder="Enter country"
                value={formData.country.name}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="user.gender">Gender</CFormLabel>
              <CFormSelect
                id="user.gender"
                value={formData.user.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="user.preferredLanguage">Preferred Language</CFormLabel>
              <CFormInput
                id="user.preferredLanguage"
                placeholder="Enter preferred language"
                value={formData.user.preferredLanguage}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={4}>
              <CFormLabel htmlFor="emergencyContact.name">Emergency Contact Name</CFormLabel>
              <CFormInput
                id="emergencyContact.name"
                placeholder="Enter emergency contact name"
                value={formData.user.emergencyContact.name}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="emergencyContact.relationship">Emergency Contact Relationship</CFormLabel>
              <CFormInput
                id="emergencyContact.relationship"
                placeholder="Enter relationship"
                value={formData.user.emergencyContact.relationship}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="emergencyContact.phone">Emergency Contact Phone</CFormLabel>
              <CFormInput
                id="emergencyContact.phone"
                placeholder="Enter emergency contact phone"
                value={formData.user.emergencyContact.phone}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="avatar">Profile Picture</CFormLabel>
              <CFormInput
                type="file"
                id="avatar"
                onChange={handleChange}
                accept="image/*"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="specialty">Specialty</CFormLabel>
              <CFormSelect
                id="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
              >
                <option value="">Select a specialty</option>
                <option value="General Practice">General Practice</option>
                <option value="Surgery">Surgery</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Groomer">Groomer</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="licenseNumber">License Number</CFormLabel>
              <CFormInput
                id="licenseNumber"
                placeholder="Enter license number"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="yearsOfExperience">Years of Experience</CFormLabel>
              <CFormInput
                type="number"
                id="yearsOfExperience"
                placeholder="Enter years of experience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="education">Education</CFormLabel>
              <CFormTextarea
                id="education"
                placeholder="Enter education (Degree, Institution, Year) - One per line"
                value={formData.education}
                onChange={handleChange}
                rows={3}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="certifications">Certifications</CFormLabel>
              <CFormTextarea
                id="certifications"
                placeholder="Enter certifications - One per line"
                value={formData.certifications}
                onChange={handleChange}
                rows={3}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
              <CCol md={3} key={day}>
                <CFormLabel htmlFor={`schedule.${day}`}>{day.charAt(0).toUpperCase() + day.slice(1)}</CFormLabel>
                <CFormInput
                  id={`schedule.${day}`}
                  placeholder="e.g. 9:00 AM - 5:00 PM"
                  value={formData.schedule[day]}
                  onChange={handleChange}
                />
              </CCol>
            ))}
          </CRow>
          <CRow>
            <CCol>
              <CButton color="primary" type="submit">
                Register Worker
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}