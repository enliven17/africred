const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying AfriCred Certificates contract to EduChain...");

  // Get the contract factory
  const AfriCredCertificates = await hre.ethers.getContractFactory("AfriCredCertificates");
  
  // Deploy the contract
  const certificatesContract = await AfriCredCertificates.deploy();
  
  // Wait for deployment to complete
  await certificatesContract.waitForDeployment();
  
  const contractAddress = await certificatesContract.getAddress();
  
  console.log("✅ AfriCred Certificates contract deployed successfully!");
  console.log("📋 Contract Address:", contractAddress);
  console.log("🌐 Network:", hre.network.name);
  console.log("🔗 Explorer URL:", `https://edu-chain-testnet.blockscout.com/address/${contractAddress}`);
  
  // Verify the contract on Etherscan
  console.log("🔍 Verifying contract on Etherscan...");
  
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [],
    });
    console.log("✅ Contract verified successfully on Etherscan!");
  } catch (error) {
    console.log("⚠️ Contract verification failed:", error.message);
  }
  
  console.log("\n🎉 Deployment completed!");
  console.log("📝 Next steps:");
  console.log("1. Update the contract address in your frontend");
  console.log("2. Test the contract functions");
  console.log("3. Start issuing certificates!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }); 