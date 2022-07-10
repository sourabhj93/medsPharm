import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { OfferSection } from '../../OfferSection/OfferSection'
import { SimpleAccordion } from '../../common/Accordion/Accordion';
import { brands, categories } from '../../assets/data/offers';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const uploadPrescription = () => {
    navigate('/prescription')
  }
  return (
    <>
        <Row>
          <Col md={12} sm={12}>
            <h1><OfferSection /></h1>
          </Col>
        </Row>
        <Box className='container-box'>
          <Typography variant='h6' sx={{ml: 2, pt: 1, color: 'teal'}}>Upload Prescription</Typography>
          <Button variant="contained" onClick={uploadPrescription} className='button'>Upload</Button>
          <p style={{padding: '5px 5px 10px 16px', width: '72%', color: 'teal', position: 'relative', top: -35}}>Please upload prescription along with basic details of yours for quick orders</p>
        </Box>
        <Row>
          <Col md={6} sm={12}>
            <SimpleAccordion productsName={'Available Brands'} brandName={brands}/>
          </Col>
          <Col md={6} sm={12}>
            <SimpleAccordion  productsName={'Categories'} brandName={categories}/>
          </Col>
        </Row>
    </>
  )
}

export default Home
