var express = require('express');
var router = express.Router();
var cors = require('cors')
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));


var devTools = require('../development.js');


function handlePackageInformation(listOfPackages) {
  final_output = []
  for (item in listOfPackages) {    
    formatted_output = {
                      "Package Reference ID" : web3.utils.hexToAscii(listOfPackages[item][0]),
                      "Package Name" : web3.utils.hexToAscii(listOfPackages[item][1]),
                      "Package Category" : web3.utils.hexToAscii(listOfPackages[item][2]),
                      "Package Weight" : listOfPackages[item][3],
                      "Processed Date" : new Date(parseInt(listOfPackages[item][4])).toLocaleDateString(),
                      "Best Before" : new Date(parseInt(listOfPackages[item][5])).toLocaleDateString(),
                      "Processor" : getProcessorName(listOfPackages[item][6]),
                      "Asset ID" : listOfPackages[item][8]}
    final_output.push(formatted_output);
  } 
  return final_output;
}

function handleDetailedInformation(produceInformation) {
  const [producerName, producerOrigin] = getProducerName(produceInformation[3]); 
  console.log(producerName);
  console.log(producerOrigin);
  formatted_output = {
                      "ProduceRefID" : web3.utils.hexToAscii(produceInformation[0]),
                      "Produce Name" : web3.utils.hexToAscii(produceInformation[1]),
                      "Date of Birth" : new Date(parseInt(produceInformation[2])).toLocaleDateString(),
                      "Producer" : producerName,
                      "Country" : producerOrigin};
  return formatted_output;
}

function getProcessorName(processorAddress) {
  processors = devTools.processors;
  var result = processors.filter((object) => {
    return object['ethAddress'] === processorAddress
  })
  return `${result[0]['shopName']} (${result[0]['country']})`;
}

function getProducerName(producerAddress) {
  producers = devTools.producers;
  var result = producers.filter((object) => {
    return object['ethAddress'] === producerAddress
  })
  return [result[0]['shopName'],result[0]['country']];
}

router.get('/stock/levels', cors(), async function(req, res, next) {
  retailers = devTools.retailers;
  output = []
  for (retailer in retailers) {
    var address = retailers[retailer]['ethAddress'];
    await ecosystemInstance.methods.getPackagesOwned(address).call()
    .then(function(result) {
      console.log(result);
      result = handlePackageInformation(result);
      output.push({"shop_name" : retailers[retailer]['shopName'], "res":result});
    })
    .catch(function(err) {
      console.log(err);
    })
  } 
  if (output.length) {
      res.send({'success' : true, 'message': output})
  } else {
      res.send({'success' : true, 'message': output})
  }
});


router.get('/package/information', cors(), async function(req, res, next) {
  var produceID = req.query.produceID;
  await ecosystemInstance.methods.getProduceInformation(produceID).call()
  .then(function(result) {
    output = handleDetailedInformation(result);
    res.send({'success' : true, 'message': output});
  })
  .catch(function(err) {
    res.send({'success' : false, 'message': err});   
  })
});


module.exports = router;


