const hre = require('hardhat');

async function main() {
  const LifeIsAnIllusion = await hre.ethers.getContractFactory(
    'LifeIsAnIllusion'
  );
  const illusions = await LifeIsAnIllusion.deploy();

  await illusions.deployed();

  console.log('LifeIsAnIllusion deployed to:', illusions.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
