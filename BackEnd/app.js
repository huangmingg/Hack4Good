var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var cors = require('cors')
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));



var indexRouter = require('./routes/index');
var truffleRouter = require('./routes/truffle');

var app = express();

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.options('*', cors(corsOptions))


app.use('/', indexRouter);
app.use('/truffle', truffleRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



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
const firstPackageCategory = web3.utils.asciiToHex("");
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
const thirdPackageReferenceID = web3.utils.asciiToHex("ISBN978-0-1234-5678-1");
const thirdPackageName = web3.utils.asciiToHex("Farmland Australia Fresh Marble Rib Eye Steak");
const thirdPackageCategory = web3.utils.asciiToHex("Poultry");
const thirdPackagedWeight = 300;
const thirdPackagedDate = Date.now();
const thirdPackageBestBefore = Date.now() + (60000 * 60 * 24 * 3);

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


module.exports = app;
