import connectDB from './db/index.js';
import dotenv from 'dotenv'
import { app } from './app.js';
dotenv.config({
    path: './env'
})


try
{
    connectDB().then(() =>
    {
        app.listen(process.env.PORT || 8000, () =>
        {
            console.log(`server running at port : ${process.env.PORT || 8000}`)
            app.on("error", (error) =>
            {
                console.log("ERROR", error)
                throw error
            })
        }

        )

    }).catch((error) =>
    {
        console.log("mongodb connection fail", error)
    })
} catch (error)
{

}
