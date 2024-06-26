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
  Variant,
  Err,
  Ok,
  Result,
} from "azle";

import { v4 as uuid } from "uuid";

//Define poultry records thats both broiler and layers;
const PoultryRecord = Record({
  //id: Principal,
  createdAt: nat64,
  typeOfPoultry: text,
  age_weeks: nat64,
  feedType: text,
  vaccination_weeks: nat64,
  nfcTagId: text, // this field with help customers to scan the poultry record to know all details included.
});

// PoultryRecord Payload
const PoultryRecordPayload = Record({
  typeOfPoultry: text,
  age_weeks: nat64,
  feedType: text,
  vaccination_weeks: nat64,
});

// Define the record structures for broilers and layers
const Broiler = Record({
  id: text,
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
  id: text,
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
  id: text,
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

// Define the possible message variants for errors and notifications
const Message = Variant({
  NotFound: text,
  InvalidPayload: text,
  PaymentFailed: text,
  PaymentCompleted: text,
  AlreadyExist: text,
  NotAuthorized: text,
});

// Initialize databases for broiler, layer, and egg records
const PoultryRecords = StableBTreeMap<text, PoultryRecord>(0);
const Broilers = StableBTreeMap<text, Broiler>(1);
const Layers = StableBTreeMap<text, Layer>(2);
const Eggs = StableBTreeMap<text, Egg>(3);

export default Canister({
  //function to create poultry records
  createPoultryRecord: update(
    [PoultryRecordPayload],
    Result(PoultryRecord,Message),
    (payload) => {
      //const id = generateId();
    // Validate the payload
    // @ts-ignore
    const validatePayloadErrors = validatePoultryRecordPayload(payload);
    if (validatePayloadErrors.length) {
      return Err({
        InvalidPayload: `Invalid payload. Errors=[${validatePayloadErrors}]`,
      });
    }
      const createdAt = ic.time();
      const nfcTagId = uuid();
      const poultryRecord = { nfcTagId, createdAt, ...payload };
      PoultryRecords.insert(nfcTagId, poultryRecord);
      return Ok(poultryRecord);
    }
  ),

  // Function to poultry records by ID
  getPoultryRecordById: query([text], Opt(PoultryRecord), (nfcTagId) => {
    return PoultryRecords.get(nfcTagId);
  }),

  // Function to get all poultry records
  getAllPoultryRecords: query([], Vec(PoultryRecord), () => {
    return PoultryRecords.values();
  }),

  // Function to create broiler records
  createBroilers: update([BroilerPayload], Broiler, (payload) => {
    const id = uuid();
    const createdAt = ic.time();
    const available = payload.numberOfBroilers;
    const sold = 0n;
    const newBroilers = { id, ...payload, createdAt, available, sold };
    Broilers.insert(id, newBroilers);
    return newBroilers;
  }),

  // Function to update the availability of broilers after sale
  enterSoldBroilers: update(
    [text, nat64],
    Result(Broiler, Message),
    (id, soldAmount) => {
      if (!isValidUuid(id)) {
        return Err({
          InvalidPayload: `id=${id} is not in the valid format.`,
        });
      }
      const broilerOpt = Broilers.get(id);
      if ("None" in broilerOpt) {
        return Err({ NotFound: `broiler with id=${id} not found` });
      }
      const broiler = broilerOpt.Some;
      if (broiler.available < soldAmount) {
        return Err({
          InvalidPayload: `Sold amount cannot be greater than the amount available.`,
        });
      }
      broiler.available = broiler.available - soldAmount;
      broiler.sold = broiler.sold + soldAmount;
      Broilers.insert(id, broiler);
      return Ok(broiler);
    }
  ),

  // Function to get broiler record by ID
  getBroilerById: query([text], Opt(Broiler), (id) => {
    return Broilers.get(id);
  }),

  // Function to get all broiler records
  getAllBroilers: query([], Vec(Broiler), () => {
    return Broilers.values();
  }),

  // Function to create layer records
  createLayers: update(
    [nat64, nat64, text],
    Layer,
    (age_weeks, numberOfLayers, breed) => {
      const id = uuid();
      const createdAt = ic.time();
      const available = numberOfLayers;
      const sold = 0n;
      const newLayers = {
        id,
        age_weeks,
        numberOfLayers,
        breed,
        createdAt,
        available,
        sold,
      };
      Layers.insert(id, newLayers);
      return newLayers;
    }
  ),

  // Function to update the availability of layers after sale
  enterSoldLayers: update(
    [text, nat64],
    Result(Layer, Message),
    (id, soldAmount) => {
        if (!isValidUuid(id)) {
            return Err({
              InvalidPayload: `id=${id} is not in the valid format.`,
            });
          }
          const layerOpt = Layers.get(id);
          if ("None" in layerOpt) {
            return Err({ NotFound: `layer with id=${id} not found` });
          }
          const layer = layerOpt.Some;
          if (layer.available < soldAmount) {
            return Err({
              InvalidPayload: `Sold amount cannot be greater than the amount available.`,
            });
          }
          layer.available = layer.available - soldAmount;
          layer.sold = layer.sold + soldAmount;
          Layers.insert(id, layer);
      return Ok(layer);
    }
  ),

  // Function to get layer record by ID
  getLayerById: query([text], Opt(Layer), (id) => {
    return Layers.get(id);
  }),

  // Function to get all layer records
  getAllLayers: query([], Vec(Layer), () => {
    return Layers.values();
  }),

  // Function to add laid eggs for a specific layer
  enterLaidEggs: update([text, nat64], Egg, (breed, laidEggs) => {
    const id = uuid();
    const createdAt = ic.time();
    const available = laidEggs;
    const sold = 0n;
    const newEggs = {
      id,
      breed,
      createdAt,
      available,
      sold,
      laidEggs,
      damagedEggs: 0n,
    };
    Eggs.insert(id, newEggs);
    return newEggs;
  }),

  // Function to add sold eggs for a specific layer
  enterSoldEggs: update([text, nat64], Egg, (breed, sold) => {
    const id = uuid();
    const createdAt = ic.time();
    const available = sold;
    const newEggs = {
      id,
      breed,
      createdAt,
      available,
      sold,
      laidEggs: 0n,
      damagedEggs: 0n,
    };
    Eggs.insert(id, newEggs);
    return newEggs;
  }),

  // Function to add damaged eggs for a specific layer
  enterDamagedEggs: update([text, nat64], Egg, (breed, damagedEggs) => {
    const id = uuid();
    const createdAt = ic.time();
    const available = damagedEggs;
    const sold = 0n;
    const newEgg = {
      id,
      breed,
      createdAt,
      available,
      sold,
      laidEggs: 0n,
      damagedEggs,
    };
    Eggs.insert(id, newEgg);
    return newEgg;
  }),

  // Function to get egg records by ID
  getEggById: query([text], Opt(Egg), (id) => {
    return Eggs.get(id);
  }),

  // Function to get all egg records
  getAllEggs: query([], Vec(Egg), () => {
    return Eggs.values();
  }),
});

// Helper function that trims the input string and then checks the length
// The string is empty if true is returned, otherwise, string is a valid value
function isInvalidString(str: text): boolean {
  return str.trim().length == 0;
}

// Helper function to ensure the input id meets the format used for ids generated by uuid
function isValidUuid(id: string): boolean {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(id);
}

/**
 * Helper function to validate the PoultryRecordPayload
 */
function validatePoultryRecordPayload(
  payload: typeof PoultryRecordPayload
): Vec<string> {
  const errors: Vec<text> = [];
  const validPoultryTypes = [
    "chicken",
    "duck",
    "turkey",
    "goose",
    "quail",
    "pheasant",
  ];
  // Additional feed types can also be "starter", "grower", "finisher"
  const validFeedTypes = ["layer", "breeder"];
  const poultryAgeLimits = {
    chicken: 104,
    duck: 156,
    turkey: 104,
    goose: 156,
    quail: 52,
    pheasant: 52,
  };

  // @ts-ignore
  if (isInvalidString(payload.feedType)) {
    errors.push(`feedType='${payload.feedType}' cannot be empty`);
  }
  // @ts-ignore
  if (isInvalidString(payload.typeOfPoultry)) {
    errors.push(`typeOfPoultry='${payload.typeOfPoultry}' cannot be empty`);
  } 
  // @ts-ignore
  // Validate typeOfPoultry
  if (!validPoultryTypes.includes(payload.typeOfPoultry)) {
    errors.push(
      "Invalid typeOfPoultry. Must be one of: " + validPoultryTypes.join(", ")
    );
  }
  // @ts-ignore
  // Validate age_weeks
  if (payload.age_weeks < 0) {
    errors.push("Invalid age_weeks. Must be a non-negative integer.");
  } else if (
    poultryAgeLimits[payload.typeOfPoultry] &&
    payload.age_weeks > poultryAgeLimits[payload.typeOfPoultry]
  ) {
    // @ts-ignore
    errors.push(
      `Invalid age_weeks for ${payload.typeOfPoultry}. Must not exceed ${
        poultryAgeLimits[payload.typeOfPoultry]
      } weeks`
    );
  }
  // @ts-ignore
  // Validate feedType
  if (!validFeedTypes.includes(payload.feedType)) {
    errors.push(
      "Invalid feedType. Must be one of: " + validFeedTypes.join(", ")
    );
  }

  // Validate vaccination_weeks
  if (payload.vaccination_weeks > payload.age_weeks) {
    errors.push("Invalid vaccination_weeks. Must not exceed age_weeks.");
  }
  return errors;
}

// a workaround to make uuid package work with Azle
globalThis.crypto = {
  // @ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);

    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }

    return array;
  },
};
