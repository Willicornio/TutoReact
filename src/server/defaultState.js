import md5 from 'md5';
export const defaultState= {
    // session:{
    //     authenticated:false
    // },
    users:[{
        id: "U1",
        name: "Dev",
        passwordHash:md5("Dev"),
        friends: ["U2"]
    },
    {
        id: "U2",
        name: "PICHÓN VOLADOR",
        passwordHash:md5("willi"),
        friends: []

    }
],
    groups:[{
        name: "To Do",
        id:"G1",
        owner:"U1"
    }, 
    {name: "ANTI FURROS",
    id:"G2",
    owner:"U2"
}
],
    tasks:[{
        name:"Do tests",
        id:"T1",
        group:"G1",
        owner:"U1",
        isComplete:false
    },
    {
        name:"PINCHE NO HAGAS ESOOOOOOO",
        id:"T2",
        group:"G2",
        owner:"U2",
        isComplete:false
    }],
    comments:[{
        owner:"U1",
        id:"C1",
        task:"T1",
        content:"Te reviento payaso!!!!!111uno"
    },
    {
        owner:"U2",
        id:"C2",
        task:"T2",
        content:"NO ME MIRES NO ME MIRES NO NONO NINININ PIPIPIPI"
    }]
}