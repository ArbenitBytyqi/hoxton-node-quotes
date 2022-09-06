import Database from "better-sqlite3";

const db = Database ("./db/data.db", {verbose: console.log})

function createQuoteStuff() {
    const quotes =[
        {
            description: "What color is your Bugatti",
            authorId:1
        },
        {
            description: "A normal life is boring",
            authorId:2
        },
        {
            description: "Real eyes, realize, real lies",
            authorId:3
        },
    ]

    const createQuotesTable = db.prepare(`
        CREATE TABLE IF NOT EXISTS quotes(
        id INTEGER,
        description TEXT NOT NULL,
        authorId INTEGER NOT NULL,
        PRIMARY KEY (id)
        );
    `)
    createQuotesTable.run()

    const deleteAllQuotes = db.prepare(`
        DELETE FROM quotes;
    `)
    deleteAllQuotes.run()

    const createQuote = db.prepare(`
        INSERT INTO quotes (description, authorId) VALUES (?, ?);
    `)

    for (let quote of quotes){
        createQuote.run(quote.description, quote.authorId)
    }

}

function createAuthorStuff(){
    const authors =[
        {
            id:1,
            name: "Andrew Tate",
            age:37,
            photo: "https://identitynewsroom.com/wp-content/uploads/2022/08/Emory-Andrew-Tate-530x450-1.png"
        },
        {
            id:2,
            name: "Eminem",
            age:49,
            photo: "https://stylecaster.com/wp-content/uploads/2022/02/eminem-net-worth.png"
        },
        {
            id:3,
            name: "2Pac",
            age:25,
            photo: "https://cdns-images.dzcdn.net/images/artist/0df7c9931cdb8de51bb5de1db35116b8/500x500.jpg"
        },
    ]

    const createAuthorsTable = db.prepare(`
        CREATE TABLE IF NOT EXISTS authors(
        id INTEGER,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        photo TEXT NOT NULL,
        PRIMARY KEY (id)
    );
    `)
    createAuthorsTable.run()

    const deleteAllAuthors = db.prepare(`
        DELETE FROM authors;
    `)
    deleteAllAuthors.run()

    const createAuthor = db.prepare(`
        INSERT INTO authors (name, age, photo) VALUES (?, ?, ?);
    `)

    for (let author of authors){
        createAuthor.run(author.name, author.age, author.photo)
    }

} 

createQuoteStuff()
createAuthorStuff()