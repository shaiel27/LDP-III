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

export default function FormularioTrabajador() {
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
      occupation: 'Veterinario',
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
    activity: 'Recientemente añadido',
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
        registered: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
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
        period: `${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}`,
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
        setSuccess('Trabajador registrado exitosamente')
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
            occupation: 'Veterinario',
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
          activity: 'Recientemente añadido',
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
        setError(errorData.message || 'Error al registrar el trabajador')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error al conectar con el servidor')
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Registro de Trabajador Veterinario</strong>
      </CCardHeader>
      <CCardBody>
        {error && <CAlert color="danger">{error}</CAlert>}
        {success && <CAlert color="success">{success}</CAlert>}
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="user.name">Nombre Completo</CFormLabel>
              <CFormInput
                id="user.name"
                placeholder="Ingrese nombre completo"
                value={formData.user.name}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="user.email">Correo Electrónico</CFormLabel>
              <CFormInput
                type="email"
                id="user.email"
                placeholder="nombre@ejemplo.com"
                value={formData.user.email}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="user.password">Contraseña</CFormLabel>
              <CFormInput
                type="password"
                id="user.password"
                placeholder="Ingrese contraseña"
                value={formData.user.password}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="user.phone">Número de Teléfono</CFormLabel>
              <CFormInput
                id="user.phone"
                placeholder="Ingrese número de teléfono"
                value={formData.user.phone}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="user.birthDate">Fecha de Nacimiento</CFormLabel>
              <CFormInput
                type="date"
                id="user.birthDate"
                value={formData.user.birthDate}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="user.address">Dirección</CFormLabel>
              <CFormInput
                id="user.address"
                placeholder="Ingrese dirección"
                value={formData.user.address}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={4}>
              <CFormLabel htmlFor="country">País</CFormLabel>
              <CFormInput
                id="country"
                placeholder="Ingrese país"
                value={formData.country.name}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="user.gender">Género</CFormLabel>
              <CFormSelect
                id="user.gender"
                value={formData.user.gender}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione género</option>
                <option value="Male">Masculino</option>
                <option value="Female">Femenino</option>
                <option value="Other">Otro</option>
              </CFormSelect>
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="user.preferredLanguage">Idioma Preferido</CFormLabel>
              <CFormInput
                id="user.preferredLanguage"
                placeholder="Ingrese idioma preferido"
                value={formData.user.preferredLanguage}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={4}>
              <CFormLabel htmlFor="emergencyContact.name">Nombre del Contacto de Emergencia</CFormLabel>
              <CFormInput
                id="emergencyContact.name"
                placeholder="Ingrese nombre del contacto de emergencia"
                value={formData.user.emergencyContact.name}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="emergencyContact.relationship">Relación con el Contacto de Emergencia</CFormLabel>
              <CFormInput
                id="emergencyContact.relationship"
                placeholder="Ingrese relación"
                value={formData.user.emergencyContact.relationship}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="emergencyContact.phone">Teléfono del Contacto de Emergencia</CFormLabel>
              <CFormInput
                id="emergencyContact.phone"
                placeholder="Ingrese teléfono del contacto de emergencia"
                value={formData.user.emergencyContact.phone}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="avatar">Foto de Perfil</CFormLabel>
              <CFormInput
                type="file"
                id="avatar"
                onChange={handleChange}
                accept="image/*"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="specialty">Especialidad</CFormLabel>
              <CFormSelect
                id="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una especialidad</option>
                <option value="General Practice">Práctica General</option>
                <option value="Surgery">Cirugía</option>
                <option value="Dermatology">Dermatología</option>
                <option value="Nutrition">Nutrición</option>
                <option value="Groomer">Peluquería Canina</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="licenseNumber">Número de Licencia</CFormLabel>
              <CFormInput
                id="licenseNumber"
                placeholder="Ingrese número de licencia"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="yearsOfExperience">Años de Experiencia</CFormLabel>
              <CFormInput
                type="number"
                id="yearsOfExperience"
                placeholder="Ingrese años de experiencia"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="education">Educación</CFormLabel>
              <CFormTextarea
                id="education"
                placeholder="Ingrese educación (Título, Institución, Año) - Uno por línea"
                value={formData.education}
                onChange={handleChange}
                rows={3}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="certifications">Certificaciones</CFormLabel>
              <CFormTextarea
                id="certifications"
                placeholder="Ingrese certificaciones - Una por línea"
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
                <CFormLabel htmlFor={`schedule.${day}`}>{day === 'monday' ? 'Lunes' : day === 'tuesday' ? 'Martes' : day === 'wednesday' ? 'Miércoles' : day === 'thursday' ? 'Jueves' : day === 'friday' ? 'Viernes' : day === 'saturday' ? 'Sábado' : 'Domingo'}</CFormLabel>
                <CFormInput
                  id={`schedule.${day}`}
                  placeholder="ej. 9:00 AM - 5:00 PM"
                  value={formData.schedule[day]}
                  onChange={handleChange}
                />
              </CCol>
            ))}
          </CRow>
          <CRow>
            <CCol>
              <CButton color="primary" type="submit">
                Registrar Trabajador
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

