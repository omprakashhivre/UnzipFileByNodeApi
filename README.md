# UnzipFileByNodeApi

Welcome to the UnzipFileByNodeApi project! This project aims to provide a Node.js API for uploading zip files, decompressing/unzipping them, and storing the contents.

## Project Overview

This project facilitates the uploading of zip files through a Node.js API. Upon receiving a zip file, the API will decompress/unzip the file and store its contents in the backend storage.

## Features

- **Zip File Upload**: Users can upload zip files through the provided API endpoint.
- **File Decompression**: The API automatically decompresses/unzips the uploaded zip files.
- **File Storage**: The contents of the zip files are stored in the backend storage system.
- **API Endpoint**: Provides a secure endpoint for uploading and processing zip files.

## Technologies Used

### Backend

- **Node.js**: Provides the runtime environment for the API server.
- **Express.js**: Handles API routing and middleware functionality.
- **Multer**: Middleware for handling file uploads.
- **Adm-zip**: Library for decompressing/unzipping zip files.

## Installation and Setup

1. Clone the repository:

```bash
git clone [https://github.com/your-username/UnzipFileByNodeApi.git](https://github.com/omprakashhivre/UnzipFileByNodeAp)
```

Navigate to the project directory:
```bash
cd UnzipFileByNodeApi
```

Install dependencies:
```bash
npm install
```

Run the server:
```bash
npm start
```

The API server should now be running at the specified port.
API Usage
Uploading a Zip File
Send a POST request to the /upload endpoint with the zip file as a form-data field named file.

Example using cURL:
```bash
curl -X POST -F "file=@/path/to/your/file.zip" http://localhost:5005/upload
```
