
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { User } from "../models/user.models.js"
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) =>
{
    //get user detail from frontend
    //validation - not empty
    //check if user already exist or not: username ,email
    // check for image ,check for avatar
    //upload them to cloudinary avatar
    //create user object-create entry in db
    //remove password and refresh token field from response
    //check for user creation 
    //return res

    const { fullName, email, userName, password } = req.body;


    if ([fullName, email, userName, password].some((field) => field?.trim() === '')
    )
    {
        throw new ApiError(400, "fill all required")

    }
    if (!email.includes("@gmail"))
    {
        throw new ApiError(400, "email should include @gmail required")
    }

    console.log(fullName, email, userName, password)
    const existedUser = User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser)
    {
        throw new ApiError(400, "user with email is exist");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImag[0]?.path;
    console.log(req.files?.avatar[0]?.path);
    if (
        !avatarLocalPath
    )
    {
        throw new ApiError(400, "avatar required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar)
    {
        throw new ApiError(400, "avatar required")
    }
    const user = await User.create({
        userName: userName.toLowerCase()
        , email, fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || '',
        password


    })
    const userCreated = await User.findById(user._id).select("-password -refreshTOken")

    if (!userCreated)
    {
        throw ApiError(500, "user is not created  something wrong while registering")
    }
    return res.status(201).json(
        new ApiResponse(200, userCreated, "user registered successfully")
    )

})


export { registerUser }