"use client"

import { useState, useEffect } from "react"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardTitle,
  CCardText,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CButton,
  CContainer,
  CSpinner,
  CAlert,
} from "@coreui/react"

const API_BASE_URL = "http://localhost:3001/api/v1"

export default function InventoryManagement() {
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    price: "",
    description: "",
    expiration_date: "",
  })
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No se encontró token de autenticación. Por favor, inicie sesión.")
        return
      }

      const response = await fetch(`${API_BASE_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          setError("La ruta del API no fue encontrada. Verifique la URL del servidor.")
        } else {
          const errorData = await response.text()
          setError(`Error al obtener productos: ${errorData}`)
        }
        return
      }

      const data = await response.json()
      if (data.ok) {
        setProducts(data.products)
        setError(null)
      } else {
        setError(data.msg || "Error desconocido al obtener productos")
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Error de conexión con el servidor")
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const uploadImage = async () => {
    if (!file) return null

    const formData = new FormData()
    formData.append("file", file)

    setIsUploading(true)
    try {
      // Implement actual image upload to your backend here
      // For now, we'll just use a local URL
      const imageUrl = URL.createObjectURL(file)
      setIsUploading(false)
      return imageUrl
    } catch (error) {
      console.error("Error uploading image:", error)
      setIsUploading(false)
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let imageUrl = formData.image

    if (file) {
      imageUrl = await uploadImage()
      if (!imageUrl) {
        setError("Error al subir la imagen. Por favor, inténtelo de nuevo.")
        return
      }
    }

    const productData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      image: imageUrl,
    }

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("No se encontró token de autenticación. Por favor, inicie sesión.")
        return
      }

      const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(errorData)
      }

      const data = await response.json()

      if (data.ok) {
        fetchProducts()
        setFormData({
          name: "",
          category_id: "",
          price: "",
          description: "",
          expiration_date: "",
        })
        setFile(null)
        setError(null)
      } else {
        setError(data.msg || "Error al guardar el producto")
      }
    } catch (error) {
      console.error("Error saving product:", error)
      setError(`Error al conectar con el servidor: ${error.message}`)
    }
  }

  return (
    <CContainer>
      {error && <CAlert color="danger">{error}</CAlert>}
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Agregar nuevo producto</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow className="mb-3">
                  <CCol md={6}>
                    <CFormLabel htmlFor="productName">Nombre del Producto</CFormLabel>
                    <CFormInput
                      id="productName"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="category_id">Categoria</CFormLabel>
                    <CFormSelect
                      id="category_id"
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar Categoria</option>
                      <option value="1">Alimento</option>
                      <option value="2">Medicamento</option>
                      <option value="3">Accesorio</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md={6}>
                    <CFormLabel htmlFor="price">Precio</CFormLabel>
                    <CFormInput
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      step="0.01"
                      min="0"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="expiration_date">Fecha de Expiración</CFormLabel>
                    <CFormInput
                      type="date"
                      id="expiration_date"
                      name="expiration_date"
                      value={formData.expiration_date}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="description">Descripción</CFormLabel>
                    <CFormInput
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="image">Imagen del producto</CFormLabel>
                    <CFormInput type="file" id="image" name="image" onChange={handleFileChange} accept="image/*" />
                  </CCol>
                </CRow>
                <CButton type="submit" color="primary" className="me-2" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <CSpinner size="sm" className="me-2" />
                      Subiendo imagen...
                    </>
                  ) : (
                    "Agregar"
                  )}
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <h2 className="mb-4">Inventario</h2>
        </CCol>
      </CRow>

      <CRow>
        {products.map((product) => (
          <CCol key={product.id} sm={6} lg={3}>
            <CCard className="mb-4">
              <CCardImage orientation="top" src={product.image || "/placeholder.svg"} />
              <CCardBody>
                <CCardTitle>{product.name}</CCardTitle>
                <CCardText>
                  Categoria: {product.category_name}
                  <br />
                  Precio: ${product.price.toFixed(2)}
                  <br />
                  Descripción: {product.description}
                  <br />
                  Fecha de Expiración: {new Date(product.expiration_date).toLocaleDateString()}
                  <br />
                  Cantidad: {product.quantity || 0}
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  )
}

