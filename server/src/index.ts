import express from 'express'
import cors from 'cors'

import Routes from './Routes'

const app = express()
app.use(cors())
const port = 3001

Routes.setup(app);

app.listen(port, () => console.log(`express listening on port ${port}`))
