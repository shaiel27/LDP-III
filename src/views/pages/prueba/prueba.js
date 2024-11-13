import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormText,
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'

export default function Prueba() {
  const [email, setEmail] = useState('')
  const [emailList, setEmailList] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setEmailList([...emailList, email])
      setEmail('')
    }
  }

  return (
    <CContainer>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>info</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CFormLabel htmlFor="exampleFormControlInput1">Email address</CFormLabel>
            <CFormInput
              type="email"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <CFormText as="span" id="exampleFormControlInputHelpInline">
              Must be 8-20 characters long.
            </CFormText>
            <br />
            <CButton type="submit" color="primary" className="mt-3">
              Enviar
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {emailList.map((email, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{email}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}