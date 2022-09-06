import express, { response } from 'express'
import cors from 'cors'
import Database from "better-sqlite3";

const db = Database ("./db/data.db", {verbose: console.log})
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

const getAllQuotes = db.prepare(`
SELECT * FROM quotes;
`)

const getOneQuote = db.prepare(`
SELECT * FROM quotes WHERE id = ?;
`)

const createQuote = db.prepare(`
    INSERT INTO quotes (description, authorId) VALUES (?, ?);
`)

const deleteQuote = db.prepare(`
DELETE FROM quotes WHERE id = ?;
`)

const updateQuote = db.prepare(`
UPDATE quotes SET description = @description, authorId = @authorId WHERE id = @id;
`)

app.get('/quotes', (req, res) => {
    const quotes = getAllQuotes.all()
    res.send(quotes)
})

app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const oneQuote = getOneQuote.get(id)

    if(oneQuote){
        res.send(oneQuote)
    }else{
        res.status(404).send({error: 'Quote not found'})
    }
})

app.post('/quotes', (req, res) => {
    const description = req.body.description
    const authorId = req.body.authorId

    let errors: string[] = []

    if (typeof description !== 'string'){
        errors.push('Quote not given')
    }

    if (typeof authorId !== 'number'){
        errors.push('Authors Id not given')
    }

    if (errors.length > 0){
        res.status(400).send({ errors })
    }else{
        const info = createQuote.run(description, authorId)
        const quote = getOneQuote.get(info.lastInsertRowid)
        res.send(quote)
    }
})

app.delete('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const info = deleteQuote.run(id)

    if(info.changes){
        res.send({message: 'Quote successfully deleted.' })
    } else {
        res.status(404).send({error: 'Quote not found 😒.' })
    }
  })

app.patch('/quotes/:id', (req, res) => {
    const info = updateQuote.run({...req.params, ...req.body})
    res.send(info)
})


// //Authors

const getAllAuthors = db.prepare(`
SELECT * FROM authors;
`)

const getOneAuthor = db.prepare(`
SELECT * FROM authors WHERE id = ?;
`)

const createAuthor = db.prepare(`
    INSERT INTO authors (name, age, photo) VALUES (?, ?, ?);
`)

const deleteAuthor = db.prepare(`
DELETE FROM authors WHERE id = ?;
`)

const updateAuthor = db.prepare(`
UPDATE authors SET name = @name, age = @age, photo = @photo WHERE id = @id;
`)

app.get('/authors', (req, res) => {
    const authors = getAllAuthors.all()
    res.send(authors)
})

app.get('/authors/:id', (req, res) => {
    const id = Number(req.params.id)
    const oneAuthor = getOneAuthor.get(id)

    if(oneAuthor){
        res.send(oneAuthor)
    }else{
        res.status(404).send({error: 'Author not found'})
    }
})

app.post('/authors', (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const photo = req.body.photo

    let errors: string[] = []

    if (typeof name !== 'string'){
        errors.push('Name of author not given')
    }

    if (typeof age !== 'number'){
        errors.push('Authors age not given')
    }

    if (typeof photo !== 'string'){
        errors.push('Authors photo not given')
    }

    if (errors.length > 0){
        res.status(400).send({ errors })
    }else{
        const info = createAuthor.run(name, age, photo)
        const author = getOneAuthor.get(info.lastInsertRowid)
        res.send(author)
    }
})

app.delete('/authors/:id', (req, res) => {
    const id = Number(req.params.id)
    const info = deleteAuthor.run(id)

    if(info.changes){
        res.send({message: 'Author successfully deleted.' })
    } else {
        res.status(404).send({error: 'Author not found 😒.' })
    }
  })

  app.patch('/authors/:id', (req, res) => {
    const info = updateAuthor.run({...req.params, ...req.body})
    res.send(info)
})

// //General

app.listen(port, () => {
     console.log (`App running on port: ${port} `)
 })
