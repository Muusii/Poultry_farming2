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
import { v4 as uuidv4 } from 'uuid';

// Define poultry records that include both broiler and layers
const PoultryRecord = Record({
    createdAt: nat64,
    typeOfPoultry: text,
    age_weeks: nat64,
    feedType: text,
    vaccination_weeks: nat64,
    nfcTagId: Principal, // System-generated unique identifier
    physicalNfcTagId: text, // Actual physical NFC tag ID
});

// PoultryRecord Payload
const PoultryRecordPayload = Record({
    typeOfPoultry: text,
    age_weeks: nat64,
    feedType: text,
    vaccination_weeks: nat64,
    physicalNfcTagId: text,
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
    remaining: nat64,
});

const EggPayload = Record({
    breed: text,
    available: nat64,
    sold: nat64,
    laidEggs: nat64,
    damagedEggs: nat64,
    remaining: nat64,
});

// Initialize databases for broiler, layer, and egg records
const PoultryRecords = StableBTreeMap<Principal, typeof PoultryRecord>(0);
const Broilers = StableBTreeMap<Principal, typeof Broiler>(1);
const Layers = StableBTreeMap<Principal, typeof Layer>(2);
const Eggs = StableBTreeMap<Principal, typeof Egg>(3);

export default Canister({
    // Function to create poultry records
    createPoultryRecord: update([PoultryRecordPayload], PoultryRecord, ({ typeOfPoultry, age_weeks, feedType, vaccination_weeks, physicalNfcTagId }) => {
        const createdAt = ic.time();
        const nfcTagId = generateId();
        const poultryRecord = { nfcTagId, createdAt, typeOfPoultry, age_weeks, feedType, vaccination_weeks, physicalNfcTagId };
        PoultryRecords.insert(nfcTagId, poultryRecord);
        return poultryRecord;
    }),
    
    // Function to get poultry records by ID
    getPoultryRecordById: query([Principal], Opt(PoultryRecord), (nfcTagId) => {
        return PoultryRecords.get(nfcTagId);
    }),

    // Function to get all poultry records with pagination
    getAllPoultryRecords: query([nat64, nat64], Vec(PoultryRecord), (offset, limit) => {
        const allRecords = PoultryRecords.values();
        return allRecords.slice(Number(offset), Number(offset + limit));
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
    enterSoldBroilers: update([Principal, nat64], Opt(Broiler), (id, sold) => {
        const existingBroiler = Broilers.get(id);
        if (existingBroiler) {
            const updatedBroiler = { 
                ...existingBroiler, 
                sold: existingBroiler.sold + sold, 
                available: existingBroiler.available - sold 
            };
            Broilers.insert(id, updatedBroiler);
            return updatedBroiler;
        }
        return null;
    }),

    // Function to get broiler record by ID
    getBroilerById: query([Principal], Opt(Broiler), (id) => {
        return Broilers.get(id);
    }),

    // Function to get all broiler records with pagination
    getAllBroilers: query([nat64, nat64], Vec(Broiler), (offset, limit) => {
        const allRecords = Broilers.values();
        return allRecords.slice(Number(offset), Number(offset + limit));
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
    enterSoldLayers: update([Principal, nat64], Opt(Layer), (id, sold) => {
        const existingLayer = Layers.get(id);
        if (existingLayer) {
            const updatedLayer = { 
                ...existingLayer, 
                sold: existingLayer.sold + sold, 
                available: existingLayer.available - sold 
            };
            Layers.insert(id, updatedLayer);
            return updatedLayer;
        }
        return null;
    }),

    // Function to get layer record by ID
    getLayerById: query([Principal], Opt(Layer), (id) => {
        return Layers.get(id);
    }),

    // Function to get all layer records with pagination
    getAllLayers: query([nat64, nat64], Vec(Layer), (offset, limit) => {
        const allRecords = Layers.values();
        return allRecords.slice(Number(offset), Number(offset + limit));
    }),

    // Function to add laid eggs for a specific layer
    enterLaidEggs: update([EggPayload], Egg, ({ breed, laidEggs, available, sold, damagedEggs, remaining }) => {
        const id = generateId();
        const createdAt = ic.time();
        const newEggs = { id, breed, createdAt, available, sold, laidEggs, damagedEggs, remaining };
        Eggs.insert(id, newEggs);
        return newEggs;
    }),

    // Function to add sold eggs for a specific layer
    enterSoldEggs: update([Principal, nat64], Opt(Egg), (id, sold) => {
        const existingEgg = Eggs.get(id);
        if (existingEgg) {
            const updatedEgg = { 
                ...existingEgg, 
                sold: existingEgg.sold + sold, 
                available: existingEgg.available - sold 
            };
            Eggs.insert(id, updatedEgg);
            return updatedEgg;
        }
        return null;
    }),

    // Function to add damaged eggs for a specific layer
    enterDamagedEggs: update([Principal, nat64], Opt(Egg), (id, damagedEggs) => {
        const existingEgg = Eggs.get(id);
        if (existingEgg) {
            const updatedEgg = { 
                ...existingEgg, 
                damagedEggs: existingEgg.damagedEggs + damagedEggs, 
                available: existingEgg.available - damagedEggs 
            };
            Eggs.insert(id, updatedEgg);
            return updatedEgg;
        }
        return null;
    }),
    
    // Function to get egg records by ID
    getEggById: query([Principal], Opt(Egg), (id) => {
        return Eggs.get(id);
    }),

    // Function to get all egg records with pagination
    getAllEggs: query([nat64, nat64], Vec(Egg), (offset, limit) => {
        const allRecords = Eggs.values();
        return allRecords.slice(Number(offset), Number(offset + limit));
    }),
});

// Generate a random ID
function generateId(): Principal {
    return Principal.fromText(uuidv4());
}
