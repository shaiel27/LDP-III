'use client'

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CImage,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CSpinner,
  CAlert,
  CBadge,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilEnvelopeClosed,
  cilPhone,
  cilLocationPin,
  cilPencil,
  cilLockLocked,
  cilCalendar,
  cilGlobeAlt,
  cilBriefcase,
  cilPeople,
  cilLanguage,
  cilAccountLogout,
} from '@coreui/icons'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [activeTab, setActiveTab] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token')
      const userType = localStorage.getItem('userType')
      if (!token) {
        navigate('/login')
        return
      }

      try {
        const userId = token.split('-')[2]
        let response

        if (userType === 'worker') {
          response = await fetch(`http://localhost:3004/workers/${userId}`)
        } else {
          response = await fetch(`http://localhost:3004/users/${userId}`)
        }

        if (response.ok) {
          let userData = await response.json()
          if (userType === 'worker') {
            userData = { ...userData.user, id: userData.id, userType: 'worker' }
          }
          setUser(userData)
          setEditedUser(userData)
        } else {
          throw new Error('Failed to fetch user profile')
        }
      } catch (error) {
        setError('An error occurred while fetching your profile. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [navigate])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedUser(user)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setEditedUser({
        ...editedUser,
        [parent]: { ...editedUser[parent], [child]: value }
      })
    } else {
      setEditedUser({ ...editedUser, [name]: value })
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const userType = localStorage.getItem('userType')
      let response

      if (userType === 'worker') {
        const workerData = await fetch(`http://localhost:3004/workers/${user.id}`).then(res => res.json())
        const updatedWorkerData = { ...workerData, user: editedUser }
        response = await fetch(`http://localhost:3004/workers/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedWorkerData),
        })
      } else {
        response = await fetch(`http://localhost:3004/users/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedUser),
        })
      }

      if (response.ok) {
        setUser(editedUser)
        setIsEditing(false)
        setSuccessMessage('Profile updated successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      setError('An error occurred while updating your profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    navigate('/login')
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <CSpinner color="primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <CCard className=" min-vh-100">
      <CContainer fluid className="p-0">
        <div className="position-relative mb-4">
          <div 
            className="profile-cover" 
            style={{ 
              height: '300px', 
              backgroundColor: '#1e4d3b',
              backgroundImage: 'linear-gradient(45deg, #1e4d3b 0%, #2c7659 100%)'
            }}
          />
          <CContainer>
            <div className="position-relative">
              <CImage
                rounded
                src={user.profilePicture || '/placeholder.svg?height=150&width=150'}
                width={150}
                height={150}
                className="position-absolute profile-image"
                style={{ 
                  bottom: '-75px', 
                  left: '15px', 
                  border: '4px solid #fff',
                  backgroundColor: '#fff' 
                }}
                alt="Profile"
              />
              {!isEditing && (
                <div className="position-absolute" style={{ bottom: '-60px', right: '15px' }}>
                  <CButton
                    color="secondary"
                    variant="ghost"
                    className="me-2"
                    onClick={handleEdit}
                  >
                    <CIcon icon={cilPencil} className="me-2" />
                    Editar Perfil
                  </CButton>
                  <CButton
                    color="secondary"
                    variant="ghost"
                    onClick={handleLogout}
                  >
                    <CIcon icon={cilAccountLogout} className="me-2" />
                    Cerrar Sesion
                  </CButton>
                </div>
              )}
            </div>
          </CContainer>
        </div>

        <CContainer className="mt-5 pt-4">
          {successMessage && <CAlert color="success">{successMessage}</CAlert>}
          
          <CRow>
            <CCol xs={12}>
              <h2 className="mb-4">{user.name}</h2>
              <CBadge color="primary" className="me-2">{user.userType}</CBadge>
            </CCol>
          </CRow>

          <CNav variant="tabs" className="mt-4">
            <CNavItem>
              <CNavLink
                active={activeTab === 1}
                onClick={() => setActiveTab(1)}
              >
                Informacion de Perfil
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeTab === 2}
                onClick={() => setActiveTab(2)}
              >
                Ajustes
              </CNavLink>
            </CNavItem>
          </CNav>

          <CTabContent className="py-4">
            <CTabPane visible={activeTab === 1}>
              {isEditing ? (
                <CCard>
                  <CCardBody>
                    <CForm onSubmit={(e) => e.preventDefault()}>
                      <CRow>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              name="name"
                              value={editedUser.name}
                              onChange={handleChange}
                              placeholder="Full Name"
                              required
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilEnvelopeClosed} />
                            </CInputGroupText>
                            <CFormInput
                              type="email"
                              name="email"
                              value={editedUser.email}
                              onChange={handleChange}
                              placeholder="Email"
                              required
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilPhone} />
                            </CInputGroupText>
                            <CFormInput
                              name="phone"
                              value={editedUser.phone}
                              onChange={handleChange}
                              placeholder="Phone"
                              required
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormInput
                              name="address"
                              value={editedUser.address}
                              onChange={handleChange}
                              placeholder="Address"
                              required
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilGlobeAlt} />
                            </CInputGroupText>
                            <CFormInput
                              name="country"
                              value={editedUser.country}
                              onChange={handleChange}
                              placeholder="Country"
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilCalendar} />
                            </CInputGroupText>
                            <CFormInput
                              type="date"
                              name="birthDate"
                              value={editedUser.birthDate}
                              onChange={handleChange}
                              placeholder="Birth Date"
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormSelect
                              name="gender"
                              value={editedUser.gender}
                              onChange={handleChange}
                            >
                              <option value="">Seleccionar Genero</option>
                              <option value="Male">Masculino</option>
                              <option value="Female">Femenino</option>
                              <option value="Other">Otro</option>
                            </CFormSelect>
                          </CInputGroup>
                        </CCol>
                      </CRow>
                      <CRow className="mt-4">
                        <CCol xs={6}>
                          <CButton color="primary" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Changes'}
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-end">
                          <CButton color="secondary" variant="ghost" onClick={handleCancel}>
                            Cancelar
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              ) : (
                <CCard>
                  <CCardBody>
                    <CRow className="mb-4">
                      <CCol sm={3} className="text-secondary">
                        <CIcon icon={cilUser} className="me-2" />
                        Nombre
                      </CCol>
                      <CCol sm={9}>{user.name}</CCol>
                    </CRow>

                    <CRow className="mb-4">
                      <CCol sm={3} className="text-secondary">
                        <CIcon icon={cilEnvelopeClosed} className="me-2" />
                        Correo
                      </CCol>
                      <CCol sm={9}>{user.email}</CCol>
                    </CRow>

                    <CRow className="mb-4">
                      <CCol sm={3} className="text-secondary">
                        <CIcon icon={cilPhone} className="me-2" />
                        Telefono
                      </CCol>
                      <CCol sm={9}>{user.phone}</CCol>
                    </CRow>

                    <CRow className="mb-4">
                      <CCol sm={3} className="text-secondary">
                        <CIcon icon={cilLocationPin} className="me-2" />
                        Dirección
                      </CCol>
                      <CCol sm={9}>{user.address}</CCol>
                    </CRow>

                    <CRow className="mb-4">
                      <CCol sm={3} className="text-secondary">
                        <CIcon icon={cilGlobeAlt} className="me-2" />
                        Pais
                      </CCol>
                      <CCol sm={9}>{user.country}</CCol>
                    </CRow>

                    <CRow className="mb-4">
                      <CCol sm={3} className="text-secondary">
                        <CIcon icon={cilCalendar} className="me-2" />
                        Fecha de Nacimiento
                      </CCol>
                      <CCol sm={9}>{user.birthDate}</CCol>
                    </CRow>

                    <CRow className="mb-4">
                      <CCol sm={3} className="text-secondary">
                        <CIcon icon={cilUser} className="me-2" />
                        Genero
                      </CCol>
                      <CCol sm={9}>{user.gender}</CCol>
                    </CRow>

                    <CRow className="mb-4">
                      <CCol sm={3} className="text-secondary">
                        <CIcon icon={cilPeople} className="me-2" />
                        Tipo de Usuario
                      </CCol>
                      <CCol sm={9}>
                        <CBadge color="primary">{user.userType}</CBadge>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              )}
            </CTabPane>

            <CTabPane visible={activeTab === 2}>
              <CCard>
                <CCardBody>
                  <h4 className="mb-4">Ajustes de la cuenta</h4>
                  <CRow className="mb-4">
                    <CCol sm={3} className="text-secondary">
                      <CIcon icon={cilLockLocked} className="me-2" />
                      Contraseña
                    </CCol>
                    <CCol sm={9}>
                      <CButton color="secondary" variant="outline">
                        Cambiar Contraseña
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CTabPane>
          </CTabContent>
        </CContainer>
      </CContainer>
    </CCard>
  )
}