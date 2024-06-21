import {
    Canister,
    query,
    text,
    update,
    Record,
    Vec,
    nat64,
    Principal,
    StableBTreeMap,
    Opt,
    ic,
} from "azle";

//Define poultry records thats both broiler and layers;
const PoultryRecord = Record({
    //id: Principal,
    createdAt: nat64,
    typeOfPoultry: text,
    age_weeks: nat64,
    feedType: text,
    vaccination_weeks: nat64,
    nfcTagId: Principal, // this field with help customers to scan the poultry record to know all details included.
})

// PoultryRecord Payload
const PoultryRecordPayload = Record({
    //id: Principal,
    typeOfPoultry: text,
    age_weeks: nat64,
    feedType: text,
    vaccination_weeks: nat64,
    nfcTagId: Principal,
});

// Define the record structures for broilers and layers
const Broiler = Record({
    id: Principal,
    age_weeks: nat64,
    numberOfBroilers: nat64,
    breed: text,
    createdAt: nat64,
    available: nat64,
    sold: nat64,
});

// broiler Payload
const BroilerPayload = Record({
    age_weeks: nat64,
    numberOfBroilers: nat64,
    breed: text,
});

const Layer = Record({
    id: Principal,
    age_weeks: nat64,
    numberOfLayers: nat64,
    breed: text,
    createdAt: nat64,
    available: nat64,
    sold: nat64,
});

//layer payload
const LayerPayload = Record({
    age_weeks: nat64,
    numberOfBroilers: nat64,
    breed: text,
});

const Egg = Record({
    id: Principal,
    breed: text,
    createdAt: nat64,
    available: nat64,
    sold: nat64,
    laidEggs: nat64,
    damagedEggs: nat64,
    //remaining: nat64,
});

//egg payload
const EggPayload = Record({
    breed: text,
    available: nat64,
    sold: nat64,
    laidEggs: nat64,
    damagedEggs: nat64,
    remaining: nat64,
});

// Initialize databases for broiler, layer, and egg records
const PoultryRecords = StableBTreeMap<Principal, PoultryRecord>(0);
const Broilers = StableBTreeMap<Principal, Broiler>(1);
const Layers = StableBTreeMap<Principal, Layer>(2);
const Eggs = StableBTreeMap<Principal, Egg>(3);


export default Canister({
//function to create poultry records
    createPoultryRecord: update([text, nat64, text, nat64], PoultryRecord, (typeOfPoultry, age_weeks, feedType, vaccination_weeks) => {
        //const id = generateId();
        const createdAt = ic.time();
        const nfcTagId = generateId();
        const poultryRecord = { nfcTagId, createdAt, typeOfPoultry, age_weeks, feedType, vaccination_weeks };
        PoultryRecords.insert(nfcTagId, poultryRecord);
        return poultryRecord;
    }),
    
     // Function to poultry records by ID
    getPoultryRecordById: query([Principal], Opt(PoultryRecord), (nfcTagId) => {
        return PoultryRecords.get(nfcTagId);
    }),

    // Function to get all poultry records
    getAllPoultryRecords: query([], Vec(PoultryRecord), () => {
        return PoultryRecords.values();
    }),

    // Function to create broiler records
    createBroilers: update([nat64, nat64, text], Broiler, (age_weeks, numberOfBroilers, breed) => {
        const id = generateId();
        const createdAt = ic.time();
        const available = numberOfBroilers;
        const sold = 0n;
        const newBroilers = { id, age_weeks, numberOfBroilers, breed, createdAt, available, sold };
        Broilers.insert(id, newBroilers);
        return newBroilers;
    }),

    // Function to update the availability of broilers after sale
    enterSoldBroilers: update([nat64, nat64, text], Broiler, (age_weeks, numberOfBroilers, breed) => {
        const id = generateId();
        const createdAt = ic.time();
        const available = 0n;
        const sold = numberOfBroilers;
        const newBroilers = { id, age_weeks, numberOfBroilers, breed, createdAt, available, sold };
        Broilers.insert(id, newBroilers);
        return newBroilers;
    }),

    // Function to get broiler record by ID
    getBroilerById: query([Principal], Opt(Broiler), (id) => {
        return Broilers.get(id);
    }),

    // Function to get all broiler records
    getAllBroilers: query([], Vec(Broiler), () => {
        return Broilers.values();
    }),

    // Function to create layer records
    createLayers: update([nat64, nat64, text], Layer, (age_weeks, numberOfLayers, breed) => {
        const id = generateId();
        const createdAt = ic.time();
        const available = numberOfLayers;
        const sold = 0n;
        const newLayers = { id, age_weeks, numberOfLayers, breed, createdAt, available, sold };
        Layers.insert(id, newLayers);
        return newLayers;
    }),

    // Function to update the availability of layers after sale
    enterSoldLayers: update([nat64, nat64, text], Layer, (age_weeks, sold, breed) => {
        const id = generateId();
        const createdAt = ic.time();
        const available = 0n;
        const newLayers = { id, age_weeks, numberOfLayers: sold, breed, createdAt, available, sold };
        Layers.insert(id, newLayers);
        return newLayers;
    }),

    // Function to get layer record by ID
    getLayerById: query([Principal], Opt(Layer), (id) => {
        return Layers.get(id);
    }),

    // Function to get all layer records
    getAllLayers: query([], Vec(Layer), () => {
        return Layers.values();
    }),

    // Function to add laid eggs for a specific layer
    enterLaidEggs: update([text, nat64], Egg, (breed, laidEggs) => {
        const id = generateId();
        const createdAt = ic.time();
        const available = laidEggs;
        const sold = 0n;
        const newEggs = { id, breed, createdAt, available, sold, laidEggs, damagedEggs: 0n };
        Eggs.insert(id, newEggs);
        return newEggs;
    }),

    // Function to add sold eggs for a specific layer
    enterSoldEggs: update([text, nat64], Egg, (breed, sold) => {
        const id = generateId();
        const createdAt = ic.time();
        const available = sold;
        const newEggs = { id, breed, createdAt, available, sold,laidEggs: 0n, damagedEggs: 0n };
        Eggs.insert(id, newEggs);
        return newEggs;
    }),

    // Function to add damaged eggs for a specific layer
    enterDamagedEggs: update([text, nat64], Egg, (breed, damagedEggs) => {
        const id = generateId();
        const createdAt = ic.time();
        const available = damagedEggs;
        const sold = 0n;
        const newEgg = { id, breed, createdAt, available, sold, laidEggs: 0n, damagedEggs };
        Eggs.insert(id, newEgg);
        return newEgg;
    }),
    
    
    // Function to get egg records by ID
    getEggById: query([Principal], Opt(Egg), (id) => {
        return Eggs.get(id);
    }),

    // Function to get all egg records
    getAllEggs: query([], Vec(Egg), () => {
        return Eggs.values();
    }),
});


// Generate a random ID
function generateId(): Principal {
    const randomBytes = new Array(29).fill(0).map(() => Math.floor(Math.random() * 256));
    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}

  
  
