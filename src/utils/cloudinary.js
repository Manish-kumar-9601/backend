import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs'
cloudinary.config({
    cloud_name: 'diwp1dxi1',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SERECT
});

const uploadOnCloudinary = async (localFilePath) =>
{
    try
    {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: 'auto' }, function (error, result)
        {
            console.log(result, "file is uploaded on cloud", response.url)
        })
        return response;
    } catch (error)
    {
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation got failed
        return null
    }


}
export default cloudinary
// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function(error, result) {console.log(result); });