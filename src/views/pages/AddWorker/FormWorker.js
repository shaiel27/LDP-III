import React, { useState } from 'react';
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
} from '@coreui/react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    specialty: '',
    address: '',
    avatar: '',
    country: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    for (const field in formData) {
      if (!formData[field]) {
        alert(`El campo ${field} es obligatorio.`);
        return;
      }
    }

    // Formatear los datos para la API
    const newWorker = {
      avatar: {
        src: formData.avatar,
        status: 'success',
      },
      user: {
        name: `${formData.name} ${formData.lastName}`,
        new: true,
        registered: new Date().toISOString().split('T')[0],
        email: formData.email,
        phone: formData.phone,
        birthDate: formData.birthDate,
        address: formData.address,
      },
      country: {
        name: formData.country,
        flag: `cif${formData.country.slice(0, 2).toUpperCase()}`, // Generar un código de bandera dinámico.
      },
      usage: {
        value: 0,
        period: '',
        color: 'info',
      },
      payment: {
        name: formData.specialty,
        icon: 'cibCcMastercard', // Ajustar ícono según preferencia.
      },
      activity: 'Recientemente añadido',
      stats: {
        patientsSeen: 0,
        surgeriesPerformed: 0,
        vaccinationsGiven: 0,
        emergencyCases: 0,
        clientSatisfaction: 'N/A',
        upcomingAppointments: 0,
      },
      id: Date.now().toString(),
    };

    try {
      const response = await fetch('http://localhost:3004/workers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorker),
      });

      if (response.ok) {
        alert('Trabajador registrado con éxito.');
        setFormData({
          name: '',
          lastName: '',
          email: '',
          phone: '',
          birthDate: '',
          specialty: '',
          address: '',
          avatar: '',
          country: '',
        });
      } else {
        alert('Error al registrar el trabajador.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectarse al servidor.');
    }
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Registro de Trabajador de Veterinaria</strong>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="name">Nombre</CFormLabel>
              <CFormInput
                id="name"
                placeholder="Ingrese el nombre"
                value={formData.name}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="lastName">Apellido</CFormLabel>
              <CFormInput
                id="lastName"
                placeholder="Ingrese el apellido"
                value={formData.lastName}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="email">Correo Electrónico</CFormLabel>
              <CFormInput
                type="email"
                id="email"
                placeholder="nombre@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="phone">Número de Teléfono</CFormLabel>
              <CFormInput
                id="phone"
                placeholder="Ingrese el número de teléfono"
                value={formData.phone}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="birthDate">Fecha de Nacimiento</CFormLabel>
              <CFormInput
                type="date"
                id="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="specialty">Especialidad</CFormLabel>
              <CFormSelect
                id="specialty"
                value={formData.specialty}
                onChange={handleChange}
              >
                <option value="">Seleccione una especialidad</option>
                <option value="general">Veterinario General</option>
                <option value="surgery">Cirujano Veterinario</option>
                <option value="dermatology">Dermatólogo Veterinario</option>
                <option value="nutrition">Nutricionista Veterinario</option>
                <option value="groomer">Personal de Baños Veterinarios</option>
                <option value="stylist">Estilista Veterinario</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="address">Dirección</CFormLabel>
              <CFormInput
                id="address"
                placeholder="Ingrese la dirección"
                value={formData.address}
                onChange={handleChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="country">País</CFormLabel>
              <CFormInput
                id="country"
                placeholder="Ingrese el país"
                value={formData.country}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="avatar">Foto Personal</CFormLabel>
              <CFormInput
                id="avatar"
                placeholder="URL de la foto"
                value={formData.avatar}
                onChange={handleChange}
              />
            </CCol>
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
  );
}
