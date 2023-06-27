
 // INFRASTRUCTUR
import * as dotenv from 'dotenv'
import app from './index.js'
dotenv.config()

// const port = process.env.PORT || 8000;

const port =  6000;

app.listen(port, () => {

    console.log(`Server is running on port ${port}`);
} );