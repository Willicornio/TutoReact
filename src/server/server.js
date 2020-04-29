import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './connect-db';
import './initialize-db';
import { authenticationRoute } from './authenticate';

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

export const addNewTask = async task => {
    let db = await connectDB();
    let collection = db.collection(`tasks`);
    await collection.insertOne(task);
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

// app.get('/getAll', async (req, res) =>{

//     let db = await connectDB();

//     let tasks = await db.collection(`tasks`);
//     let groups = await db.collection(`groups`);
//     let users = await db.collection(`users`);

//     const all ={
//         task: tasks,
//         groups: groups,
//         users: users
//     }

//     // console.log("tareas:  " + tasks + "    groups   :" + groups + "   users    :  " + users);
//     res.status(200).send({alll})
// });

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
