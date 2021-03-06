//---------------------MODULES---------------------//
// Import dotenv module
require('dotenv').config();

// Import the discord.js module
Discord = require('discord.js');

// Import filesystem module
fs = require('fs');

//Import nicl module
let prompt = require('syncprompt');

//-----------------FIRST TIME SETUP-----------------//
// get an array of modules from the bot_modules folder
modules = fs.readdirSync('./bot_modules/');

if (process.env.FTS == 0) {
  envstring += '#Name of the bot goes here\nBOT_USERNAME = \'';
  envstring += prompt('Please enter the username of the bot\n') + '\'\n\n';

  envstring += '#Token of the bot goes here\nTOKEN = \'';
  envstring += prompt('Please enter the token of the bot\n') + '\'\n\n';

  envstring += '#-------BOT MODULES-------\n\n';
  for (let mod in modules) {
    let modname = modules[mod];
    envstring += modname.slice(0, modname.length - 3);
    if (prompt('Enable \"' + modname + '\"? (Y/n)').toLowerCase() == 'n') {
      envstring += ' = 0\n\n';
    }
    else {
      envstring += ' = 1\n\n';
    }
  }

  envstring += '#-------UNFAVOURABLES-------\n\n';
  envstring += 'UNFAVOURABLES = [' + prompt('Provide a list of unfavourable words seperated by a comma\n') + ']' + '\'\n\n';

  envstring += '#Whether first time setup has been run or not\nFTS = 1\n\n';
  fs.writeFileSync('.env', envstring);
  const listen = require('./listener.js');
}
else {
  const listen = require('./mainListener.js');
}