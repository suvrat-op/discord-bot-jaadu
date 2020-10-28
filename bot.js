require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 15;
const ms = require('ms');
const { Client, MessageReaction, DiscordAPIError, MessageCollector, MessageEmbed, GuildMember, MessageAttachment,WebhookClient } = require('discord.js');
const client = new Client(
    {partials: ['MESSAGE','REACTION','GUILD_PRESENCES', 'GUILD_MEMBERS']}
);
var msg;
let ROLES_NAME = [];
var msg_id;
const numbers = ['zero' , 'one', 'two' , 'three' , 'four' , 'five'];
const PREFIX = "$";
const EVERYONE_PING = "@everyone";
const ANNOUNCE_EVERYONE = "#announcement";
var emoji_1 = '1️⃣';
var emoji_2 = '2️⃣';
var emoji_3 = '3️⃣';
var emoji_4 = '4️⃣';
var emoji_5 = '5️⃣';
var role;
var role1;
var role2;
var role3;
var role4;
const webhookClient = new WebhookClient(process.env.WEBHOOK_ID,process.env.WEBHOOK_TOKEN,);
client.on('ready',()=>{
    console.log(`${client.user.tag}`+" Has logged in");
    client.user.setActivity('$help')
})


client.on('message',async (message)=>{
    if(message.author.bot) return;
    if(message.content === 'hi' || message.content === 'Hi')
        {
            message.reply("hello!");
        }
    if(message.content.startsWith(PREFIX))
    {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

        
        if(CMD_NAME === 'help')
        {
            const exampleEmbed = new MessageEmbed()
	        .setColor('RANDOM')
	        .setTitle('JAADU BOT HELP')
	        
	        
            
            .addField('```$kick [user id] [REASON]```', 'kicks the user with the given user ID', true)
            .addField('```$ban [user id] [REASON]```', 'bans the user with the given user ID', true)
            .addField('```$unban [user id] [REASON]*optional```', 'unbans the user with the given user ID', true)

            .addField('```$future [person]```', 'the bot will tell u your future', true)
            
            .addField('```$meme```', 'post a random **FUNNY** meme', true)

            .addField('```$help```', 'shows a list of command you can use', true)
            
            .addField('```$reaction [no. of roles max:5] role_name1 role_name2 ...```', 'reaction roles XD', true)
            .addField('```$avatar```', 'sends the user avatar',true)
            .addField('```$rip [person]```', 'try it and see what happens',true)
            .addField('```$announce [string]```',`will send a message in ${ANNOUNCE_EVERYONE} **NOTE** it will ping everyone`,true)
            .addField('```$giveaway [time] [thing-what-u-r-giving-away]```' ,`will do a giveaway be sure to thank the giveaway host`,true)
            .setFooter('ramen at ichiraku is the best');
            message.channel.send(exampleEmbed);
        }
        if(CMD_NAME === 'memcount')
        {
            const count = message.guild.memberCount;
            message.channel.send(count);
        }
        if(CMD_NAME === 'kick')
        {
            if(!message.member.hasPermission('KICK_MEMBERS'))
            {
                return (message.channel.send("lol dont try to become a mod"));
            }
            if(args.length === 0)
            {
                return (message.reply('please provide an ID'));
            }
            const member = message.guild.members.cache.get(args[0]);
            if (member)
            {
                args.shift();
                const msg = args.join(' ');
                const exampleEmbed = new MessageEmbed()
	                .setColor('RANDOM')
	                .setTitle(`kicked by moderator ${message.member.user.tag}`)
                    .addField( `REASON: ${msg}`, `user ${member} was kicked`, true)
                member
                .kick()
                .then((member) =>  message.channel.send(exampleEmbed))
                .catch( (err) => {message.channel.send('I do not have permissions :(')} );
            }
            else
            {
                message.channel.send("dont try to fool me there is no user with this id");
            }
        } 
        else if(CMD_NAME === 'ban')
        {
            
            if(!message.member.hasPermission('KICK_MEMBERS'))
            {
                return (message.channel.send("lol dont try to become a mod"));
            }
            if(args.length === 0)
            {
                return (message.reply('please provide an ID'));
            }
            try
            {
                const id = args[0];
                args.shift();
                const msg = args.join(' ');
                const exampleEmbed1 = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`banned by moderator ${message.member.user.tag}`)
                .addField( `REASON: ${msg}`, `user with id ${id} was banned`, true)
                const user = await message.guild.members.ban(id);
                message.channel.send(exampleEmbed1)
            }
            catch(err)
            {
                console.log(err);
                message.channel.send("there was an error. either i do not have the perms to ban that member or the member was not found");
            }
            
        }
        else if(CMD_NAME === 'unban')
        {
            if(!message.member.hasPermission('KICK_MEMBERS'))
            {
                return (message.channel.send("lol dont try to become a mod"));
            }
            if(args.length === 0)
            {
                return (message.reply('please provide an ID'));
            }
            try
            {
                const id = args[0];
                args.shift();
                const msg = args.join(' ');
                const exampleEmbed1 = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`unbanned by moderator ${message.member.user.tag}`)
                .addField( `REASON: ${msg}`, `user with id ${id} was unbanned`, true)
                const user = await message.guild.members.unban(id);
                message.channel.send(exampleEmbed1)
            }
            catch(err)
            {
                console.log(err);
                message.channel.send("there was an error. either i do not have the perms to unban that member or the member was not found");
            }
            
        }
        else if(CMD_NAME === "meme")
        {
            let subreddit = "dankmemes";
            const {MessageEmbed} = require('discord.js');
            const api = require('imageapi.js')
            let img = await api(subreddit);
            let embed = new MessageEmbed()
            .setTitle(`A meme from r/${subreddit}/`)
            .setURL(`https://www.reddit.com/r/${subreddit}/`)
            .setColor('RANDOM')
            .setImage(img)
            message.channel.send(embed);


        }
        else if(CMD_NAME === 'future')
        {
            var mymin=0;
            var mymax=3;
            var response = ["simping on donald trump","simping on joe biden","cleaning dog shit"];
            var random_response = response[Math.floor(Math.random() * (mymax - mymin + 1)) + mymin];
            if(!args[0])
            {
                message.channel.send(`lol i saw your future u were ${random_response} lmao`);
            }
            else
            {

                message.channel.send(`lol i saw ${args[0]}'s future he was ${random_response} lmao`);
            }
        }
        else if(CMD_NAME === 'avatar')
        {
            message.reply(message.author.displayAvatarURL());
        }
        else if(CMD_NAME === 'rip')
        {
            if(!args[0])
            {
                const attachment1 = new MessageAttachment('https://i.imgur.com/w3duR07.png');
                message.channel.send(attachment1);

            }
            else
            {
                const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png');
                message.channel.send(`${args[0]},`, attachment);
            }
        }
        else if(CMD_NAME === 'announce' || CMD_NAME ==='announcement')
        {
            if(!message.member.hasPermission('KICK_MEMBERS'))
            {
                return (message.channel.send("lol dont try to become a mod"));
            }
            const msg = args.join(' ');
            webhookClient.send(`${msg} ${EVERYONE_PING}`);
        }
        else if(CMD_NAME === 'reaction' || CMD_NAME === 'roles')
        {         
            if(!message.member.hasPermission('KICK_MEMBERS'))
            {
                return (message.channel.send("lol dont try to become a mod"));
            }
            if(args[0] === '1')
            {
                msg = await message.channel.send(`${args[1]} --> :${numbers[1]}:`+"\n");
                msg_id = msg.id;
                
            }
            if(args[0] === '2')
            {
                msg = await message.channel.send(`${args[1]} --> :${numbers[1]}:` +"\n"+ `${args[2]} --> :${numbers[2]}:`);
                msg_id = msg.id;
                
            }
            if(args[0] === '3')
            {
                msg = await message.channel.send(`${args[1]} --> :${numbers[1]}:` +"\n"+ `${args[2]} --> :${numbers[2]}:`+"\n"+`${args[3]} --> :${numbers[3]}:`);
                msg_id = msg.id;
            }
            if(args[0] === '4')
            {
                msg = await message.channel.send(`${args[1]} --> :${numbers[1]}:` +"\n"+ `${args[2]} --> :${numbers[2]}:`+"\n"+`${args[3]} --> :${numbers[3]}:`+"\n"+`${args[4]} --> :${numbers[4]}:`);
                msg_id = msg.id;
            }
            if(args[0] === '5')
            {
                msg = await message.channel.send(`${args[1]} --> :${numbers[1]}:` +"\n"+ `${args[2]} --> :${numbers[2]}:`+"\n"+`${args[3]} --> :${numbers[3]}:`+"\n"+`${args[4]} --> :${numbers[4]}:`+"\n"+`${args[5]} --> :${numbers[5]}:`);
                msg_id = msg.id;
            }
            ROLES_NAME = args;
            ROLES_NAME.shift();
            role = message.guild.roles.cache.find(r => r.name === ROLES_NAME[0]);
            role1 = message.guild.roles.cache.find(r => r.name === ROLES_NAME[1]);
            role2 = message.guild.roles.cache.find(r => r.name === ROLES_NAME[2]);
            role3 = message.guild.roles.cache.find(r => r.name === ROLES_NAME[3]);
            role4 = message.guild.roles.cache.find(r => r.name === ROLES_NAME[4]);
        }
        else if(CMD_NAME === 'giveaway')
        {
            if(!message.member.hasPermission('ADMINISTRATOR'))
            {
                return message.channel.send('if u want to do giveaway pls get the administrator permissions');
            }
            let timev = args[0];
            if(!timev)
            {
                return message.channel.send('u did not specified after what time the giveaway is, **provide the time in MS**');
            }
            let time = parseInt(timev,10);
            let timef = time;
            time = time*60;
            time = time*60;
            time = time*1000;
            
            let prize = args[1];
            const embed = new MessageEmbed()
            .setTitle(`New Giveaway by ${message.member.user.tag}`)
            .addField(`this giveaway will be done in ${timef} hours`,`${prize} will be given away`,true)
            .addField(`say thanks to ${message.member.user.tag} in #general :smile:`,`only 1 winner will be chosen`)
            .setColor('RANDOM')
            let msg = await message.channel.send(embed);
            await msg.react('🎉')
            setTimeout(() => {
                let winner = msg.reactions.cache.get('🎉').users.cache.random().id
                message.channel.send(`The winner is <@${winner}> congratulations the giveaway host will send u DM about the prize`)
            }, time);
        }
    } 
});
client.on('messageReactionAdd' , (reaction,user)=>
{
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id === msg_id)
    {
        switch (name)
        {
            case emoji_1:
                member.roles.add(role)
                    break;
            case emoji_2:
                
                member.roles.add(role1)
                    break;
            case emoji_3:
                
                member.roles.add(role2)
                    break;
            case emoji_4:
                
                member.roles.add(role3)
                    break;
            case emoji_5:
                
                member.roles.add(role4)
                    break;
        }
    }
});
client.on('guildMemberAdd' , (member) => {
    const channel = member.guild.channels.cache.find(channel=> channel.name === "welcome");
    if(!channel)
    {   
        return;
    }
    channel.send(`Hi there, ${member} Welcome to our server kindly read `+`#rules`+` and follow them! Thanks for joining  !
    `);
});
client.login(process.env.DISCORDJS_BOT_TOKEN );
