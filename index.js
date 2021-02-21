import express from 'express'
import cors from 'cors'
import { calculatePercent } from './utlity.js'

const defaultEndpoint = (_,res) => {
    res.status(404).send({ error: "Непозната путања" })
}

const app = express()
app.use(express.json())
app.use(cors())

let prihodi = [
    { 
        id: 1,
        desc:'dskfs',
        value: 5498
    }
]

let rashodi = [
    { 
        id: 1,
        desc:'fdhfghf',
        value: 5497.7,
        percent: 1
    }
]

// --- Руте
app.get('/prihodi',(_,res) => {
    res.json(prihodi)
})

app.get('/rashodi',(_,res) => {
    res.json(rashodi)
})

app.post('/prihodi',(req,res) => {
    if(isNaN(Number(req.body.value))){
        res.status(400).send({ "error":"Value must be a number" })
        return
    }
    const id = Math.max(0,...prihodi.map(p => p.id)) + 1 
    const noviPrihod = req.body
    noviPrihod.value = Number(noviPrihod.value)
    noviPrihod.id = id
    prihodi.push(noviPrihod)

    rashodi.forEach(rashod => {
        rashod.percent = calculatePercent(prihodi,rashod)
    })

    res.json(noviPrihod)
})
app.post('/rashodi',(req,res) => {
    if(isNaN(Number(req.body.value))){
        res.status(400).send({ "error":"Value must be a number" })
        return
    }
    const id = Math.max(0,...rashodi.map(p => p.id)) + 1 
    const noviRashod = req.body
    noviRashod.value = Number(noviRashod.value)
    noviRashod.id = id
    noviRashod.percent = calculatePercent(prihodi,noviRashod)
    
    rashodi.push(noviRashod)
    res.json(noviRashod)
})
app.delete('/prihodi/:id',(req,res) => {
    const id = Number(req.params.id)
    prihodi = prihodi.filter(p => p.id !== id)

    rashodi.forEach(rashod => {
        rashod.percent = calculatePercent(prihodi,rashod)
    })

    res.status(204).end()
})
app.delete('/rashodi/:id',(req,res) => {
    const id = Number(req.params.id)
    rashodi = rashodi.filter(r => r.id !== id)

    res.status(204).end()
})

// Руте ---

app.use(defaultEndpoint)


const PORT = 3005

app.listen(PORT,() => {
    console.log(`Server started at http://localhost:${PORT}`)
})