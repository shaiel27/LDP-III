"use client"

import { useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CImage,
} from "@coreui/react"
import CIcon from "@coreui/icons-react"
import { cilPencil, cilTrash, cilEnvelopeClosed, cilPhone, cilCalendar, cilLocationPin, cilSearch } from "@coreui/icons"

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isUserDetailsModalVisible, setIsUserDetailsModalVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filtered = users.filter((user) => {
      return Object.keys(user).some((key) => user[key].toString().toLowerCase().includes(lowercasedFilter))
    })
    setFilteredUsers(filtered)
  }, [users, searchTerm])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:3001/api/v1/users/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (response.ok) {
        setUsers(data.users)
        setFilteredUsers(data.users)
      } else {
        console.error("Error loading data:", data.message)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const handleRowClick = (user) => {
    setSelectedUser(user)
    setIsUserDetailsModalVisible(true)
  }

  const handleEdit = (e, user) => {
    e.stopPropagation()
    setEditingUser({ ...user })
    setIsEditModalVisible(true)
  }

  const handleDelete = (e, user) => {
    e.stopPropagation()
    setEditingUser(user)
    setIsDeleteModalVisible(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3001/api/v1/users/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: editingUser.first_name,
          last_name: editingUser.last_name,
          telephone_number: editingUser.telephone_number,
          location: editingUser.location,
          security_word: editingUser.security_word,
        }),
      })
      if (response.ok) {
        setIsEditModalVisible(false)
        fetchUsers()
      } else {
        console.error("Failed to update user")
      }
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3001/api/v1/users/remove/${editingUser.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        setIsDeleteModalVisible(false)
        fetchUsers()
        if (selectedUser && selectedUser.id === editingUser.id) {
          setSelectedUser(null)
        }
      } else {
        console.error("Failed to delete user")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditingUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Gestión de Usuarios</strong>
            </CCardHeader>
            <CCardBody>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilSearch} />
                </CInputGroupText>
                <CFormInput placeholder="Buscar usuarios..." value={searchTerm} onChange={handleSearchChange} />
              </CInputGroup>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Usuario</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Tipo de Usuario</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredUsers.map((user, index) => (
                    <CTableRow key={index} onClick={() => handleRowClick(user)} style={{ cursor: "pointer" }}>
                      <CTableDataCell>
                        <div>{user.name}</div>
                        <div className="small text-body-secondary text-nowrap">Se unió: {user.joinDate}</div>
                      </CTableDataCell>
                      <CTableDataCell>{user.email}</CTableDataCell>
                      <CTableDataCell>{user.userType}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          color="primary"
                          variant="ghost"
                          size="sm"
                          className="me-2"
                          onClick={(e) => handleEdit(e, user)}
                        >
                          <CIcon icon={cilPencil} size="sm" />
                        </CButton>
                        <CButton color="danger" variant="ghost" size="sm" onClick={(e) => handleDelete(e, user)}>
                          <CIcon icon={cilTrash} size="sm" />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal visible={isUserDetailsModalVisible} onClose={() => setIsUserDetailsModalVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Detalles del Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedUser && (
            <CRow>
              <CCol md={4} className="text-center mb-3">
                <CImage
                  rounded
                  thumbnail
                  src={selectedUser.profilePicture || "/placeholder.svg?height=150&width=150"}
                  width={150}
                  height={150}
                  alt="Profile Picture"
                />
              </CCol>
              <CCol md={8}>
                <h3>{selectedUser.name}</h3>
                <p>
                  <CIcon icon={cilEnvelopeClosed} className="me-2" />
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <CIcon icon={cilPhone} className="me-2" />
                  <strong>Teléfono:</strong> {selectedUser.phone}
                </p>
                <p>
                  <strong>Tipo de Usuario:</strong> {selectedUser.userType}
                </p>
                <p>
                  <strong>País:</strong> {selectedUser.country}
                </p>
                <p>
                  <CIcon icon={cilCalendar} className="me-2" />
                  <strong>Fecha de nacimiento:</strong> {selectedUser.birthDate}
                </p>
                <p>
                  <CIcon icon={cilLocationPin} className="me-2" />
                  <strong>Dirección:</strong> {selectedUser.address}
                </p>
                <p>
                  <strong>Género:</strong> {selectedUser.gender}
                </p>
                <p>
                  <strong>Fecha de registro:</strong> {selectedUser.joinDate}
                </p>
              </CCol>
            </CRow>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsUserDetailsModalVisible(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={isEditModalVisible} onClose={() => setIsEditModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Editar Usuario</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleEditSubmit}>
            <CFormInput
              type="text"
              id="first_name"
              name="first_name"
              label="Nombre"
              value={editingUser?.first_name || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="text"
              id="last_name"
              name="last_name"
              label="Apellido"
              value={editingUser?.last_name || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="email"
              id="email"
              name="email"
              label="Email"
              value={editingUser?.email || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="tel"
              id="telephone_number"
              name="telephone_number"
              label="Teléfono"
              value={editingUser?.telephone_number || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="date"
              id="birthDate"
              name="birthDate"
              label="Fecha de nacimiento"
              value={editingUser?.birthDate || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="text"
              id="location"
              name="location"
              label="Dirección"
              value={editingUser?.location || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormSelect
              id="userType"
              name="userType"
              label="Tipo de Usuario"
              value={editingUser?.userType || ""}
              onChange={handleInputChange}
              className="mb-3"
            >
              <option value="">Seleccionar Tipo de Usuario</option>
              <option value="client">Cliente</option>
              <option value="admin">Administrador</option>
              <option value="employee">Empleado</option>
            </CFormSelect>
            <CFormInput
              type="text"
              id="country"
              name="country"
              label="País"
              value={editingUser?.country || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CFormInput
              type="text"
              id="security_word"
              name="security_word"
              label="Palabra de seguridad"
              value={editingUser?.security_word || ""}
              onChange={handleInputChange}
              className="mb-3"
            />
            <CModalFooter>
              <CButton color="secondary" onClick={() => setIsEditModalVisible(false)}>
                Cancelar
              </CButton>
              <CButton color="primary" type="submit">
                Guardar Cambios
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal visible={isDeleteModalVisible} onClose={() => setIsDeleteModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirmar Eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>¿Está seguro de que desea eliminar al usuario {editingUser?.name}?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsDeleteModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={handleDeleteConfirm}>
            Eliminar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

