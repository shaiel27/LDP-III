import React, { useState } from 'react'
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
  CFormTextarea,
  CFormLabel,
  CButton,
  CContainer,
} from '@coreui/react'
//import image1 from 'src/assets/images/logo1.png'
const initialProducts = [
  { id: 1, name: 'Dog Food', category: 'Food', price: 29.99, quantity: 50, image:'src/assets/images/logo1.png' },
  { id: 2, name: 'Cat Food', category: 'Food', price: 24.99, quantity: 40, image:'src/assets/images/logo1.png' },
  { id: 3, name: 'Flea Treatment', category: 'Medication', price: 15.99, quantity: 100, image:'src/assets/images/logo1.png' },
  { id: 4, name: 'Dog Collar', category: 'Accessory', price: 9.99, quantity: 30,image:'src/assets/images/logo1.png' },
]

export default function InventoryManagement() {
  const [products, setProducts] = useState(initialProducts)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    image: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct({ ...newProduct, [name]: value })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const productToAdd = {
      id: products.length + 1,
      ...newProduct,
      price: parseFloat(newProduct.price),
      quantity: parseInt(newProduct.quantity),
    }
    setProducts([...products, productToAdd])
    setNewProduct({ name: '', category: '', price: '', quantity: '', image: null })
  }

  return (
    <CContainer>
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
                      value={newProduct.name}
                      onChange={handleInputChange}
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="category">Categoria</CFormLabel>
                    <CFormSelect
                      id="category"
                      name="category"
                      value={newProduct.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Seleccionar Categoria</option>
                      <option value="Food">Alimento</option>
                      <option value="Medication">Medicamento</option>
                      <option value="Accessory">Accessory</option>
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
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="quantity">Cantidad</CFormLabel>
                    <CFormInput
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={newProduct.quantity}
                      onChange={handleInputChange}
                      required
                      placeholder='Cantidad a agregar'
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="productImage">Imagen del producto</CFormLabel>
                    <CFormInput
                      type="file"
                      id="productImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </CCol>
                </CRow>
                <CButton type="submit" color="primary">
                  Agregar 
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
              <CCardImage orientation="top" src={product.image} />
              <CCardBody>
                <CCardTitle>{product.name}</CCardTitle>
                <CCardText>
                  Categoria: {product.category}<br />
                  Precio ${product.price.toFixed(2)}<br />
                  Cantidad: {product.quantity}
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  )
}