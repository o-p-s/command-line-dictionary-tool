const wordService =require('./../libs/wordService'),
check=require('./../libs/checkLib'),
colors=require('colors'),
inquirer=require('inquirer');

let definitions=(word)=>{
    if(check.isEmpty(word)){
        console.log(colors.yellow("<word> is required."))
    }else{
        wordService.validateWord().then((isValid)=>{
            if(isValid==true){
                wordService.fetchDefinitions(word.toLowerCase(),3).then((data)=>{
                    console.log('Definitions :')
                    for(let def of data){
                        console.log(`${colors.blue(def.partOfSpeech)}. ${def.text}`)
                    }
                },(err)=>{
                    handleError(err);
                });
            }
        },(err)=>{
            handleError(err);
        });
    }
}
let synonyms=(word)=>{
    if(check.isEmpty(word)){
        console.log(colors.yellow("<word> is required."))
    }else{
        wordService.validateWord().then((isValid)=>{
            if(isValid==true){
                wordService.fetchSynonyms(word.toLowerCase(),5).then((data)=>{
                    console.log(`Synonyms : ${color.green(data.words)}`);
                },(err)=>{
                    handleError(err);
                });
            }
        },(err)=>{
            handleError(err);
        });
    }
}
let antonyms=(word)=>{
    if(check.isEmpty(word)){
        console.log(colors.yellow("<word> is required."))
    }else{
        wordService.validateWord().then((isValid)=>{
            if(isValid==true){
                wordService.fetchAntonyms(word.toLowerCase(),5).then((data)=>{
                    console.log(`Antonyms : ${color.green(data.words)}`);
                },(err)=>{
                    handleError(err);
                });
            }
        },(err)=>{
            handleError(err);
        });
    }
}
let examples=(word)=>{
    if(check.isEmpty(word)){
        console.log(colors.yellow("<word> is required."))
    }else{
        wordService.validateWord().then((isValid)=>{
            if(isValid==true){
                wordService.fetchExamples(word.toLowerCase(),5).then((data)=>{
                    console.log('Examples : ')
                    for (let example of data.examples) {
                        console.log(`${colors.grey(data.examples.indexof(example)++)}. ${colors.green(example.text)}`);
                    }
                },(err)=>{
                    handleError(err);
                });
            }
        },(err)=>{
            handleError(err);
        });
    }
}
let fullDictionary=(word)=>{
    if(check.isEmpty(word)){
        console.log(colors.yellow("<word> is required."))
    }else{
        console.log(`Full Dictionary of ${colors.green(word)}`);
        definitions(word);
        synonyms(word);
        antonyms(word);
        examples(word)
    }
}
let wordOfTheDay=()=>{
    wordService.fetchWordOfTheDay().then((data)=>{
        console.log(`Word of the Day is ${colors.green(data.word)}.`);
        console.log(`Definition : (${color.blue(data.definitions.partOfSpeech)}). ${colors.green(data.definitions[0].text)}`)
        synonyms(word);
        antonyms(word);
        console.log(`Example : ${colors.green(data.examples[0].text)}`)
    },(err)=>{
        handleError(err);
    });
}
let playGame=()=>{
    let randomWord=()=>{
        return new Promise((resolve,reject)=>{
            console.log('Game Loading...');
            wordService.getRandomWord().then((word)=>{
                resolve(word);
            },(err)=>{
                reject(err);
            });
        })
    }
    let getSynonyms=(word)=>{
        return new Promise((resolve,reject)=>{
            wordService.getSynonyms(word,0).then((data)=>{
                resolve({'word':word,'synonyms':data.words})
            },(err)=>{
                reject(err);
            });
        })
    }
    randomWord()
    .then(getSynonyms)
    .then((resolve)=>{
        console.log('Game Loaded! Let\'s play..');
        let i=0;
        let gameBegins=()=>{
            inquirer.prompt([
                {
                type:'input',name:'word',
                message:`Guess any synonym of ${colors.blue(resolve.synonyms[0])}`,
                validate:function check(name){return name!==''}   
                }
            ])
            .then(answers => {
                let checkOthers=()=>{
                    for (let syn of resolve.synonyms) {
                        if(syn===answers.word)
                        return true;
                    }
                    return false;
                }
                if(answers.word===resolve.word || checkOthers() )
                console.log(colors.green('Congratulations!! You guessed it correctly.'))
                else{
                    console.log(colors.yellow('oops.. It was\'nt correct.'))
                    let playAgain=()=>{
                        inquirer.prompt([
                            {
                            type:'list',name:'options',
                            message:`What would you like to do next.`,
                            choices:['1. Try Again','2. Hint', '3. Quit'],
                            validate:function check(name){return name!==''}   
                            }
                        ]).then(answer=>{
                            switch(answer.options){
                                case '1. Try Again' :   gameBegins();break;
                                case '2. Hint'      :   if(++i<resolve.synonyms.length)console.log(`Word is similar to ${colors.blue(resolve.synonyms[i])}`)
                                                        else console.log('No More Hints available.')
                                                        playAgain();break;
                                case '3. Quit'      :   console.log(`The word was ${resolve.word}`);fullDictionary(resolve.word);break;
                                default             :   playAgain();break;
                            }
                        })
                    }
                    playAgain();
                }
            });
        }
        gameBegins();
    },(reject)=>{
        console.log(colors.red('Failed to load game.'))
        handleError(reject);
    });
    
}

let handleError=(err)=>{
    console.log(colors.red(`${colors.bold("Error : ")} ${err.message}`));
}
module.exports={
    definitions:definitions,
    synonyms:synonyms,
    antonyms:antonyms,
    examples:examples,
    fullDictionary:fullDictionary,
    wordOfTheDay:wordOfTheDay,
    playGame:playGame
}