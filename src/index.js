require('dotenv/config');

const { Client, IntentsBitField, ActivityType, Role } = require('discord.js');
const { OpenAI } = require('openai');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(` ${c.user.tag} Is Online. `);

    client.user.setActivity({
        name: 'Being Progammed',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=n3Go8ub9a1k',
    });
});
const CHANNELS = [process.env.CHANNEL_ID]

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    if (!CHANNELS.includes(msg.channelId) && !msg.mentions.users.has(client.user.id)) return;
    if (msg.content.startsWith('!')) return;

    const response = await openai.chat.completions.create(
        {
            model: 'gpt-3.5-turbo',

            messages: [
                {

                    role: 'system',
                    content: 'Chat GPT is a friendly chatbot.'

                },
                {
                    role: 'user',
                    content: msg.content,
                }
            ]
        }).catch((error => console.error('OpenAI Error: \n', error)));

    msg.reply(response.choices[0].msg.content);

    client.on('interactionCreate', (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'minus') {
            const num1 = interaction.options.get('first-number').value;
            const num2 = interaction.options.get('second-number').value;

            interaction.reply(`minus = ${num1 - num2}`);

        }
        if (interaction.commandName === 'sum') {
            const num1 = interaction.options.get('first-number').value;
            const num2 = interaction.options.get('second-number').value;

            interaction.reply(`sum = ${num1 + num2}`);
        }
        if (interaction.commandName === 'div') {
            const num1 = interaction.options.get('first-number').value;
            const num2 = interaction.options.get('second-number').value;

            interaction.reply(`div = ${num1 / num2}`);
        }
    });

});
client.login(process.env.TOKEN);
