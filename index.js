const express = require('express');
const { uptime } = require('process');

const app = express();
const hostname = 'localhost';
const port = '3000';
let id = 0;

app.use(express.json());

const todoList = [
    {
        id: 1,
        do: 'check'
    },
    {
        id: 2,
        do: 'test'
    }
];

app.get('/', (_, res) => {
    res.json({
        message: 'ok',
        data: todoList
    })
});

app.post('/post/:item', (req, res) => {
    const newtodoList = [ ...todoList, 
        {
            id: todoList.length + 1,
            do: req.params.item
        }
    ];

    res.json({
        'message': 'ditambahkan',
        'data': newtodoList
    });
});

app.delete('/del/:id', (req, res) => {
    const deltodoList = todoList.filter(elem => elem.id != req.params.id);
    res.json({
        'message': 'dihapus',
        'data': deltodoList
    });
});

app.put('/put/:id/:item', (req, res) => {
    const updtodoList = todoList.map(elem => {
        if(elem.id == req.params.id) {
            elem.do = req.params.item;
        }
        return elem;
    });

    res.json({
        'message': 'diupdate',
        'data': updtodoList
    });
});

app.get('/:id', (req, res) => {
    res.json({
        'message': 'get with id',
        data: todoList.filter(elem => elem.id == req.params.id)
    })
});

app.listen(3000, () => {
    console.log('Server berjalan di http://' + hostname + ':' + port);
});