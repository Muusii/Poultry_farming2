// src/PoultryComponents/PoultryManagement.tsx

import React from 'react';
// import CreateBroiler from './Broilers/CreateBroiler';
// import GetBroilerById from './Broilers/GetBroilerById';
// import GetAllBroilers from './Broilers/GetAllBroilers';
// import CreateLayer from './Layers/CreateLayer';
// import GetLayerById from './Layers/GetLayerById';
// import GetAllLayers from './Layers/GetAllLayers';
// import EnterLaidEggs from './Eggs/EnterLaidEggs';
// import EnterSoldEggs from './Eggs/EnterSoldEggs';
// import EnterDamagedEggs from './Eggs/EnterDamagedEggs';
// import GetEggById from './Eggs/GetEggById';
// import GetAllEggs from './Eggs/GetAllEggs';
import CreatePoultryRecord from './CreatePoultryRecord';
// import GetPoultryRecordById from './GeneralRecords/GetPoultryRecordById';
// import GetAllPoultryRecords from './GeneralRecords/GetAllPoultryRecords';

const PoultryManagement: React.FC = () => {
  return (
    <div>
      <h1>Poultry Management System</h1>
      
      {/* <section>
        <h2>Broilers</h2>
        <CreateBroiler />
        <GetBroilerById />
        <GetAllBroilers />
      </section>
       */}
      {/* <section>
        <h2>Layers</h2>
        <CreateLayer />
        <GetLayerById />
        <GetAllLayers />
      </section>
      
      <section>
        <h2>Eggs</h2>
        <EnterLaidEggs />
        <EnterSoldEggs />
        <EnterDamagedEggs />
        <GetEggById />
        <GetAllEggs />
      </section> */}
      
      <section>
        <h2>General Poultry Records</h2>
        <CreatePoultryRecord />
        {/* <GetPoultryRecordById />
        <GetAllPoultryRecords /> */}
      </section>
    </div>
  );
};

export default PoultryManagement;
