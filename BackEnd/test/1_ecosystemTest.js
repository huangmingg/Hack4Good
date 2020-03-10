var FoodChainEcosystem = artifacts.require('../contracts/FoodChainEcosystem.sol');
var web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

/* Summary of testing sequence 
// Do note that ERC20 will not be tested, with the exception of token minting at the start, and token approval for contract transfer.
// I have included a wrapped array for logs generated, with the last test block generating this log, so uncomment this block if you do not wish to see the logs.
// I have also included the console.logs in the respective blocks which are commented out, so uncomment accordingly should you wish to see the logs individually for each test block instead.
// Some of the init numbers are generated randomly (productID, quantity, excessAmount, price) to provide a more rigorous testing
// Testing sequence as follows:
// (1) contract owner will mint ERC20 token to buyer 
// (2) negative testing of registering (a) buyer (b) seller (c) inspector
// (3) positive testing of registering (a) buyer (b) seller (c) inspector
// (4) negative testing of product listing (non-white listed seller)
// (5) seller will list product for sale
// (6) buyer will approve platform with allowance (permission to transfer money)
// (7) check sales ID of transaction block
// (8) negative testing of buying product (non white listed buyer)
// (9) buyer will attempt to buy product
// (10) negative testing of accepting sales (non white listed inspector)
// (11) negative testing of rejecting sales (non white listed inspector)
// (12) inspector will accept sales order
// (13) buyer will attempt to buy product again
// (14) inspector will reject sales order
*/

contract('FoodChainEcosystem', function(accounts) {
        const contractOwner = accounts[0];
        const producer = accounts[1];
        const processor = accounts[2]; 
        const retailer = accounts[3];
        const consumer = accounts[4];
        // twice since buyer will attempt to purchase twice (once will accept, once will reject)
        const logs = [];

        const firstProduceID = 0;
        const FirstProduceReferenceID = web3.utils.asciiToHex("3035307B2831B38310447E03"); 
        const FirstProduceName = web3.utils.asciiToHex("Yao Hong the Cow");
        const FirstProduceDOB = Date.now();

        const secondProduceID = 1;
        const SecondProduceDOB = Date.now();
        const SecondProduceReferenceID = web3.utils.asciiToHex("3035307B2831B38310447DE1");
        const SecondProduceName = web3.utils.asciiToHex("Ryan the Bus");

        const thirdProduceID = 2;
        const ThirdProduceReferenceID = web3.utils.asciiToHex("3035307B2831B38310447E2F");
        const ThirdProduceName = web3.utils.asciiToHex("Yu De the Wolf");
        const ThirdProduceDOB = Date.now();
        
        
        const firstPackageID = 0;
        const secondPackageID = 1;
        const thirdPackageID = 2;

        const firstPackageReferenceID = web3.utils.asciiToHex("ISBN978-0-1234-5678-0");
        const firstPackageName = web3.utils.asciiToHex("Farmland Australia Frozen Marble Sirloin Steak");
        const firstPackageCategory = web3.utils.asciiToHex("Poultry");
        const firstPackagedWeight = 150;
        const firstPackagedDate = Date.now();
        const firstPackageBestBefore = Date.now() + (60000 * 60 * 24 * 30);

        
        const secondPackageReferenceID = web3.utils.asciiToHex("ISBN978-0-1234-5678-1");
        const secondPackageName = web3.utils.asciiToHex("Farmland Australia Frozen Marble Oxtail");
        const secondPackageCategory = web3.utils.asciiToHex("Poultry");
        const secondPackagedWeight = 80;
        const secondPackagedDate = Date.now();
        const secondPackageBestBefore = Date.now() + (60000 * 60 * 24 * 21);

        const thirdPackageReferenceID = web3.utils.asciiToHex("ISBN978-0-1234-5678-1");
        const thirdPackageName = web3.utils.asciiToHex("Farmland Australia Fresh Marble Rib Eye Steak");
        const thirdPackageCategory = web3.utils.asciiToHex("Poultry");
        const thirdPackagedWeight = 300;
        const thirdPackagedDate = Date.now();
        const thirdPackageBestBefore = Date.now() + (60000 * 60 * 24 * 3);


    before(async () => {
        ecosystemInstance = await FoodChainEcosystem.deployed({from : contractOwner});
    });

    it('Should register producer', async () => {
      let registerEvent = await ecosystemInstance.registerProducer(producer, {from : contractOwner})
      .then((result) => {
        return result.logs ? result.logs[0].event : undefined;
      });
      console.log(registerEvent);
      assert.strictEqual(registerEvent, 'RegisteredProducer', 'Register Producer Event did not occur as intended');
    });

    it('Should register processor', async () => {
        let registerEvent = await ecosystemInstance.registerProcessor(processor, {from : contractOwner})
        .then((result) => {
          return result.logs ? result.logs[0].event : undefined;
        });
        console.log(registerEvent);
        assert.strictEqual(registerEvent, 'RegisteredProcessor', 'Register Processor Event did not occur as intended');
      });

      
    it('Should register retailer', async () => {
        let registerEvent = await ecosystemInstance.registerRetailer(retailer, {from : contractOwner})
        .then((result) => {
            return result.logs ? result.logs[0].event : undefined;
        });
        assert.strictEqual(registerEvent, 'RegisteredRetailer', 'Register Retailer Event did not occur as intended');
    });


    it('Should create first produce with produce ID of 0 ', async () => {
        var supposedProduceID = firstProduceID;
        var supposedProduceIndex = 1;
        let createEvent = await ecosystemInstance.createProduce(FirstProduceReferenceID, FirstProduceName, FirstProduceDOB, {from : producer})
        .then((result) => {
            return result.logs ? result.logs[0].event : undefined;
        });
        assert.strictEqual(createEvent, 'CreatedProduce', 'Produce Creation Event did not occur as intended');

        let numberProduce = await ecosystemInstance.getNumberProduce.call(producer);
        assert.strictEqual(numberProduce.toNumber(), 1, 'Produce number not updated as intended');
        
        let produceOwner = await ecosystemInstance.getProduceOwner.call(supposedProduceID);
        assert.strictEqual(produceOwner, producer, 'Producer not updated as intended');

        let produceIndex = await ecosystemInstance.getProduceIndex.call(supposedProduceID, producer);
        assert.strictEqual(produceIndex.toNumber(), supposedProduceIndex, 'Produce index not updated as intended');

        let produceID = await ecosystemInstance.getProduceIDFromIndex.call(produceIndex, producer);
        assert.strictEqual(produceID.toNumber(), supposedProduceID, 'Produce ID not updated as intended');
    });

    it('Should create first produce with produce ID of 1 ', async () => {
        var supposedProduceID = secondProduceID;
        var supposedProduceIndex = 2;
        let createEvent = await ecosystemInstance.createProduce(SecondProduceReferenceID, SecondProduceName, SecondProduceDOB, {from : producer})
        .then((result) => {
            return result.logs ? result.logs[0].event : undefined;
        });
        assert.strictEqual(createEvent, 'CreatedProduce', 'Produce Creation Event did not occur as intended');

        let numberProduce = await ecosystemInstance.getNumberProduce.call(producer);
        assert.strictEqual(numberProduce.toNumber(), 2, 'Produce number not updated as intended');
        
        let produceOwner = await ecosystemInstance.getProduceOwner.call(supposedProduceID);
        assert.strictEqual(produceOwner, producer, 'Producer not updated as intended');

        let produceIndex = await ecosystemInstance.getProduceIndex.call(supposedProduceID, producer);
        assert.strictEqual(produceIndex.toNumber(), supposedProduceIndex, 'Produce index not updated as intended');

        let produceID = await ecosystemInstance.getProduceIDFromIndex.call(produceIndex, producer);
        assert.strictEqual(produceID.toNumber(), supposedProduceID, 'Produce ID not updated as intended');
    });

    it('Should create first produce with produce ID of 2 ', async () => {
        var supposedProduceID = thirdProduceID;
        var supposedProduceIndex = 3;
        let createEvent = await ecosystemInstance.createProduce(ThirdProduceReferenceID, ThirdProduceName, ThirdProduceDOB, {from : producer})
        .then((result) => {
            return result.logs ? result.logs[0].event : undefined;
        });
        assert.strictEqual(createEvent, 'CreatedProduce', 'Produce Creation Event did not occur as intended');

        let numberProduce = await ecosystemInstance.getNumberProduce.call(producer);
        assert.strictEqual(numberProduce.toNumber(), 3, 'Produce number not updated as intended');
        
        let produceOwner = await ecosystemInstance.getProduceOwner.call(supposedProduceID);
        assert.strictEqual(produceOwner, producer, 'Producer not updated as intended');

        let produceIndex = await ecosystemInstance.getProduceIndex.call(supposedProduceID, producer);
        assert.strictEqual(produceIndex.toNumber(), supposedProduceIndex, 'Produce index not updated as intended');

        let produceID = await ecosystemInstance.getProduceIDFromIndex.call(produceIndex, producer);
        assert.strictEqual(produceID.toNumber(), supposedProduceID, 'Produce ID not updated as intended');
    });

    // it("Should get the produce created", async () => {
    //     let produce = await ecosystemInstance.getProduce.call(secondProduceID);
    //     console.log(produce);
    // });

    it('Should send produce 0 for processing and update the relevant details', async () => {
        let transferEvent = await ecosystemInstance.sendForProcessing(firstProduceID, processor, {from : producer})
        .then((result) => {
            return result.logs ? result.logs[0].event : undefined;
        });
        assert.strictEqual(transferEvent, 'ProcessedProduce', 'Produce Processing Event did not occur as intended');

        let producerQuantity = await ecosystemInstance.getNumberProduce.call(producer);
        assert.strictEqual(producerQuantity.toNumber(), 2, 'Produce number not updated as intended');

        let processorQuantity = await ecosystemInstance.getNumberProduce.call(processor);
        assert.strictEqual(processorQuantity.toNumber(), 1, 'Produce number not updated as intended');

        let newProduceOwner = await ecosystemInstance.getProduceOwner.call(firstProduceID);
        assert.strictEqual(newProduceOwner, processor, 'Produce owner not updated as intended');

        let produceIDOfOldIndex = await ecosystemInstance.getProduceIndex.call(firstProduceID, producer);
        assert.strictEqual(produceIDOfOldIndex.toNumber(), 0, 'Produce ID of Old Index not updated as intended');

        let newProduceIDOfOldIndex= await ecosystemInstance.getProduceIDFromIndex.call(1, producer);
        assert.strictEqual(newProduceIDOfOldIndex.toNumber(), 2, 'Produce ID of Old Index not updated as intended');
    })


    it('Should create package 0', async () => {
        let createEvent = await ecosystemInstance.createPackage(firstProduceID, firstPackageReferenceID, firstPackageName, firstPackageCategory, firstPackagedWeight, firstPackagedDate, firstPackageBestBefore , {from : processor})
        .then((result) => {
            return result.logs ? result.logs[0].event : undefined;
        });
        assert.strictEqual(createEvent, "CreatedPackage", 'Package Creation Event not emitted as intended');
    });

    it('Should create package 1', async () => {
        let createEvent = await ecosystemInstance.createPackage(firstProduceID, secondPackageReferenceID, secondPackageName, secondPackageCategory, secondPackagedWeight, secondPackagedDate, secondPackageBestBefore , {from : processor})
        .then((result) => {
            return result.logs ? result.logs[0].event : undefined;
        });
        assert.strictEqual(createEvent, "CreatedPackage", 'Package Creation Event not emitted as intended');
    });

    it('Should create package 2', async () => {
        let createEvent = await ecosystemInstance.createPackage(firstProduceID, thirdPackageReferenceID, thirdPackageName, thirdPackageCategory, thirdPackagedWeight, thirdPackagedDate, thirdPackageBestBefore , {from : processor})
        .then((result) => {
            return result.logs ? result.logs[0].event : undefined;
        });
        assert.strictEqual(createEvent, "CreatedPackage", 'Package Creation Event not emitted as intended');
    });


    it('Should send package 1 to retailer 1', async () => {
        let transferEvent = await ecosystemInstance.sendToRetailer(firstPackageID, retailer, {from : processor})
        .then((result) => {
            return result.logs ? result.logs[0].event : undefined;
        });
        assert.strictEqual(transferEvent, "DeliveredPackage", 'Package Delivered Event not emitted as intended');

        let processorQuantity = await ecosystemInstance.getNumberPackage.call(processor);
        assert.strictEqual(processorQuantity.toNumber(), 2, 'Package number not updated as intended');

        let retailerQuantity = await ecosystemInstance.getNumberPackage.call(retailer);
        assert.strictEqual(retailerQuantity.toNumber(), 1, 'Package number not updated as intended');

        let newPackageOwner = await ecosystemInstance.getPackageOwner.call(firstPackageID);
        assert.strictEqual(newPackageOwner, retailer, 'Package owner not updated as intended');

        let packageIDOfOldIndex = await ecosystemInstance.getPackageIndex.call(firstPackageID, processor);
        assert.strictEqual(packageIDOfOldIndex.toNumber(), 0, 'Package ID of Old Index not updated as intended');

        let newPackageIDOfOldIndex = await ecosystemInstance.getPackageIDFromIndex.call(1, processor);
        assert.strictEqual(newPackageIDOfOldIndex.toNumber(), 2, 'Package ID of Old Index not updated as intended');


    })

    it('Printing logs for debugging', async() => {
        logs.forEach((log) => {
            console.log(log);
        })
    });

});