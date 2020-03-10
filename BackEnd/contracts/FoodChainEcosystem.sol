pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "../node_modules/@openzeppelin/contracts/Math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/utils/Address.sol";

contract FoodChainEcosystem {
    using SafeMath for uint;
    using Address for address;
    address contractOwner;

    constructor() public { 
        contractOwner = msg.sender;
    }

    struct userInformation {
        bool isProducer;
        bool isProcessor;
        bool isRetailer;
        uint256 produceQuantity;
        uint256 packageQuantity;
    }

    mapping(address => userInformation) private _userInformations;
    event RegisteredProducer(address producerAddress);
    event RegisteredProcessor(address processorAddress);
    event RegisteredRetailer(address retailerAddress);

    modifier isContractOwner() {
        require(msg.sender == contractOwner, "Only contract owner have access to this function!");
        _;
    }

    modifier isProducer() {
        require(_userInformations[msg.sender].isProducer == true, "Only registered producers have access to this function!");
        _;
    }

    modifier isProcessor() {
        require(_userInformations[msg.sender].isProcessor == true, "Only registered processors have access to this function!");
        _;
    }

    modifier isRetailer() {
        require(_userInformations[msg.sender].isRetailer == true, "Only registered retailers have access to this function!");
        _;
    }

    modifier isValidPackage(uint256 packageID) {
        require(1 == 1, "Package is invalid");
        _;
    }

    modifier isProcessorAddress(address processor) {
        require(_userInformations[processor].isProcessor == true, "Listed Address is not registered processor!");
        _;
    }

    modifier isRetailerAddress(address processor) {
        require(_userInformations[processor].isRetailer == true, "Listed Address is not registered retailer!");
        _;
    }

    modifier isProduceOwner(uint256 produceID) {
        require(_produceOwner[produceID] == msg.sender, "Only owner of the produce has access to this function!");
        _;
    }

    modifier isPackageOwner(uint256 packageID) {
        require(_packageOwner[packageID] == msg.sender, "Only owner of the package has access to this function!");
        _;
    }

    function registerProducer(address producerAddress) public isContractOwner() {
        _userInformations[producerAddress].isProducer = true;
        emit RegisteredProducer(producerAddress);
    }

    function registerProcessor(address processorAddress) public isContractOwner() {
        _userInformations[processorAddress].isProcessor = true;
        emit RegisteredProcessor(processorAddress);
    }

    function registerRetailer(address retailerAddress) public isContractOwner() {
        _userInformations[retailerAddress].isRetailer = true;
        emit RegisteredRetailer(retailerAddress);
    }

    struct produce {
        bytes produceReferenceID;
        bytes produceName;
        uint dateOfBirth;
        address producer;
    }

    struct package {
        bytes packageReferenceID;
        bytes packageName;
        bytes packagedCategory;
        uint packagedWeight;
        uint packagedDate;
        uint bestBefore;
        address processor;
        address retailer;
        uint256 assetID;
    }

    mapping (uint256 => address) private _produceOwner;
    mapping (uint256 => address) private _packageOwner;

    mapping(uint256 => produce) private _produces;
    mapping(uint256 => package) private _packages;

    mapping (address => produce[]) private _ownedProduceList;
    // maps to address to produce ID to index
    mapping(address => mapping(uint => uint)) private _indexOfProduceList;
    // maps to address to index to produce ID
    mapping(address => mapping(uint => uint)) private _produceIDOfIndexList;

    mapping (address => package[]) private _ownedPackageList;
    mapping(address => mapping(uint => uint)) private _indexOfPackageList;
    mapping(address => mapping(uint => uint)) private _packageIDOfIndexList;

    event CreatedProduce(uint256 produceID);
    event ProcessedProduce(uint256 produceID);
    event CreatedPackage(uint256 packageID);
    event DeliveredPackage(uint256 packageID);
    event SoldPackage(uint256 packageID);

    uint256 totalProduceSupply;
    uint256 totalPackageSupply;

    function createProduce(bytes memory produceReferenceID, bytes memory produceName, uint dateofBirth) public isProducer() {
        produce memory newProduct = produce(produceReferenceID, produceName, dateofBirth, msg.sender);
        _produces[totalProduceSupply] = newProduct;
        _produceOwner[totalProduceSupply] = msg.sender;

        uint256 index = _ownedProduceList[msg.sender].length;
        _indexOfProduceList[msg.sender][totalProduceSupply] = index + 1;
        _produceIDOfIndexList[msg.sender][index + 1] = totalProduceSupply;

        _ownedProduceList[msg.sender].push(newProduct);
        emit CreatedProduce(totalProduceSupply);
        totalProduceSupply = totalProduceSupply.add(1);
        _userInformations[msg.sender].produceQuantity = _userInformations[msg.sender].produceQuantity.add(1);
    }

    function sendForProcessing(uint256 produceID, address processor) public 
    isProducer() isProduceOwner(produceID) isProcessorAddress(processor) {
        _produceOwner[produceID] = processor;
        // Retrieve the selected produce and it's respective index on the producer owned array
        uint256 producerArrayLength = _ownedProduceList[msg.sender].length;
        uint256 produceOldIndex = _indexOfProduceList[msg.sender][produceID];
        produce memory transferringProduce = _ownedProduceList[msg.sender][produceOldIndex - 1];
        uint256 swappedProduceID = _produceIDOfIndexList[msg.sender][producerArrayLength];
        // Swapping selected produce with the last in array and deleting off the last one
        // updates the index of the swapped produce
        _produceIDOfIndexList[msg.sender][producerArrayLength] = 0;
        _produceIDOfIndexList[msg.sender][produceOldIndex] = swappedProduceID;

        _indexOfProduceList[msg.sender][swappedProduceID] = produceOldIndex;
        _indexOfProduceList[msg.sender][produceID] = 0;

        _ownedProduceList[msg.sender][produceOldIndex - 1] = _ownedProduceList[msg.sender][producerArrayLength - 1];
        delete _ownedProduceList[msg.sender][producerArrayLength - 1];
        _ownedProduceList[msg.sender].length--;

        uint256 indexProcessor = _ownedProduceList[processor].length;
        _indexOfProduceList[processor][totalProduceSupply] = indexProcessor + 1;
        _produceIDOfIndexList[processor][indexProcessor + 1] = produceID;
        _ownedProduceList[processor].push(transferringProduce);

        _userInformations[msg.sender].produceQuantity = _userInformations[msg.sender].produceQuantity.sub(1);
        _userInformations[processor].produceQuantity = _userInformations[processor].produceQuantity.add(1);
        emit ProcessedProduce(produceID);
    }

    function createPackage(uint256 produceID, 
                            bytes memory packageReferenceID, 
                            bytes memory packageName,
                            bytes memory packagedCategory, 
                            uint packagedWeight, 
                            uint packagedDate, 
                            uint bestBefore) public isProcessor() isProduceOwner(produceID) {
        package memory newPackage = package(packageReferenceID, packageName, packagedCategory, packagedWeight, 
                                            packagedDate, bestBefore, msg.sender, address(0), produceID);
        _packages[totalPackageSupply] = newPackage;
        _packageOwner[totalPackageSupply] = msg.sender;

        uint256 index = _ownedPackageList[msg.sender].length;
        _indexOfPackageList[msg.sender][totalPackageSupply] = index + 1;
        _packageIDOfIndexList[msg.sender][index + 1] = totalPackageSupply;

        _ownedPackageList[msg.sender].push(newPackage);
        emit CreatedPackage(totalPackageSupply);
        totalPackageSupply = totalPackageSupply.add(1);
        _userInformations[msg.sender].packageQuantity = _userInformations[msg.sender].packageQuantity.add(1);
    }

    function sendToRetailer(uint256 packageID, address retailer) public 
    isProcessor() isPackageOwner(packageID) isRetailerAddress(retailer) {
        _packageOwner[packageID] = retailer;
        // Retrieve the selected package and it's respective index on the packager owned array
        uint256 packagerArrayLength = _ownedPackageList[msg.sender].length;
        uint256 packageOldIndex = _indexOfPackageList[msg.sender][packageID];
        _ownedPackageList[msg.sender][packageOldIndex - 1].retailer = retailer;
        package memory transferringPackage = _ownedPackageList[msg.sender][packageOldIndex - 1];
        uint256 swappedPackageID = _packageIDOfIndexList[msg.sender][packagerArrayLength];
        // Swapping selected package with the last in array and deleting off the last one
        // updates the index of the swapped package
        _packageIDOfIndexList[msg.sender][packagerArrayLength] = 0;
        _packageIDOfIndexList[msg.sender][packageOldIndex] = swappedPackageID;

        _indexOfPackageList[msg.sender][swappedPackageID] = packageOldIndex;
        _indexOfPackageList[msg.sender][packageID] = 0;

        _ownedPackageList[msg.sender][packageOldIndex - 1] = _ownedPackageList[msg.sender][packagerArrayLength - 1];
        delete _ownedPackageList[msg.sender][packagerArrayLength - 1];
        _ownedPackageList[msg.sender].length--;

        uint256 indexRetailer = _ownedPackageList[retailer].length;
        _indexOfPackageList[retailer][totalPackageSupply] = indexRetailer + 1;
        _packageIDOfIndexList[retailer][indexRetailer + 1] = packageID;
        _ownedPackageList[retailer].push(transferringPackage);

        _userInformations[msg.sender].packageQuantity = _userInformations[msg.sender].packageQuantity.sub(1);
        _userInformations[retailer].packageQuantity = _userInformations[retailer].packageQuantity.add(1);
        emit DeliveredPackage(packageID);
    }

    function sellPackage(uint256 packageID) public isRetailer() isValidPackage(packageID) isPackageOwner(packageID) {
        _packageOwner[packageID] = address(0);

        uint256 packagerArrayLength = _ownedPackageList[msg.sender].length;
        uint256 packageOldIndex = _indexOfPackageList[msg.sender][packageID];
        // package memory transferringPackage = _ownedPackageList[msg.sender][packageOldIndex - 1];
        uint256 swappedPackageID = _packageIDOfIndexList[msg.sender][packagerArrayLength];

        _packageIDOfIndexList[msg.sender][packagerArrayLength] = 0;
        _packageIDOfIndexList[msg.sender][packageOldIndex] = swappedPackageID;

        _indexOfPackageList[msg.sender][swappedPackageID] = packageOldIndex;
        _indexOfPackageList[msg.sender][packageID] = 0;

        _ownedPackageList[msg.sender][packageOldIndex - 1] = _ownedPackageList[msg.sender][packagerArrayLength - 1];
        delete _ownedPackageList[msg.sender][packagerArrayLength - 1];
        _ownedPackageList[msg.sender].length--;

        _userInformations[msg.sender].packageQuantity = _userInformations[msg.sender].packageQuantity.sub(1);
        emit SoldPackage(packageID);
    }

    // Getter functions; publiv view methods which are free //

    function getProduceInformation(uint256 produceID) public view returns (produce memory) {
        address owner = _produceOwner[produceID];
        uint256 produceIndex = _indexOfProduceList[owner][produceID];
        return _ownedProduceList[owner][produceIndex];
    }


    function getNumberProduce(address selectedUser) public view returns (uint256) {
        // return _userInformations[selectedUser].produceQuantity;
        return _ownedProduceList[selectedUser].length;
    }

    function getNumberPackage(address selectedUser) public view returns (uint256) {
        // return _userInformations[selectedUser].packageQuantity;
        return _ownedPackageList[selectedUser].length;
    }

    function getProduceOwner(uint256 produceID) public view returns (address) {
        return _produceOwner[produceID];
    }

    function getProduceIndex(uint256 produceID, address owner) public view returns (uint256) {
        return _indexOfProduceList[owner][produceID];
    }

    function getProduceIDFromIndex(uint256 index, address owner) public view returns (uint256) {
        return _produceIDOfIndexList[owner][index];
    }

    function getProduceNameFromIndex(uint256 index, address owner) public view returns (bytes memory) {
        return _ownedProduceList[owner][index].produceName;
    } 

    function getProduceOwned(address ownerAddress) public view returns (produce[] memory) {
        return _ownedProduceList[ownerAddress];
    }

    function getPackageOwner(uint256 packageID) public view returns (address) {
        return _packageOwner[packageID];
    }

    function getPackageIndex(uint256 packageID, address owner) public view returns (uint256) {
        return _indexOfPackageList[owner][packageID];
    }

    function getPackageIDFromIndex(uint256 index, address owner) public view returns (uint256) {
        return _packageIDOfIndexList[owner][index];
    }

    function getPackagesOwned(address ownerAddress) public view returns (package[] memory) {
        return _ownedPackageList[ownerAddress];
    }



    // Internal functions for manipulation, will not be exposed to public
    function _toBytes(uint256 x) internal pure returns (bytes memory b) {
    b = new bytes(32);
    for (uint i = 0; i < 32; i++) {
        b[i] = byte(uint8(x / (2**(8*(31 - i))))); 
        }
    }

    function _convertIntToString(uint256 _number) internal pure returns (string memory) {
        uint256 _tmpN = _number;
        if (_tmpN == 0) {
            return "0";
        } 
        uint256 j = _tmpN;
        uint256 length = 0;
        while (j != 0){
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length - 1;
        while (_tmpN != 0) {
            bstr[k--] = byte(uint8(48 + _tmpN % 10));
            _tmpN /= 10;
        }
        return string(bstr);
    }

    function _append(string memory a, string memory b) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }
}