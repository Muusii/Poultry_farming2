
# POULTRY_FARMING DAPP.
![chicken](https://github.com/Muusii/poultry_farming1/assets/159922924/458e1121-36a6-4361-93d6-3c557d123dcd)

This real estate canister is a decentralized ICP canister which manages records for broilers, layers, and eggs. 
The unique feature for this Canister is NFC(Near Field Communication) technology that generates Unique ID TAG for each Poultry record from farm raising upto table tracking for transparency where customers can scan and know all the details entailing the poultry type they want to buy.
The application provides functionalities to create records, update availability after sale, retrieve records by ID, and fetch all records.
It focuses on transparency of poultry products to mitigate theft by employees.

## FIELDS.
+ typeOfPoultry -- either layers or broilers.
+ age_weeks -- age of chickens in weeks.
+ feedType -- either layerfeed or broilerfeed.
+ vaccination_weeks -- the week the poultry record was vaccinated.
+ nfcTagId -- Near Field Communication (NFC) tag where is given to a certain poultry record where customers can scan to know the details for transparency.
+ id --specifies the identity of chickens.
+ createdAt -- shows when certain details were recorded.
+ numberOfBroilers -- number to be recorded.
+ numberOfLayers -- number to be recorded.
+ breed -- is either red,cornish and delaware.

## How to fill the candid fields for:
+ createBroilers -- you enter age_weeks,numberOfBroilers and breed.
+ createLayers -- you enter age_weeks,numberOfLayers and breed.
+ createPoultryRecord -- you enter typeOfPoultry,age_weeks,feedType and vaccination_weeks.


## FEATURES.
### Broilers.
+ Create Broilers: Create records for broilers with details such as age, number of broilers, and breed.
+ Update Availability: Update the availability of broilers after sale.
+ Retrieve by ID: Retrieve broiler records by their unique identifier.
+ Fetch All Broilers: Retrieve all broiler records stored in the database.

### Layers.
+ Create Layers: Create records for layers with details such as age, number of layers, and breed.
+ Update Availability: Update the availability of layers after sale.
+ Retrieve by ID: Retrieve layer records by their unique identifier.
+ Fetch All Layers: Retrieve all layer records stored in the database.

### Eggs.
+ Add Laid Eggs: Add records for laid eggs specifying the breed and quantity.
+ Update Egg Availability: Update the availability of eggs after sale.
+ Add Damaged Eggs: Add records for damaged eggs specifying the breed and quantity.
+ Retrieve by ID: Retrieve egg records by their unique identifier.
+ Fetch All Eggs: Retrieve all egg records stored in the database.



## Environment setup.

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)


## Running Canister
+ Clone my repository:
```
git clone https://github.com/Muusii/poultry_farming
```
```
cd poultry_farming
```
+ View the code:
```
code .
```
+ Start the canister:
```
dfx start --background
```
+ Deploy the canister:
```
dfx deploy
```
+ Update changes:
```
dfx start --background --clean
```
## Interacting with the Canister

After deploying the canister, you can interact with it using the following commands:
`dfx canister call` or by integrating it into your front-end application.

### Example: Create new broilers bought
```
dfx canister call linkedIn createPost '{
    "age": 6;
    "numberOfBroilers": 4500;
    "breed": "Red"
    }'
```
### Example: Get all Broilers.
```
dfx canister call poultry_farming getAllBroilers
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

## Contributions
Please feel free to start an issue or send a pull request if you discover any bugs, have ideas, or would like to add new functionality.

## License
This project is licensed under the MIT License.
