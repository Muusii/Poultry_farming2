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

// Define poultry records that's both broiler and layers;
const PoultryRecord = Record({
    createdAt: nat64,
    typeOfPoultry: text,
    age_weeks: nat64,
    feedType: text,
    vaccination_weeks: nat64,
    nfcTagId: Principal,
})

// PoultryRecord Payload
const PoultryRecordPayload = Record({
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

// Broiler Payload
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

// Layer Payload
const LayerPayload = Record({
    age_weeks: nat64,
    numberOfLayers: nat64,
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
});

// Egg Payload
const EggPayload = Record({
    breed: text,
    available: nat64,
    sold: nat64,
    laidEggs: nat64,
    damagedEggs: nat64,
});

// Initialize databases for broiler, layer, and egg records
const PoultryRecords = StableBTreeMap<Principal, PoultryRecord>(0);
const Broilers = StableBTreeMap<Principal, Broiler>(1);
const Layers = StableBTreeMap<Principal, Layer>(2);
const Eggs = StableBTreeMap<Principal, Egg>(3);

export default Canister({
    // Function to create poultry records
    createPoultryRecord: update([text, nat64, text, nat64], PoultryRecord, (typeOfPoultry, age_weeks, feedType, vaccination_weeks) => {
        const createdAt = ic.time();
        const nfcTagId = generateId();
        const poultryRecord = { nfcTagId, createdAt, typeOfPoultry, age_weeks, feedType, vaccination_weeks };
        PoultryRecords.insert(nfcTagId, poultryRecord);
        return poultryRecord;
    }),
    
    // Function to get poultry record by ID
    getPoultryRecordById: query([Principal], Opt(PoultryRecord), (nfcTagId) => {
        return PoultryRecords.get(nfcTagId);
    }),

    // Function to get all poultry records
    getAllPoultryRecords: query([], Vec(PoultryRecord), () => {
        return PoultryRecords.values();
    }),

    // Function to create broiler records
    createBroilers: update([BroilerPayload], Broiler, ({ age_weeks, numberOfBroilers, breed }) => {
        const id = generateId();
        const createdAt = ic.time();
        const available = numberOfBroilers;
        const sold = 0n;
        const newBroilers = { id, age_weeks, numberOfBroilers, breed, createdAt, available, sold };
        Broilers.insert(id, newBroilers);
        return newBroilers;
    }),

    // Function to update the availability of broilers after sale
    enterSoldBroilers: update([Principal, nat64], Opt(Broiler), (id, soldQuantity) => {
        const broiler = Broilers.get(id);
        if (broiler) {
            broiler.available -= soldQuantity;
            broiler.sold += soldQuantity;
            Broilers.insert(id, broiler);
        }
        return broiler;
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
    createLayers: update([LayerPayload], Layer, ({ age_weeks, numberOfLayers, breed }) => {
        const id = generateId();
        const createdAt = ic.time();
        const available = numberOfLayers;
        const sold = 0n;
        const newLayers = { id, age_weeks, numberOfLayers, breed, createdAt, available, sold };
        Layers.insert(id, newLayers);
        return newLayers;
    }),

    // Function to update the availability of layers after sale
    enterSoldLayers: update([Principal, nat64], Opt(Layer), (id, soldQuantity) => {
        const layer = Layers.get(id);
        if (layer) {
            layer.available -= soldQuantity;
            layer.sold += soldQuantity;
            Layers.insert(id, layer);
        }
        return layer;
    }),

    // Function to get layer record by ID
    getLayerById: query([Principal], Opt(Layer), (id) => {
        return Layers.get(id);
    }),

    // Function to get all layer records
    getAllLayers: query([], Vec(Layer), () => {
        return Layers.values();
    }),

    // Function to add laid eggs for a specific breed
    enterLaidEggs: update([EggPayload], Egg, ({ breed, available, sold, laidEggs, damagedEggs }) => {
        const id = generateId();
        const createdAt = ic.time();
        const newEggs = { id, breed, createdAt, available, sold, laidEggs, damagedEggs };
        Eggs.insert(id, newEggs);
        return newEggs;
    }),

    // Function to update sold eggs for a specific breed
    updateSoldEggs: update([Principal, nat64], Opt(Egg), (id, soldQuantity) => {
        const egg = Eggs.get(id);
        if (egg) {
            egg.available -= soldQuantity;
            egg.sold += soldQuantity;
            Eggs.insert(id, egg);
        }
        return egg;
    }),

    // Function to update damaged eggs for a specific breed
    updateDamagedEggs: update([Principal, nat64], Opt(Egg), (id, damagedQuantity) => {
        const egg = Eggs.get(id);
        if (egg) {
            egg.available -= damagedQuantity;
            egg.damagedEggs += damagedQuantity;
            Eggs.insert(id, egg);
        }
        return egg;
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
