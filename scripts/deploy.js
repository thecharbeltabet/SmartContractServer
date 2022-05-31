const main = async () => {
  const contractFactory = await ethers.getContractFactory("BackendContract");
  const contract = await contractFactory.deploy();
  await contract.deployed();

  console.log("The address of your contract: ", contract.address);
};

const Deploy = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

Deploy();
