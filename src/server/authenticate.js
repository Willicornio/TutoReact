import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
import { connectDB } from './connect-db';

const authenticationTokens = [];

async function assembleUserState(user){
    let db = await connectDB();

    console.log("Se va a hacer el state del usuario con id : " + user.id );
    let tasks = await db.collection(`tasks`).find({owner: user.id}).toArray();  
    let groups = await db.collection(`groups`).find({owner:user.id}).toArray();

    return{
        tasks,
        groups,
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
            userID:user.id
        });

        let state = await assembleUserState(user);

        res.status("200").send({token, state})
    });
} ;