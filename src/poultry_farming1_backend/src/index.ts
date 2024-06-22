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

// Define the record structures for broilers, layers, and eggs
const Broiler = Record({
    id: Principal,
    age_weeks: nat64,
    numberOfBroilers: nat64,
    breed: text,
    createdAt: nat64,
    available: nat64,
    sold: nat64,
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

const Egg = Record({
    id: Principal,
    breed: text,
    createdAt: nat64,
    available: nat64,
    sold: nat64,
    laidEggs: nat64,
    damagedEggs: nat64,
});

// Initialize databases for broiler, layer, and egg records
const Broilers = StableBTreeMap<Principal, Broiler>(1);
const Layers = StableBTreeMap<Principal, Layer>(2);
const Eggs = StableBTreeMap<Principal, Egg>(3);

// Example function to get the current authenticated user principal
async function getCurrentUser(): Promise<Principal> {
    // Replace with actual Dfinity Identity service logic
    return ic.caller();
}

// Example user role check (implement actual role management logic)
const getUserRole = async (principal: Principal): Promise<string | undefined> => {
    const usersCanister = ic.canister<UsersCanister>('canister-id-of-users-canister'); // Replace with actual canister ID
    return await usersCanister.getUserRole(principal);
};

// Validate input data
const validateInput = (age_weeks: nat64, number: nat64): void => {
    if (age_weeks < 0 || number < 0) {
        throw new Error("Invalid input: Age and number must be non-negative");
    }
};

// Generate a unique ID combining timestamp and randomness
function generateId(): Principal {
    const timestamp = BigInt(ic.time());
    const randomBytes = new Array(8).fill(0).map(() => Math.floor(Math.random() * 256));
    const randomPart = BigInt(Uint8Array.from(randomBytes).reduce((acc, byte) => acc * 256n + BigInt(byte), 0n));
    const combined = timestamp << 64n | randomPart;
    return Principal.fromUint8Array(Uint8Array.from(combined.toString(16).padStart(32, '0').match(/../g)!.map(byte => parseInt(byte, 16))));
}

export default Canister({
    // Function to create broiler records
    createBroilers: update([nat64, nat64, text], Broiler, async (age_weeks, numberOfBroilers, breed) => {
        const principal = await getCurrentUser();
        const role = await getUserRole(principal);
        if (!role || role !== 'owner') throw new Error("User not authorized");

        validateInput(age_weeks, numberOfBroilers);

        const id = generateId();
        const createdAt = ic.time();
        const available = numberOfBroilers;
        const sold = 0n;
        const newBroilers = { id, age_weeks, numberOfBroilers, breed, createdAt, available, sold };
        Broilers.insert(id, newBroilers);
        return newBroilers;
    }),

    // Function to update the availability of broilers after sale
    enterSoldBroilers: update([nat64, nat64, text], Broiler, async (age_weeks, numberOfBroilers, breed) => {
        const principal = await getCurrentUser();
        const role = await getUserRole(principal);
        if (!role || role !== 'owner') throw new Error("User not authorized");

        validateInput(age_weeks, numberOfBroilers);

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

    // Function to get all broiler records with pagination
    getAllBroilers: query([nat64, nat64], Vec(Broiler), (start, count) => {
        const allBroilers = Broilers.values();
        return allBroilers.slice(Number(start), Number(start + count));
    }),

    // Function to create layer records
    createLayers: update([nat64, nat64, text], Layer, async (age_weeks, numberOfLayers, breed) => {
        const principal = await getCurrentUser();
        const role = await getUserRole(principal);
        if (!role || role !== 'owner') throw new Error("User not authorized");

        validateInput(age_weeks, numberOfLayers);

        const id = generateId();
        const createdAt = ic.time();
        const available = numberOfLayers;
        const sold = 0n;
        const newLayers = { id, age_weeks, numberOfLayers, breed, createdAt, available, sold };
        Layers.insert(id, newLayers);
        return newLayers;
    }),

    // Function to update the availability of layers after sale
    enterSoldLayers: update([nat64, nat64, text], Layer, async (age_weeks, sold, breed) => {
        const principal = await getCurrentUser();
        const role = await getUserRole(principal);
        if (!role || role !== 'owner') throw new Error("User not authorized");

        validateInput(age_weeks, sold);

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

    // Function to get all layer records with pagination
    getAllLayers: query([nat64, nat64], Vec(Layer), (start, count) => {
        const allLayers = Layers.values();
        return allLayers.slice(Number(start), Number(start + count));
    }),

    // Function to add laid eggs for a specific layer
    enterLaidEggs: update([text, nat64], Egg, async (breed, laidEggs) => {
        const principal = await getCurrentUser();
        const role = await getUserRole(principal);
        if (!role || role !== 'owner') throw new Error("User not authorized");

        validateInput(0n, laidEggs);

        const id = generateId();
        const createdAt = ic.time();
        const available = laidEggs;
        const sold = 0n;
        const newEggs = { id, breed, createdAt, available, sold, laidEggs, damagedEggs: 0n };
        Eggs.insert(id, newEggs);
        return newEggs;
    }),

    // Function to add sold eggs for a specific layer
    enterSoldEggs: update([text, nat64], Egg, async (breed, sold) => {
        const principal = await getCurrentUser();
        const role = await getUserRole(principal);
        if (!role || role !== 'owner') throw new Error("User not authorized");

        validateInput(0n, sold);

        const id = generateId();
        const createdAt = ic.time();
        const available = 0n;
        const newEggs = { id, breed, createdAt, available, sold, laidEggs: 0n, damagedEggs: 0n };
        Eggs.insert(id, newEggs);
        return newEggs;
    }),

    // Function to add damaged eggs for a specific layer
    enterDamagedEggs: update([text, nat64], Egg, async (breed, damagedEggs) => {
        const principal = await getCurrentUser();
        const role = await getUserRole(principal);
        if (!role || role !== 'owner') throw new Error("User not authorized");

        validateInput(0n, damagedEggs);

        const id = generateId();
        const createdAt = ic.time();
        const available = 0n;
        const newEgg = { id, breed, createdAt, available, sold: 0n, laidEggs: 0n, damagedEggs };
        Eggs.insert(id, newEgg);
        return newEgg;
    }),

        // Function to get egg records by ID
    getEggById: query([Principal], Opt(Egg), (id) => {
        return Eggs.get(id);
    }),

    // Function to get all egg records with pagination
    getAllEggs: query([nat64, nat64], Vec(Egg), (start, count) => {
        const allEggs = Eggs.values();
        return allEggs.slice(Number(start), Number(start + count));
    }),
});

// Generate a unique ID combining timestamp and randomness
function generateId(): Principal {
    const timestamp = BigInt(ic.time());
    const randomBytes = new Array(8).fill(0).map(() => Math.floor(Math.random() * 256));
    const randomPart = BigInt(Uint8Array.from(randomBytes).reduce((acc, byte) => acc * 256n + BigInt(byte), 0n));
    const combined = timestamp << 64n | randomPart;
    return Principal.fromUint8Array(Uint8Array.from(combined.toString(16).padStart(32, '0').match(/../g)!.map(byte => parseInt(byte, 16))));
}

// User management canister interface
type UsersCanister = {
    getUserRole: (principal: Principal) => Promise<string>;
};

// Hypothetical user management canister ID
const usersCanisterId = 'rrkah-fqaaa-aaaaa-aaaaq-cai';

// Example user role check
async function getUserRole(principal: Principal): Promise<string | undefined> {
    const usersCanister = ic.canister<UsersCanister>(usersCanisterId);
    return await usersCanister.getUserRole(principal);
}

// Example function to get the current authenticated user principal
async function getCurrentUser(): Promise<Principal> {
    // Replace with actual Dfinity Identity service logic
    return ic.caller();
}
