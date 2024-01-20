import React from 'react'
import MainLayout from '../layout/MainLayout'
import { Container, Row } from 'react-bootstrap'
import ManagerMain from '../components/managers/MyManagers'

const MyManagers = () => {
  return (
     <MainLayout>
            <Container fluid>
                <Row>
                    <ManagerMain />
                </Row>
            </Container>
        </MainLayout>
  )
}

export default MyManagers
