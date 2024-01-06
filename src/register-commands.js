require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType, ApplicationCommand, ApplicationCommandType } = require('discord.js');

const commands = [
    {
        name: 'sum',
        description: 'adds two numbers to sum ',
        options: [
            {
                name: 'first-number',
                description: 'the first number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'minus',
        description: 'adds two numbers to minus ',
        options: [
            {
                name: 'first-number',
                description: 'the first number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'div',
        description: 'adds two numbers to div',
        options: [
            {
                name: 'first-number',
                description: 'the first number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'options',
        description: 'choice that help ',
        options: [
            {
                name: 'sum',
                description: 'sum math 1',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'minus',
                description: 'minus math 2',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
];
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );
        console.log('Slash commands were registered succesfully')
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();