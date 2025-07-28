const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function updateTokenURI() {
  try {
    console.log("🔧 Updating token URI on contract...");
    
    // Metadata URL'ini oku
    const metadataUrlPath = path.join(__dirname, '..', 'metadata-url.txt');
    let metadataUrl;
    
    if (fs.existsSync(metadataUrlPath)) {
      metadataUrl = fs.readFileSync(metadataUrlPath, 'utf8').trim();
    } else {
      // Eğer dosya yoksa, manuel olarak IPFS URL'ini buraya yazabilirsin
      metadataUrl = "https://ipfs.io/ipfs/YOUR_METADATA_CID";
    }
    
    console.log("📄 Using metadata URL:", metadataUrl);
    
    // Kontrat adresini al (deploy script'inden)
    const contractAddress = "0x6F40A56250fbB57F5a17C815BE66A36804590669";
    const tokenId = 1;
    
    // Kontrat instance'ını al
    const AfriCredCertificates = await hre.ethers.getContractFactory("AfriCredCertificates");
    const contract = AfriCredCertificates.attach(contractAddress);
    
    // Token URI'yi güncelle
    console.log(`🔄 Updating token ${tokenId} URI...`);
    const tx = await contract.updateCertificateURI(tokenId, metadataUrl);
    
    console.log("⏳ Waiting for transaction confirmation...");
    await tx.wait();
    
    console.log("✅ Token URI updated successfully!");
    console.log("📋 Transaction hash:", tx.hash);
    console.log("🔗 Explorer URL:", `https://edu-chain-testnet.blockscout.com/tx/${tx.hash}`);
    
    // Güncellenmiş URI'yi kontrol et
    const newUri = await contract.tokenURI(tokenId);
    console.log("🔍 New token URI:", newUri);
    
  } catch (error) {
    console.error("❌ Update failed:", error);
  }
}

updateTokenURI()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 