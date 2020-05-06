import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
import { connectDB } from './connect-db';

const authenticationTokens = [];

async function assembleUserState(user){
    let db = await connectDB();

    console.log("Se va a hacer el state del usuario con id : " + user.id );
    let tasks = await db.collection(`tasks`).find({owner: user.id}).toArray();  
    let groups = await db.collection(`groups`).find({owner:user.id}).toArray();

    console.log("Hay estas tareas " + tasks);

    console.log("Empezamos con los comentarios:");

    let comments =  [];

    var i;
    for (i = 0; i < tasks.length; i++) {
        // console.log(tasks[i]);
        console.log("Buscando los comentarios para la tareas:  " + tasks[i].id);
        let comment = await db.collection(`comments`).find({task: tasks[i].id}).toArray();
        try{
        if (comment != null || comment != [] || comment != undefined || comment.id != null){
            console.log("entro");
            console.log(comment);
            comments.push(comment);
        }
    }catch(ex){}
    }

    // let commenta = await db.collection(`comments`).find({task: 'T1'}).toArray();
    // comments.push(commenta);
    console.log("hay estos coments:");

console.log(comments);
    let username = user.name;
    return{
        username,
        tasks,
        groups,
        comments,
        session: {authenticated: `AUTHENTICATED`, id:user.id}
    }
}

export const authenticationRoute =  app =>{
    app.post('/authenticate', async (req, res) =>{
        let {username, password} = req.body;
        let db = await connectDB();
        let collection = db.collection(`users`);

        let user = await collection.findOne({name:username});

        if (!user)
        {
            return res.status(500).send("Este usuario no existe");
        };

        let hash = md5(password);
        let passwordCorrect = false;

        if (hash == user.passwordHash){ passwordCorrect = true; }

        if(!passwordCorrect)
        {
            return res.status(500).send("Password incorrect");
        }

        let token = uuidv4();

        authenticationTokens.push({
            token,
            userID:user.id,
        });

        let state = await assembleUserState(user);

        res.status("200").send({token, state})
    });
} ;