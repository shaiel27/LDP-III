'use client'

import React, { useState, useEffect } from 'react'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMinus, cilPlus } from '@coreui/icons'

export default function InventoryManagement() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    image: '',
  })
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3004/inventory')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching inventory:', error)
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
    formData.append('file', file)

    setIsUploading(true)
    try {
      // Aquí deberías implementar la lógica para subir la imagen a tu servidor o servicio de almacenamiento
      // Este es un ejemplo simulado, reemplázalo con tu lógica real de carga de archivos
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simula una carga de 2 segundos
      const imageUrl = URL.createObjectURL(file) // Esto es solo para simular una URL de imagen
      setIsUploading(false)
      return imageUrl
    } catch (error) {
      console.error('Error uploading image:', error)
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
        alert('Error al subir la imagen. Por favor, inténtelo de nuevo.')
        return
      }
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      image: imageUrl,
    }

    try {
      if (editingProduct) {
        const response = await fetch(`http://localhost:3004/inventory/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        })
        if (response.ok) {
          fetchProducts()
        }
      } else {
        const response = await fetch('http://localhost:3004/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        })
        if (response.ok) {
          fetchProducts()
        }
      }
      setEditingProduct(null)
      setFormData({ name: '', category: '', price: '', quantity: '', image: '' })
      setFile(null)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      image: product.image,
    })
    setFile(null)
  }

  const cancelEdit = () => {
    setEditingProduct(null)
    setFormData({ name: '', category: '', price: '', quantity: '', image: '' })
    setFile(null)
  }

  const handleDelete = (product) => {
    setDeleteConfirmation(product)
  }

  const confirmDelete = async () => {
    if (deleteConfirmation) {
      try {
        const response = await fetch(`http://localhost:3004/inventory/${deleteConfirmation.id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          fetchProducts()
        }
      } catch (error) {
        console.error('Error deleting product:', error)
      }
      setDeleteConfirmation(null)
    }
  }

  const handleQuantityChange = async (product, change) => {
    const newQuantity = product.quantity + change
    if (newQuantity < 0) return

    try {
      const response = await fetch(`http://localhost:3004/inventory/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      })
      if (response.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>{editingProduct ? 'Editar producto' : 'Agregar nuevo producto'}</strong>
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
                    <CFormLabel htmlFor="category">Categoria</CFormLabel>
                    <CFormSelect
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar Categoria</option>
                      <option value="Food">Alimento</option>
                      <option value="Medication">Medicamento</option>
                      <option value="Accessory">Accesorio</option>
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
                    <CFormLabel htmlFor="quantity">Cantidad</CFormLabel>
                    <CFormInput
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      min="0"
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="image">Imagen del producto</CFormLabel>
                    <CFormInput
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    {formData.image && (
                      <img 
                        src={formData.image} 
                        alt="Vista previa" 
                        style={{ maxWidth: '200px', marginTop: '10px' }} 
                      />
                    )}
                  </CCol>
                </CRow>
                <CButton type="submit" color="primary" className="me-2" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <CSpinner size="sm" className="me-2" />
                      Subiendo imagen...
                    </>
                  ) : (
                    editingProduct ? 'Actualizar' : 'Agregar'
                  )}
                </CButton>
                {editingProduct && (
                  <CButton type="button" color="secondary" onClick={cancelEdit}>
                    Cancelar
                  </CButton>
                )}
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
              <CCardImage orientation="top" src={product.image} />
              <CCardBody>
                <CCardTitle>{product.name}</CCardTitle>
                <CCardText>
                  Categoria: {product.category}<br />
                  Precio: ${product.price.toFixed(2)}<br />
                  <CInputGroup className="mt-2">
                    <CButton color="primary" onClick={() => handleQuantityChange(product, -1)}>
                      <CIcon icon={cilMinus} />
                    </CButton>
                    <CInputGroupText>Cantidad: {product.quantity}</CInputGroupText>
                    <CButton color="primary" onClick={() => handleQuantityChange(product, 1)}>
                      <CIcon icon={cilPlus} />
                    </CButton>
                  </CInputGroup>
                </CCardText>
                <CButton color="primary" onClick={() => handleEdit(product)} className="me-2">Editar</CButton>
                <CButton color="secondary" onClick={() => handleDelete(product)}>Eliminar</CButton>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <CModal visible={deleteConfirmation !== null} onClose={() => setDeleteConfirmation(null)}>
        <CModalHeader>
          <CModalTitle>Confirmar eliminación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Está seguro de que desea eliminar el producto "{deleteConfirmation?.name}"?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setDeleteConfirmation(null)}>
            Cancelar
          </CButton>
          <CButton color="danger" onClick={confirmDelete}>Eliminar</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}