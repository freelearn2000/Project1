const azureStorage = require('azure-storage');
const { BlobServiceClient, StorageSharedKeyCredential, } = require("@azure/storage-blob");
import path from 'path'

const azureBlobStorageService = () => {

  // Enter your storage account name and shared key
  const account = process.env.AZURE_STORAGENAME;
  const accountKey = process.env.AZURE_STORAGEKEY;
  const containerName = process.env.AZURE_BLOBNAME;
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  const downloadBlob = async (blobName: any, downloadFilePath: any) => {
    return new Promise((resolve, reject) => {
      const name = path.basename(blobName);
      const blobService = azureStorage.createBlobService(account, accountKey);
      blobService.getBlobToLocalFile(containerName, blobName, path.resolve(__dirname, `${downloadFilePath}${name}`), function (error: any, serverBlob: any) {
        if (error) {
          reject(error);
        } else {
          resolve(downloadFilePath);
        }
      });
    });
  };

  async function main() {
    const containerClient = await blobServiceClient.getContainerClient(containerName);
    for await (const blob of containerClient.listBlobsFlat()) {
      const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
      downloadBlob(blob.name, '../../../nodeapp/build/');
      const downloadBlockBlobResponse = await blockBlobClient.download(0);
      console.log("\nDownloaded blob content...");
    }
  }
  main();

}

export default azureBlobStorageService;
