import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import {
  cilUser,
  cilEnvelopeClosed,
  cilPhone,
  cilLocationPin,
  cilPencil,
  cilLockLocked,
  cilPeople,
  cilAccountLogout,
} from "@coreui/icons"

export default function Profile() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [activeTab, setActiveTab] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:3001/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()
        if (response.ok) {
          setUser(data.user)
          setEditedUser(data.user)
        } else {
          setError("Error al cargar el perfil. Por favor, intente de nuevo.")
        }
      } catch (error) {
        setError("Error al cargar el perfil. Por favor, intente de nuevo.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedUser(user)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedUser({ ...editedUser, [name]: value })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const token = localStorage.getItem("token")

      const response = await fetch("http://localhost:3001/api/v1/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: editedUser.first_name,
          last_name: editedUser.last_name,
          telephone_number: editedUser.telephone_number,
          location: editedUser.location,
          security_word: editedUser.security_word,
        }),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser.user)
        setIsEditing(false)
        setSuccessMessage("Profile updated successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      setError("An error occurred while updating your profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:3001/api/v1/users/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        localStorage.removeItem("token")
        localStorage.removeItem("userType")
        navigate("/login")
      } else {
        throw new Error("Failed to logout")
      }
    } catch (error) {
      console.error("Error logging out:", error)
    }
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
    <CCard className="min-vh-100">
      <CContainer fluid className="p-0">
        <div className="position-relative mb-4">
          <div
            className="profile-cover"
            style={{
              height: "300px",
              backgroundColor: "#1e4d3b",
              backgroundImage: "linear-gradient(45deg, #1e4d3b 0%, #2c7659 100%)",
            }}
          />
          <CContainer>
            <div className="position-relative">
              <CImage
                rounded
                src={user.profilePicture || "/placeholder.svg?height=150&width=150"}
                width={150}
                height={150}
                className="position-absolute profile-image"
                style={{
                  bottom: "-75px",
                  left: "15px",
                  border: "4px solid #fff",
                  backgroundColor: "#fff",
                }}
                alt="Profile"
              />
              {!isEditing && (
                <div className="position-absolute" style={{ bottom: "-60px", right: "15px" }}>
                  <CButton color="secondary" variant="ghost" className="me-2" onClick={handleEdit}>
                    <CIcon icon={cilPencil} className="me-2" />
                    Editar Perfil
                  </CButton>
                  <CButton color="secondary" variant="ghost" onClick={handleLogout}>
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
              <h2 className="mb-4">{`${user.first_name} ${user.last_name}`}</h2>
              <CBadge color="primary" className="me-2">
                {user.permission_name}
              </CBadge>
            </CCol>
          </CRow>

          <CNav variant="tabs" className="mt-4">
            <CNavItem>
              <CNavLink active={activeTab === 1} onClick={() => setActiveTab(1)}>
                Informacion de Perfil
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink active={activeTab === 2} onClick={() => setActiveTab(2)}>
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
                              name="first_name"
                              value={editedUser.first_name}
                              onChange={handleChange}
                              placeholder="First Name"
                              required
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilUser} />
                            </CInputGroupText>
                            <CFormInput
                              name="last_name"
                              value={editedUser.last_name}
                              onChange={handleChange}
                              placeholder="Last Name"
                              required
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>

                      <CRow>
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
                              disabled
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol md={6}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilPhone} />
                            </CInputGroupText>
                            <CFormInput
                              name="telephone_number"
                              value={editedUser.telephone_number}
                              onChange={handleChange}
                              placeholder="Phone"
                              required
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol md={12}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilLocationPin} />
                            </CInputGroupText>
                            <CFormInput
                              name="location"
                              value={editedUser.location}
                              onChange={handleChange}
                              placeholder="Location"
                              required
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol md={12}>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon icon={cilLockLocked} />
                            </CInputGroupText>
                            <CFormInput
                              name="security_word"
                              value={editedUser.security_word}
                              onChange={handleChange}
                              placeholder="Security Word"
                              required
                            />
                          </CInputGroup>
                        </CCol>
                      </CRow>

                      <CRow className="mt-4">
                        <CCol xs={6}>
                          <CButton color="primary" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
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
                      <CCol sm={9}>{`${user.first_name} ${user.last_name}`}</CCol>
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
                      <CCol sm={9}>{user.telephone_number}</CCol>
                    </CRow>

                    <CRow className="mb-4">
                      <CCol sm={3} className="text-secondary">
                        <CIcon icon={cilLocationPin} className="me-2" />
                        Ubicación
                      </CCol>
                      <CCol sm={9}>{user.location}</CCol>
                    </CRow>

                    <CRow className="mb-4">
                      <CCol sm={3} className="text-secondary">
                        <CIcon icon={cilPeople} className="me-2" />
                        Tipo de Usuario
                      </CCol>
                      <CCol sm={9}>
                        <CBadge color="primary">{user.permission_name}</CBadge>
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

