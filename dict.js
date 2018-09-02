#!/usr/bin/env node
const program = require('commander'),
cmdController= require('./controller/cmdController')

program
    .version('0.0.1')
    .usage('<keywords>')
    .parse(process.argv);

if(!program.args.length) {
    cmdController.wordOfTheDay();
} else {
    switch(program.args[0]){
        case 'def'  : cmdController.definition(program.args[1]);
                      break;
        case 'syn'  : cmdController.synonyms(program.args[1]);
                      break;
        case 'ant'  : cmdController.antonyms(program.args[1]);
                      break;
        case 'ex'   : cmdController.examples(program.args[1]);
                      break;
        case 'dict' : cmdController.fullDictionary(program.args[1]);
                      break;
        case 'play' : cmdController.playGame();
                      break;
        default     : cmdController.fullDictionary(program.args[0]);
                      break;  
    }
}
