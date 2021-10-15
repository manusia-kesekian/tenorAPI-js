const { Client, Intents, MessageEmbed } = require('discord.js');
const { TENORTOKEN, TOKENBOT } = require('./config.json');

const fetch = require('node-fetch');
// const moment = require('moment');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
});

client.once('ready', () => {
	console.log(`${client.user.tag} is online boys!`);
    client.user.setActivity(`sepi`);
});

var iterasi = 0;
var search_term = '@';
var target = '@';

// baca tulisan yang di baca
client.on("messageCreate", async message => {
    if (message.content.substring(0,6) === '!bully' && message.content.length > 6){
        var str = message.content.split(/[-," "]/);
        var looping = parseInt(str[1]);
        var user_id = str[str.length-1]; // get user id
        if (RuleBully(str, looping, user_id) == true){
            console.log(SeleksiSearchText(str));
            iterasi = looping;
            search_term = SeleksiSearchText(str);
            target = user_id.substring(3,user_id.length-1);
            console.log(target);
        }
    } else if (target.length > 1 && message.author.id === target && iterasi > 0 && search_term.length > 1){
        let filter = "low";
        let apikey = TENORTOKEN;
        let search_url = `https://g.tenor.com/v1/random?q=${search_term}&locale=en_US&contentfilter=${filter}&key=${apikey}`;
        let response = await fetch(search_url);
        let json = await response.json();
        console.log(json.results[Math.floor(Math.random() * 20)].url);
        message.reply(json.results[Math.floor(Math.random() * 20)].url);
        iterasi = iterasi - 1;
    } else if (message.content === '!stopbully'){
        iterasi = 0;
        search_term = '@';
        target = '@';
    }
});

function RuleBully(str, looping, user_id){
    if (looping === NaN){
        console.log("Rule : !bully [number] [search gif] [tag user]");
        return false;
    }
    if (user_id[0] === "@"){
        console.log("Rule : !bully [number] [search gif] [tag user]");
        return false;
    }
    if (str[1] === user_id){
        console.log("Rule : !bully [number] [search gif] [tag user]");
        return false;
    }
    if (str[1] === looping && str[2] === user_id){
        console.log("Rule : !bully [number] [search gif] [tag user]");
        return false;
    }
    if (str[str.length-1][0] !== '<'){
        console.log(str[str.length-1][0]);
        console.log("Rule : !bully [number] [search gif] [tag user]");
        return false;
    }
    return true;
}

function SeleksiSearchText(str){
    temp = "";
    for(i = 2; i < str.length-1;i++){
        temp = temp + " " + str[i];
    }
    return temp;
}

client.login(TOKENBOT);