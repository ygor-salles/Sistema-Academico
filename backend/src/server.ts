import 'reflect-metadata'
import express from 'express'
import './database'

const app = express()

app.get('/', (req, resp) => {
    return resp.json({ message: "Hellow world" })
})



app.listen(3333, () => console.log('Server is runinng!'))