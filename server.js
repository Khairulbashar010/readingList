const express = require('express');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
const cors = require('cors');
var fs = require('fs'), data;

const app = express();

// ----------- Middleware -----------
app.use(cors());
app.use(express.json({extended:false}));

// ----------- Routes -----------

// Get Books
app.get("/", (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) throw res.status(500).json({
            "message": "Couldn't fetch books",
            err
        });
        data = JSON.parse(data);
        res.status(200).json(data)
    });
})

// Add New Book
app.post("/add-book", (req, res) => {
    if(!req.body.title || !req.body.author){
        throw res.status(400).json({
            "message": "Enter required fields",
            "err": true
        })
    }
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) throw res.status(500).json({
            "message": "Couldn't add book",
            err
        });
        data = JSON.parse(data);
        data.push(
            {
                "id":uuidv4(),
                "title": req.body.title,
                "author": req.body.author
            }
        );

        fs.writeFile("data.json", JSON.stringify(data), (err) => {
            if (err) throw res.status(500).json({
                "message": "Couldn't add book",
                err
            });
            res.status(201).json(data);
        });
    });
})

// Remove Book
app.delete("/remove-book/:id", (req, res) => {
    if(!req.params.id){
        throw res.status(400).json({
            "message": "Enter required fields",
            "err": true
        })
    }
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) throw res.status(500).json({
            "message": "Couldn't remove book",
            err
        });
        data = JSON.parse(data);
        if(data.length === 0) throw res.status(500).json({
            "message": "Couldn't remove book",
            "err":true
        });
        bookExists = data.findIndex(book => book.id === req.params.id);
        if(bookExists === -1){
            throw res.status(404).json({"message":"Book not found","err":true})
        } else {
            data.splice(bookExists,1)
            fs.writeFile("data.json", JSON.stringify(data), (err) => {
                if (err) throw res.status(500).json({
                    "message": "Couldn't remove book",
                    err
                });
                res.status(200).json(data);
            });
        }
    });
})


// ----------- Run Server -----------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`[success]: Server is running on port:${PORT}`);
})