const CSVtoJSON = require('csvtojson');
const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

var EcosystemJSON = require("./build/contracts/FoodChainEcosystem.json");

// Contract deployment -- Only used during development 
var EcosystemJSON = require("./build/contracts/FoodChainEcosystem.json");
let abi = EcosystemJSON.abi;
let EcosystemContract = new web3.eth.Contract(abi);
EcosystemContract.options.data =  EcosystemJSON.bytecode;

const firstProduceID = 0;
const firstProduceReferenceID = web3.utils.asciiToHex("3035307B2831B38310447E03"); 
const firstProduceName = web3.utils.asciiToHex("Yao Hong the Cow");
const firstProduceDOB = new Date('03-05-2018').getTime();

const firstPackageID = 0;
const firstPackageReferenceID = web3.utils.asciiToHex("ISBN978-0-1234-5678-6");
const firstPackageName = web3.utils.asciiToHex("Farmland Frozen Australia Marble Sirloin Steak");
const firstPackageCategory = web3.utils.asciiToHex("Poultry");
const firstPackagedWeight = 150;
const firstPackagedDate = Date.now();
const firstPackageBestBefore = Date.now() + (60000 * 60 * 24 * 30);

const secondPackageID = 1;
const secondPackageReferenceID = web3.utils.asciiToHex("ISBN978-0-1234-5678-1");
const secondPackageName = web3.utils.asciiToHex("Farmland Australia Frozen Marble Oxtail");
const secondPackageCategory = web3.utils.asciiToHex("Poultry");
const secondPackagedWeight = 80;
const secondPackagedDate = Date.now();
const secondPackageBestBefore = Date.now() + (60000 * 60 * 24 * 21);

const thirdPackageID = 2;
const thirdPackageReferenceID = web3.utils.asciiToHex("ISBN978-0-1234-5678-3");
const thirdPackageName = web3.utils.asciiToHex("Farmland Australia Fresh Marble Rib Eye Steak");
const thirdPackageCategory = web3.utils.asciiToHex("Poultry");
const thirdPackagedWeight = 300;
const thirdPackagedDate = Date.now();
const thirdPackageBestBefore = Date.now() + (60000 * 60 * 24 * 3);

let retailers;


module.exports = {
    startNetwork : async function () {
        web3.eth.getAccounts()
        .then(function(result){ 
            global.accounts = result;
            global.contractOwner = result[0];
            global.producer = result[1];
            global.processor = result[2];
            global.retailerOne = result[3];
            global.retailerTwo = result[4];
            global.retailerThree = result[5];
            global.consumer = result[6];
            EcosystemContract.deploy()
        .send({
            from: accounts[0],
            gas: 20000000
              })
        .then(async function(ecosystemInstance){
            global.ecosystemInstance = ecosystemInstance
            console.log(`Ecosystem Contract has been deployed at : ${ecosystemInstance.options.address} by ${accounts[0]}`)
            await ecosystemInstance.methods.registerProducer(producer).send({from : contractOwner, gas : 1000000});
            await ecosystemInstance.methods.registerProcessor(processor).send({from : contractOwner, gas : 1000000});
            await ecosystemInstance.methods.registerRetailer(retailerOne).send({from : contractOwner, gas : 1000000});
            await ecosystemInstance.methods.registerRetailer(retailerTwo).send({from : contractOwner, gas : 1000000});
            await ecosystemInstance.methods.registerRetailer(retailerThree).send({from : contractOwner, gas : 1000000});
    
            await ecosystemInstance.methods.createProduce(firstProduceReferenceID, firstProduceName, firstProduceDOB).send({from : producer,  gas: 1000000});
            await ecosystemInstance.methods.sendForProcessing(firstProduceID, processor).send({from : producer, gas : 1000000});
            await ecosystemInstance.methods.createPackage(firstProduceID, firstPackageReferenceID, firstPackageName, firstPackageCategory, firstPackagedWeight, firstPackagedDate, firstPackageBestBefore).send({from : processor, gas : 1000000});
            await ecosystemInstance.methods.createPackage(firstProduceID, secondPackageReferenceID, secondPackageName, secondPackageCategory, secondPackagedWeight, secondPackagedDate, secondPackageBestBefore).send({from : processor, gas : 1000000});
            await ecosystemInstance.methods.createPackage(firstProduceID, thirdPackageReferenceID, thirdPackageName, thirdPackageCategory, thirdPackagedWeight, thirdPackagedDate, thirdPackageBestBefore).send({from : processor, gas : 1000000});
            
            await ecosystemInstance.methods.sendToRetailer(firstPackageID, retailerOne).send({from : processor, gas : 10000000});
            await ecosystemInstance.methods.sendToRetailer(secondPackageID, retailerOne).send({from : processor, gas : 1000000});
            await ecosystemInstance.methods.sendToRetailer(thirdPackageID, retailerOne).send({from : processor, gas : 1000000});
            })
        .catch(function(error) {
          console.log(error)
            })    
        });
    },

    parseRetailers: async function () {
        CSVtoJSON().fromFile("./retailer.csv").then(results => {
            retailers = results;
            for (i in retailers) {
                var shopName = `${retailers[i]['shop']} - ${retailers[i]['location']}`; 
                var shopAddress = web3.eth.accounts.create().address;
                retailers[i]['ethAddress'] = shopAddress;
            }
            // console.log(retailers);
        })
        
    }
  };