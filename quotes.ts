import express, { response } from 'express'
import cors from 'cors'

let quotes =[
    {
        id:1,
        description: "What color is your Bugatti",
        author: "Andrew Tate",
        age: 37,
        photo: "https://identitynewsroom.com/wp-content/uploads/2022/08/Emory-Andrew-Tate-530x450-1.png"
    },
    {
        id:2,
        description: "A normal life is boring",
        author: "Eminem",
        age: 49,
        photo: "https://stylecaster.com/wp-content/uploads/2022/02/eminem-net-worth.png"
    },
    {
        id:3,
        description: "Real eyes, realize, real lies",
        author: "2Pac",
        age: 25,
        photo: "https://cdns-images.dzcdn.net/images/artist/0df7c9931cdb8de51bb5de1db35116b8/500x500.jpg"
    },
]

const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

app.get('/', (req, res) => {
    res.send("Hello King, this is the home page!")
})

app.get('/quotes', (req, res) => {
    res.send(quotes)
})

app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const match = quotes.find(item => item.id === id)

    if(match){
        res.send(match)
    }else{
        res.status(404).send({error: 'Sorry this item does not exist 😢'})
    }
})

app.get('/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const randomItem = quotes[randomIndex]
    res.send(randomItem)
})

app.post('/quotes', (req, res) => {
    let errors: string[] = []

    if(typeof req.body.description !== 'string'){
        errors.push('Quote is not provided or is not a string')
    }

    if(typeof req.body.author !== 'string'){
        errors.push('Author is not provided or is not a string')
    }

    if(typeof req.body.age !== 'number'){
        errors.push('Age is not provided or is not a number')
    }

    if(typeof req.body.photo !== 'string'){
        errors.push('Photo is not provided or is not a link')
    }

    if (errors.length === 0){
    const newQuote = {
        id: quotes[quotes.length - 1].id + 1,
        description: req.body.description,
        author: req.body.author,
        age: req.body.age,
        photo: req.body.photo   
    }
    quotes.push(newQuote)
    res.send(newQuote)
    } else{
        res.status(400).send({errors: errors})
    }
})

app.listen(port, () => {
     console.log (`App running on port: ${port} `)
 })
