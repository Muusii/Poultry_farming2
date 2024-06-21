// src/pages/Home.tsx

import React from 'react';
import { Container } from 'react-bootstrap';
// import { Notification } from '../components/utils/Notifications';
import PoultryManagement from '../components/Poultry/poultry';

const Featurepage: React.FC = () => {
  return (
    <>
      {/* <Notification />
      <Container fluid="md">
        <main>
          <PoultryManagement />
        </main>
      </Container> */}
      <PoultryManagement />
    </>
  );
};

export default Featurepage;
