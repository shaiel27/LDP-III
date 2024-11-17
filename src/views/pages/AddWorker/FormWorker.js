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
  CFormTextarea,
} from '@coreui/react';

export default function FormWorker() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    address: '',
    country: '',
    gender: '',
    occupation: 'Veterinarian',
    preferredLanguage: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    avatar: '',
    specialty: '',
    licenseNumber: '',
    yearsOfExperience: '',
    education: '',
    certifications: '',
    schedule: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id.startsWith('schedule.')) {
      const day = id.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        schedule: {
          ...prevState.schedule,
          [day]: value
        }
      }));
    } else {
      setFormData(prevState => ({ ...prevState, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields (basic validation, expand as needed)
    for (const field in formData) {
      if (typeof formData[field] === 'string' && !formData[field]) {
        alert(`The field ${field} is required.`);
        return;
      }
    }

    // Format data for API
    const newWorker = {
      id: Date.now().toString(),
      avatar: {
        src: formData.avatar,
        status: 'success',
      },
      user: {
        name: formData.name,
        new: true,
        registered: new Date().toISOString().split('T')[0],
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        birthDate: formData.birthDate,
        address: formData.address,
        country: formData.country,
        gender: formData.gender,
        occupation: formData.occupation,
        preferredLanguage: formData.preferredLanguage,
        emergencyContact: {
          name: formData.emergencyContactName,
          relationship: formData.emergencyContactRelationship,
          phone: formData.emergencyContactPhone,
        },
        userType: 'employee',
        profilePicture: formData.avatar || '/placeholder.svg?height=150&width=150',
        joinDate: new Date().toISOString().split('T')[0],
      },
      country: {
        name: formData.country,
        flag: `cif${formData.country.slice(0, 2).toUpperCase()}`,
      },
      usage: {
        value: 0,
        period: '',
        color: 'info',
      },
      payment: {
        name: formData.specialty,
        icon: 'cibCcMastercard',
      },
      activity: 'Recently added',
      stats: {
        patientsSeen: 0,
        surgeriesPerformed: 0,
        vaccinationsGiven: 0,
        emergencyCases: 0,
        clientSatisfaction: 'N/A',
        upcomingAppointments: 0,
      },
      specialty: formData.specialty,
      licenseNumber: formData.licenseNumber,
      yearsOfExperience: parseInt(formData.yearsOfExperience, 10),
      education: formData.education.split('\n').map(edu => {
        const [degree, institution, year] = edu.split(',');
        return { degree: degree.trim(), institution: institution.trim(), year: parseInt(year.trim(), 10) };
      }),
      certifications: formData.certifications.split('\n').map(cert => cert.trim()),
      schedule: formData.schedule,
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
        alert('Worker registered successfully.');
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          birthDate: '',
          address: '',
          country: '',
          gender: '',
          occupation: 'Veterinarian',
          preferredLanguage: '',
          emergencyContactName: '',
          emergencyContactRelationship: '',
          emergencyContactPhone: '',
          avatar: '',
          specialty: '',
          licenseNumber: '',
          yearsOfExperience: '',
          education: '',
          certifications: '',
          schedule: {
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: '',
          },
        });
      } else {
        alert('Error registering worker.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to server.');
    }
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Veterinary Worker Registration</strong>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="name">Full Name</CFormLabel>
              <CFormInput
                id="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="email">Email</CFormLabel>
              <CFormInput
                type="email"
                id="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="password">Password</CFormLabel>
              <CFormInput
                type="password"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="phone">Phone Number</CFormLabel>
              <CFormInput
                id="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="birthDate">Birth Date</CFormLabel>
              <CFormInput
                type="date"
                id="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="address">Address</CFormLabel>
              <CFormInput
                id="address"
                placeholder="Enter address"
                value={formData.address}
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
                value={formData.country}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="gender">Gender</CFormLabel>
              <CFormSelect
                id="gender"
                value={formData.gender}
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
              <CFormLabel htmlFor="preferredLanguage">Preferred Language</CFormLabel>
              <CFormInput
                id="preferredLanguage"
                placeholder="Enter preferred language"
                value={formData.preferredLanguage}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={4}>
              <CFormLabel htmlFor="emergencyContactName">Emergency Contact Name</CFormLabel>
              <CFormInput
                id="emergencyContactName"
                placeholder="Enter emergency contact name"
                value={formData.emergencyContactName}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="emergencyContactRelationship">Emergency Contact Relationship</CFormLabel>
              <CFormInput
                id="emergencyContactRelationship"
                placeholder="Enter relationship"
                value={formData.emergencyContactRelationship}
                onChange={handleChange}
                required
              />
            </CCol>
            <CCol md={4}>
              <CFormLabel htmlFor="emergencyContactPhone">Emergency Contact Phone</CFormLabel>
              <CFormInput
                id="emergencyContactPhone"
                placeholder="Enter emergency contact phone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="avatar">Profile Picture URL</CFormLabel>
              <CFormInput
                id="avatar"
                placeholder="Enter profile picture URL"
                value={formData.avatar}
                onChange={handleChange}
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
  );
}