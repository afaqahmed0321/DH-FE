import React from 'react'
import MainLayout from '../layout/MainLayout'
import { Container, Row } from 'react-bootstrap'
import PaymentMain from '../components/payment/PaymentHistory'

const PaymentHistory = () => {
  return (
     <MainLayout>
            <Container fluid>
                <Row>
                    <PaymentMain />
                </Row>
            </Container>
        </MainLayout>
  )
}

export default PaymentHistory
