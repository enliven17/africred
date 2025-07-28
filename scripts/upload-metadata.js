const { NFTStorage, File } = require('nft.storage');
const fs = require('fs');
const path = require('path');

// NFT.Storage API key - ücretsiz hesap oluşturup alabilirsin
// https://nft.storage/ adresinden API key al ve buraya yaz
const NFT_STORAGE_TOKEN = '29b7bf04.f58b032265bd4f31baf92ff9dc908683';

async function uploadMetadata() {
  try {
    console.log('🚀 Uploading metadata and image to IPFS...');
    
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
    
    // Metadata JSON'ını oku
    const metadataPath = path.join(__dirname, '..', 'metadata.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    
    // Görsel dosyasını oku
    const imagePath = path.join(__dirname, '..', 'public', 'ctf.avif');
    const imageBuffer = fs.readFileSync(imagePath);
    const imageFile = new File([imageBuffer], 'ctf.avif', { type: 'image/avif' });
    
    // Önce görseli yükle
    console.log('📸 Uploading image...');
    const imageCid = await client.storeBlob(imageFile);
    const imageUrl = `https://ipfs.io/ipfs/${imageCid}`;
    
    console.log('✅ Image uploaded:', imageUrl);
    
    // Metadata'da görsel URL'sini güncelle
    metadata.image = imageUrl;
    
    // Metadata'yı yükle
    console.log('📄 Uploading metadata...');
    const metadataFile = new File([JSON.stringify(metadata)], 'metadata.json', { type: 'application/json' });
    const metadataCid = await client.storeBlob(metadataFile);
    const metadataUrl = `https://ipfs.io/ipfs/${metadataCid}`;
    
    console.log('✅ Metadata uploaded:', metadataUrl);
    console.log('🎉 Upload completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Update the contract with this metadata URI:');
    console.log(`   ${metadataUrl}`);
    console.log('2. Run: npx hardhat run scripts/update-token-uri.js --network edu-chain-testnet');
    
    // Metadata URL'ini dosyaya kaydet
    fs.writeFileSync(path.join(__dirname, '..', 'metadata-url.txt'), metadataUrl);
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
}

uploadMetadata(); 