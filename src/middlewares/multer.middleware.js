import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
        cd(null, './public/temp ')
    },
    filename: function (req, file, cd)
    {
        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        // cd(null, file.fieldname + '-' + uniqueSuffix)
        cd(null, file.originalname)
    }
})
export const uploads = multer({ storage: storage })