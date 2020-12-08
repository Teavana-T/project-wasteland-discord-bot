module.exports = "censorUnfavourables.js - specified words/phrases will be censored!\n";

// Make and initialize an array of unfavourables
let unfavourables = [];
for (let str in process.env.UNFAVOURABLES) {
  unfavourables.push(str);
}

// Create an event listener for messages
bot.on('message', message => {
  if (message.author.username !== botusername) {
    const cont = message.content.toLowerCase();
    const txtchnl = message.channel;
    unfavourables.forEach(function (em) {
      if (cont.includes(em)) {
        txtchnl.send("Try not to use that kind of language.");
        let dmchnl = message.author.createDM();
        message.author.send(cont);
        message.delete();
      }
    });
  }
});