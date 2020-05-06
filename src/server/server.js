import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './connect-db';
import './initialize-db';
import { authenticationRoute } from './authenticate';
import path from 'path';

let port = 8888;
let app = express();

app.listen(port, console.log("Escuchando por el puerto", port));

// app.get('/', (req, res)=>{
//     res.send("BUENAS TARDES AMIGOOOSS!!!!!11");
// });

app.use(
    cors({origin: 'http://localhost:8080'}),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json()
);

authenticationRoute(app);

//NO ESTA EN EL HEROKU

export const addNewUser = async user => {
    let db = await connectDB();
    let collection = db.collection(`users`);
    await collection.insertOne(user);
    console.log("Parece que sí que se ha añadido");
}

export const addNewTask = async task => {
    let db = await connectDB();
    let collection = db.collection(`tasks`);
    await collection.insertOne(task);
    console.log("Parece que sí que se ha añadido");
}

export const addNewComment = async comment => {
    let db = await connectDB();
    let collection = db.collection(`comments`);
    await collection.insertOne(comment);
    console.log("Parece que sí que se ha añadido");
}


export const updateTask = async task => {
    let { id, group, isComplete, name } = task;
    let db = await connectDB();
    let collection = db.collection(`tasks`);

    if (group) {
        await collection.updateOne({ id }, { $set: { group } });
    }
    if (name) {
        await collection.updateOne({ id }, { $set: { name } });
    }

    if (isComplete !== undefined) {
        await collection.updateOne({ id }, { $set: { isComplete } });
    }

}

app.post('/task/new', async (req, res) => {
    let task = req.body.task;
    console.log(task);
    await addNewTask(task);
    res.status(200).send();
});


app.post('/task/update', async (req, res) => {
    let task = req.body.task;
    await updateTask(task);
    res.status(200).send();
});

app.post('/comment/new', async (req, res) =>{
    let comment = req.body.comment;
    await addNewComment(comment);
    console.log(req.body.comment);
})


app.post('/user/new', async (req, res) => {
    let user = req.body.user;
    console.log(req.body.user);
    await addNewUser(user);
})