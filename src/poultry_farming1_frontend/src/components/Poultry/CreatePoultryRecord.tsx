import React, { useState } from 'react';
import { Principal } from 'azle';

const CreatePoultryRecord: React.FC = () => {
    const [typeOfPoultry, setTypeOfPoultry] = useState('');
    const [ageWeeks, setAgeWeeks] = useState(0);
    const [feedType, setFeedType] = useState('');
    const [vaccinationWeeks, setVaccinationWeeks] = useState(0);

    const handleSubmit = async () => {
        // Call your createPoultryRecord function here
        const createdAt = Date.now();
        const nfcTagId = generateId();
        const poultryRecord = { nfcTagId, createdAt, typeOfPoultry, ageWeeks, feedType, vaccinationWeeks };
        // Assume insertPoultryRecord is a function that interacts with your canister
        await insertPoultryRecord(poultryRecord);
    };

    return (
        <div>
            <h2>Create Poultry Record</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Type of Poultry:
                    <input type="text" value={typeOfPoultry} onChange={(e) => setTypeOfPoultry(e.target.value)} />
                </label>
                <label>
                    Age in Weeks:
                    <input type="number" value={ageWeeks} onChange={(e) => setAgeWeeks(Number(e.target.value))} />
                </label>
                <label>
                    Feed Type:
                    <input type="text" value={feedType} onChange={(e) => setFeedType(e.target.value)} />
                </label>
                <label>
                    Vaccination Weeks:
                    <input type="number" value={vaccinationWeeks} onChange={(e) => setVaccinationWeeks(Number(e.target.value))} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

function generateId(): Principal {
    const randomBytes = new Array(29).fill(0).map(() => Math.floor(Math.random() * 256));
    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}

async function insertPoultryRecord(poultryRecord: any) {
    // Interaction with your canister should be implemented here
    console.log("Poultry record inserted:", poultryRecord);
}

export default CreatePoultryRecord;
