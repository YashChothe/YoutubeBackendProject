import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


  // Configuration
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

// uploading files

const uploadOnCloundinary = async (localFilePath)=>{
   try {
    if(! localFilePath) return null;
    const response =await cloudinary.uploader.upload(localFilePath,{
        resource_type:'auto'
    })
    // file is uploaded on cloudinary 
    console.log("file is uploaded on cloudinary",response.url);
    return response
    
   } catch (error) {

    fs.unlinkSync(localFilePath) // remove the local save temporary file as the uploaded operation got failed
    
   }
}

export {uploadOnCloundinary}






