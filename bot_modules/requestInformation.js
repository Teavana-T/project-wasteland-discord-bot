module.exports = "requrestInformation.js: imports information from ./data_models/ and outputs functions\n";

// dataModels contains a list of the dataModels to be output
let dataModels = [];
fs.readdir('./data_models/', (err, files) => {
    files.forEach(file => {
      dataModels.push(file)
    });
  });

function presentData(fileName) {
    var data = require(`./data_models/${fileName}`);
    return data.content;
}

// Create an event listener for messages
bot.on('message', message => {
  if (message.author.username !== botusername) {
    const cont = message.content.toLowerCase();
    //Calls the taunt function

    for (let file in dataModels) {
        if (file.toLowerCase == cont) {
            message.channel.send(presentData(file));
        }
    }
  }
});