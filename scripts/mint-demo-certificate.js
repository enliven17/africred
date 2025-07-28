const hre = require("hardhat");

async function mintDemoCertificate() {
  try {
    console.log("🎓 Minting demo certificate...");
    
    // Kontrat adresini al
    const contractAddress = "0x6F40A56250fbB57F5a17C815BE66A36804590669";
    
    // Kontrat instance'ını al
    const AfriCredCertificates = await hre.ethers.getContractFactory("AfriCredCertificates");
    const contract = AfriCredCertificates.attach(contractAddress);
    
    // Demo sertifika verileri
    const studentAddress = "0x1234567890123456789012345678901234567890"; // Demo adres
    const missionTitle = "Blockchain Fundamentals & Smart Contract Development";
    const score = 95;
    const maxScore = 100;
    const studentName = "Demo Student";
    const educatorAddress = "0x9876543210987654321098765432109876543210";
    const certificateHash = "demo_certificate_hash_123";
    const tokenURI = "http://localhost:3000/metadata.json";
    
    // Sertifika oluştur
    console.log("🔄 Creating certificate...");
    const tx = await contract.issueMissionCertificate(
      studentAddress,
      missionTitle,
      score,
      maxScore,
      studentName,
      educatorAddress,
      certificateHash,
      tokenURI
    );
    
    console.log("⏳ Waiting for transaction confirmation...");
    const receipt = await tx.wait();
    
    console.log("✅ Certificate minted successfully!");
    console.log("📋 Transaction hash:", tx.hash);
    console.log("🔗 Explorer URL:", `https://edu-chain-testnet.blockscout.com/tx/${tx.hash}`);
    
    // Token ID'yi al
    const event = receipt.logs.find(log => {
      try {
        const parsed = contract.interface.parseLog(log);
        return parsed.name === 'CertificateIssued';
      } catch {
        return false;
      }
    });
    
    if (event) {
      const parsed = contract.interface.parseLog(event);
      const tokenId = parsed.args.tokenId;
      console.log("🎯 Token ID:", tokenId.toString());
    }
    
  } catch (error) {
    console.error("❌ Mint failed:", error);
  }
}

mintDemoCertificate()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 