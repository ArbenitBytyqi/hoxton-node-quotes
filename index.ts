import express, { response } from 'express'
import cors from 'cors'
import { authors, quotes } from './data'



const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

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

app.get('/quotes', (req, res) => {
    let quotesToSend = quotes.map(quote => {
        let author = authors.find(author => author.id === quote.authorId)
        return{...quote, author}
    })
    res.send(quotesToSend)
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

app.get('/randomquotes', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const randomItem = quotes[randomIndex]
    res.send(randomItem)
})

app.get('/authors', (req, res) => {
    let authorToSend = authors.map(author => {
        const quotesWithAuthors = quotes.filter(quote => quote.authorId === author.id)
        return {...author, quotes: quotesWithAuthors}
    })
    res.send(authorToSend)
})

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

app.listen(port, () => {
     console.log (`App running on port: ${port} `)
 })
