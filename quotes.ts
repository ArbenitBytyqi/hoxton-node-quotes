import express, { response } from 'express'

const quotes =[
    {
        id:1,
        description: "What color is your Bugatti",
        author: "Andrew Tate"
    },
    {
        id:2,
        description: "A normal life is boring",
        author: "Eminem"
    },
    {
        id:3,
        description: "Real eyes, realize, real lies",
        author: "2Pac"
    },
]

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Hello King, this is the home page!")
})

app.get('/quotes', (req, res) => {
    res.send(quotes)
})

app.listen(port, () => {
     console.log (`App running on port: ${port} `)
 })