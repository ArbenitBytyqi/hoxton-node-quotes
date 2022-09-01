import express, { response } from 'express'
import cors from 'cors'
import { authors, quotes } from './data'



const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

//Home Page

app.get('/', (req, res) => {
    res.send(`
    <h1>Hello King, this is a quotes app.</h1>
    <h2>Available pages:</h2>
    <ul>
        <li><a href="/quotes">Quotes</a></li>
        <li><a href="/authors">Authors</a></li>
    </ul>
    `)
})

//Quotes

app.get('/quotes', (req, res) => {
    let quotesToSend = quotes.map(quote => {
        let author = authors.find(author => author.id === quote.authorId)
        return{...quote, author}
    })
    res.send(quotesToSend)
})

app.post('/quotes', (req, res) => {
    let errors: string[] = []

    if (typeof req.body.description !== 'string'){
        errors.push('Quote not given')
    }

    if (typeof req.body.authorId !== 'number'){
        errors.push('Author not given')
    }

    let author = authors.find(author => author.id === req.body.authorId)
    if (!author){
        errors.push('Author does not exist')
    }

    if (errors.length === 0){
        const newQuote = {
            id: quotes.length === 0 ? 1 : quotes[quotes.length - 1].id + 1, 
            description: req.body.description,
            authorId: req.body.authorId
        }
        quotes.push(newQuote)
        res.send(newQuote)
    } else{
        res.status(400).send({errors})
    }
})

app.delete('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const indexToDelete = quotes.findIndex(quote => quote.id === id)

    if (indexToDelete > -1) {
        quotes.splice(indexToDelete, 1)
        res.send({message: 'Quote deleted successfully.😊'})
    }else{
        res.status(404).send({error: 'Quote not found. 😒'})
    }

})

app.patch('/quotes/:id', (req, res) => {
    let id = Number(req.params.id)
    let match = quotes.find(quote => quote.id === id)

    if(match){
        if(req.body.description){
            match.description = req.body.description
        }

        if(req.body.authorId){
            match.authorId = req.body.authorId
        }

        res.send({match})
    } else {
        res.status(404).send({error: "Quote not found! 😒"})
    }
})

//Quotes extra stuff

app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const match = quotes.find(item => item.id === id)

    if(match){
        res.send(match)
    }else{
        res.status(404).send({error: 'Sorry this item does not exist 😢'})
    }
})

app.get('/randomquotes', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const randomItem = quotes[randomIndex]
    res.send(randomItem)
})

//Authors

app.get('/authors', (req, res) => {
    let authorToSend = authors.map(author => {
        const quotesWithAuthors = quotes.filter(quote => quote.authorId === author.id)
        return {...author, quotes: quotesWithAuthors}
    })
    res.send(authorToSend)
})

app.post('/authors', (req, res) => {
    let errors: string[] = []

    if (typeof req.body.name !== 'string'){
        errors.push('Authors name not given')
    }

    if (typeof req.body.age !== 'number'){
        errors.push('Authors age not given')
    }

    if (typeof req.body.photo !== 'string'){
        errors.push('Photo of the author is not given')
    }

    if (errors.length === 0){
        const newAuthor = {
            id: authors.length === 0 ? 1 : authors[authors.length - 1].id + 1, 
            name: req.body.name,
            age: req.body.age,
            photo: req.body.photo
        }
        authors.push(newAuthor)
        res.send(newAuthor)
    } else{
        res.status(400).send({errors})
    }
})

app.delete('/authors/:id', (req, res) =>{
    const id = Number(req.params.id)
    const indexToDelete = authors.findIndex(author => author.id === id)

    if (indexToDelete > -1) {
        authors.splice(indexToDelete, 1)
        res.send({message: 'Author deleted successfully.😊'})
    }else{
        res.status(404).send({error: 'Author not found. 😒'})
    }

})

app.patch('/authors/:id', (req, res) => {
    let id = Number(req.params.id)
    let match = authors.find(author => author.id === id)

    if(match){
        if(req.body.name){
            match.name = req.body.name
        }

        if(req.body.age){
            match.age = req.body.age
        }

        if(req.body.photo){
            match.photo = req.body.photo
        }

        res.send({match})
    } else {
        res.status(404).send({error: "Author not found! 😒"})
    }
})

//Authors extra stuff

app.get('/authors/:id', (req, res) => {
    const id = Number(req.params.id)
    const match = authors.find(item => item.id === id)

    if(match){
        res.send(match)
    }else{
        res.status(404).send({error: 'Sorry this item does not exist 😢'})
    }
})

app.get('/randomauthors', (req, res) => {
    const randomIndex = Math.floor(Math.random() * authors.length)
    const randomItem = authors[randomIndex]
    res.send(randomItem)
})

//General

app.listen(port, () => {
     console.log (`App running on port: ${port} `)
 })
