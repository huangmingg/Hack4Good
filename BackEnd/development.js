const CSVtoJSON = require('csvtojson');
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Contract deployment -- Only used during development 
var EcosystemJSON = require("./build/contracts/FoodChainEcosystem.json");
let abi = EcosystemJSON.abi;
let EcosystemContract = new web3.eth.Contract(abi);
EcosystemContract.options.data =  EcosystemJSON.bytecode;
let addressCount = 0;
let producers = [];
let processors = [];
let retailers = [];

var produceSpecies = ["Angus", "Holstein Friesian", "Hereford", "Shorthorn", "Charolais", "Galloway", "Simmental", "Limousin"];
var packageNames = [
                    "Beef Chuck Tender (Chilled)",
                    "Beef Shin Shank (Chilled)",
                    "Bone-In Beef Ribs Tomahawk Prepared (Chilled)",
                    "Angus Beef Ribeye (Chilled)",
                    "Beef Striploin (Chilled)",
                    "Beef Flank Steak (Chilled)",
                    "Beef Rump (Chilled)",
                    "Beef Tenderloin (Chilled)",
                ];

var possiblePackageWeight = [150, 200, 250, 300];

// Random functions to generate sample data
// returns a random number between 0 and b -- map limit capped
function generateRandom(b) {
    return Math.floor((Math.random() * b));
}

function generateRandomProduceWeight() {
    return 900 + generateRandom(200);
}

function generateRandomProduceSpecies() {
    var size = produceSpecies.length;
    return produceSpecies[generateRandom(size)];
}

function generateRandomPackageName() {
    var size = packageNames.length;
    return packageNames[generateRandom(size)];
}

function generateRandomPackageWeight() {
    var size = possiblePackageWeight.length;
    return possiblePackageWeight[generateRandom(size)];
}

// within the last 5 years

function selectRandomProducer() {
    var size = producers.length;
    return producers[generateRandom(size)];
}

function selectRandomProcessor() {
    var size = processors.length;
    return processors[generateRandom(size)];
}

function selectRandomRetailer() {
    var size = retailers.length;
    return retailers[generateRandom(size)];
}

async function generateRandomProduce() {
    var produceReferenceID = web3.utils.asciiToHex(web3.utils.randomHex(12));
    var produceName = web3.utils.asciiToHex(generateRandomProduceSpecies());
    var DOB = Date.now() - generateRandom(60000 * 60 * 24 * 30 * 12 * 4) - (60000 * 60 * 24 * 30 * 12);
    var producerAddress = selectRandomProducer()['ethAddress'];
    await ecosystemInstance.methods.createProduce(produceReferenceID, produceName, DOB).send({from: producerAddress, gas : 1000000});
    var produceID = await ecosystemInstance.methods.getTotalProduce().call(); 
    return [produceID - 1, producerAddress];
}

async function generateRandomPackage(produceID, processorAddress) {
    var packageReferenceID = web3.utils.asciiToHex(web3.utils.randomHex(12));
    var packageName = web3.utils.asciiToHex(generateRandomPackageName());
    var packageCategory = web3.utils.asciiToHex("Poultry");
    var packageWeight = generateRandomPackageWeight();
    var packagedDate = Date.now() - generateRandom(60000 * 60 * 24 * 7) - (60000 * 60 * 24 * 21);
    var bestBefore = packagedDate + (60000 * 60 * 24 * 30);
    console.log(`Packaged Date : ${packagedDate}`);
    console.log(`Packaged Date : ${bestBefore}`);

    await ecosystemInstance.methods.createPackage(produceID, packageReferenceID, packageName, packageCategory, packageWeight, packagedDate, bestBefore).send({from: processorAddress, gas : 1000000});
    var packageID = await ecosystemInstance.methods.getTotalPackage().call(); 
    return packageID - 1;
}


async function fillData() {
    for (i in producers) {
        var numberProduce = 2 + generateRandom(3);
        console.log(`Number of produce for ${producers[i]['shopName']} : ${numberProduce}`);
        for (var j = 0; j < numberProduce; j++) {
            const [produceID, producerAddress] = await generateRandomProduce();
            console.log(`Producer Address : ${producerAddress}`);
            console.log(`Produce ID :${produceID}`)
            var processorAddress = selectRandomProcessor()['ethAddress'];
            await ecosystemInstance.methods.sendForProcessing(produceID, processorAddress).send({from: producerAddress, gas : 1000000});
            var numberPackage = 3 + generateRandom(3);
            console.log(`Number of packages for produce ${produceID} : ${numberPackage}`);
            for (var k = 0; k < numberPackage; k++) {
                var packageID = await generateRandomPackage(produceID, processorAddress);
                console.log(`Package ID: ${packageID}`);
                console.log(`Processor Address: ${processorAddress}`);
                var retailerAddress = selectRandomRetailer()['ethAddress'];
                await ecosystemInstance.methods.sendToRetailer(packageID, retailerAddress).send({from : processorAddress, gas : 1000000});
            }
        }
    }
}

// Ethereum account in the following order
// Contract Owner (Only 1) --> Producers (Pull from records) --> Processors (Pull from records) --> Retailers (Pull from records) --> Consumers (Only 1)

async function parseProducers () {
    console.log("Parsing Producers");
    await CSVtoJSON().fromFile("./_producer.csv")
    .then(results => {
        for (i in results) {
            addressCount++;
            var shopAddress = accounts[addressCount];
            var shopName = `${results[i]['name']} - ${results[i]['category']}`
            producers.push({'shopID': i, 'shopName': shopName, 'country': results[i]['country'],'ethAddress' : shopAddress});
        }
    });
}

async function parseProcessors () {
    console.log("Parsing Processors");
    await CSVtoJSON().fromFile("./_processor.csv")
    .then(results => {
        for (i in results) {  
            addressCount++;
            var shopAddress = accounts[addressCount];
            // var shopAddress = web3.eth.accounts.create().address;
            var shopName = `${results[i]['name']} - ${results[i]['category']}`
            processors.push({'shopID': i, 'shopName': shopName, 'country': results[i]['country'],'ethAddress' : shopAddress});
        }
    });

}

async function parseRetailers () {
    console.log("Parsing Retailers");
    await CSVtoJSON().fromFile("./_retailer.csv")
    .then(results => {    
        for (i in results) {
            addressCount++;
            var shopAddress = accounts[addressCount];
            var shopName = `${results[i]['shop']} - ${results[i]['location']}`; 
            // var shopAddress = web3.eth.accounts.create().address;
            retailers.push({'shopID': i,'shopName' : shopName, 'country': results[i]['country'], 'ethAddress' : shopAddress});
        }
    });
}

async function registerStakeholders () {
    console.log("Registering various stakeholders");
    // Register all producers
    for (i in producers) {
        // console.log(producers[i]);
        await ecosystemInstance.methods.registerProducer(producers[i]['ethAddress']).send({from : contractOwner, gas : 1000000});
    }
    // Register all processors
    for (j in processors) {
        // console.log(processors[j]);
        await ecosystemInstance.methods.registerProcessor(processors[j]['ethAddress']).send({from : contractOwner, gas : 1000000});
    }
    // Register all retailers
    for (k in retailers) {
        // console.log(retailers[k]);
        await ecosystemInstance.methods.registerRetailer(retailers[k]['ethAddress']).send({from : contractOwner, gas : 1000000});
    }
}


async function startNetwork () {
    web3.eth.getAccounts()
    .then(function(result){ 
        global.accounts = result;
        global.contractOwner = result[0];
        EcosystemContract.deploy().send({from: accounts[0], gas: 20000000})
        .then(async function(ecosystemInstance){
            global.ecosystemInstance = ecosystemInstance;
            console.log(`Ecosystem Contract has been deployed at : ${ecosystemInstance.options.address} by ${accounts[0]}`);
            await parseProducers();
            await parseProcessors();
            await parseRetailers();
            await registerStakeholders();
            await fillData();
            })
    .catch(function(error) {
      console.log(error)
        })    
    });
}


module.exports = {
    startNetwork : async function () {
        startNetwork();
    },

    producers : producers,
    processors : processors,
    retailers : retailers
  };