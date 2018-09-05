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
                wordService.fetchDefinitions(word).then((data)=>{
                    console.log('\n Definitions :')
                    let i=0,j=0,max=0;
					let showdefinition=(i)=>{
						max=0;
						for (j=0;j<data.lexicalEntries.length;j++) {
							if(data.lexicalEntries[j].entries[0].senses[i]!=undefined){
								if(data.lexicalEntries[j].entries[0].senses[i].definitions!=undefined)
								console.log(`(${data.lexicalEntries[j].lexicalCategory}). ${colors.green(data.lexicalEntries[j].entries[0].senses[i].definitions[0])}`)
								if(max<data.lexicalEntries[j].entries[0].senses.length){max=data.lexicalEntries[j].entries[0].senses.length-1}
							}
						}			
						//if end of all results
						if(i===max)
						console.log("\n------------------------XXXXXXXXXXXXXXXXXXXXXXXX---------------------------\n")
						else
						fetchMore().then((res)=>{if(res){showdefinition(++i)}})
					}
					showdefinition(i);
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
                wordService.fetchSynonyms(word).then((data)=>{
					console.log('\n Synonyms : ');
					let i=0,j=0,k=0,max=0;
					
					let showsyns=(i,k)=>{
						max=0;
						for (j=0;j<data.lexicalEntries.length;j++) {
							if(data.lexicalEntries[j].entries[0].senses[k]!=undefined){
							
								if(i === data.lexicalEntries[j].entries[0].senses[k].synonyms.length){i=0;++k;}
							
								if(data.lexicalEntries[j].entries[0].senses[k].synonyms[i]!=undefined)
								console.log(`(${data.lexicalEntries[j].lexicalCategory}). ${colors.green(data.lexicalEntries[j].entries[0].senses[k].synonyms[i].text)}`);
							
								if(max<data.lexicalEntries[j].entries[0].senses.length){max=data.lexicalEntries[j].entries[0].senses.length-1}
							}
						}
						if(	k===max)
							console.log("\n------------------------XXXXXXXXXXXXXXXXXXXXXXXX---------------------------\n")
						else
						fetchMore().then((res)=>{if(res){showsyns(++i,k)}})
					}
					showsyns(i,k);
                    
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
                wordService.fetchAntonyms(word).then((data)=>{
                    console.log('\n Antonyms : ');
					let i=0,j=0,k=0,max=0;
					
					let showAnt=(i,k)=>{
						max=0;
						for (j=0;j<data.lexicalEntries.length;j++) {
							if(data.lexicalEntries[j].entries[0].senses[k]!=undefined){
														
								if(k<data.lexicalEntries[j].entries[0].senses.length){
									if(i === data.lexicalEntries[j].entries[0].senses[k].antonyms.length){i=0;++k;}
									
									if(data.lexicalEntries[j].entries[0].senses[k].antonyms[i]!=undefined)
									console.log(`(${data.lexicalEntries[j].lexicalCategory}). ${colors.green(data.lexicalEntries[j].entries[0].senses[k].antonyms[i].text)}`);
								
									if(max<data.lexicalEntries[j].entries[0].senses.length){max=data.lexicalEntries[j].entries[0].senses.length-1}						
								}
							}
						}
						if(k===max)
							console.log("\n------------------------XXXXXXXXXXXXXXXXXXXXXXXX---------------------------\n")
						else
						fetchMore().then((res)=>{if(res){showAnt(++i,k)}})
						
					}
					showAnt(i,k);
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
                wordService.fetchDefinitions(word).then((data)=>{
                    console.log('\n Examples : ');
					let i=0,j=0,k=0,max=0;
						
					let showexamples=(i)=>{
						for (j=0;j<data.lexicalEntries.length;j++) {
							if(data.lexicalEntries[j].entries[0].senses[k]!=undefined && k<data.lexicalEntries[j].entries[0].senses.length ){
								if(data.lexicalEntries[j].entries[0].senses[k].examples!=undefined){
									if( i === data.lexicalEntries[j].entries[0].senses[k].examples.length){i=0;++k;}
									
									else if(i<data.lexicalEntries[j].entries[0].senses[k].examples.length && data.lexicalEntries[j].entries[0].senses[k].examples[i]!=undefined){
										console.log(`(${data.lexicalEntries[j].lexicalCategory}). ${colors.green(data.lexicalEntries[j].entries[0].senses[k].examples[i].text)}`);
									if(max<data.lexicalEntries[j].entries[0].senses.length-1){max=data.lexicalEntries[j].entries[0].senses.length-1}						
								
									}	
								}
							}else k=max;
						}
						if(k===max)
							console.log("\n------------------------XXXXXXXXXXXXXXXXXXXXXXXX---------------------------\n")
						else
						fetchMore().then((res)=>{if(res){showexamples(++i,k)}})
					}
				
					showexamples(i);
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
		wordService.validateWord().then((isValid)=>{
            if(isValid==true){
				console.log(`Full Dictionary of ${colors.green(word)}`);
				
				//fetching & printing definition & examples
                wordService.fetchDefinitions(word).then((data)=>{
						for (let j=0;j<data.lexicalEntries.length;j++) {
							if(data.lexicalEntries[j].entries[0].senses[0].definitions!=undefined){
								console.log(`\n Definition: (${data.lexicalEntries[j].lexicalCategory}). ${colors.green(data.lexicalEntries[j].entries[0].senses[0].definitions[0])}`)
								console.log(`  Example- (${data.lexicalEntries[j].lexicalCategory}). ${colors.green(data.lexicalEntries[j].entries[0].senses[0].examples[0].text)}`);								
							}
						}
                },(err)=>{
                    handleError(err);
                });
				
				//fetching & printing antonyms and synonyms 
				wordService.fetchAntsAndSyns(word).then((data)=>{
					let syns=' ';let ants=' ';
					for (let j=0;j<data.lexicalEntries.length;j++) {
						let i=0;
						while(data.lexicalEntries[j].entries[0].senses[i]!==undefined && i<5 ){
							if(data.lexicalEntries[j].entries[0].senses[i].synonyms!==undefined && data.lexicalEntries[j].entries[0].senses[i].antonyms!==undefined){
							syns+=` ${data.lexicalEntries[j].entries[0].senses[i].synonyms[0].text},`;
							ants+=` ${data.lexicalEntries[j].entries[0].senses[i].antonyms[0].text},`;
							i++;
							}else break;
						}
					}		
					console.log(`\n Synonyms: ${colors.green(syns.substring(0,syns.length-1))}`);
					console.log(`\n Antonyms: ${colors.green(ants.substring(0,ants.length-1))} \n`);
							
                },(err)=>{
                    handleError(err);
                });
            }
        },(err)=>{
            handleError(err);
        });

    }
}

let playGame=(word)=>{

    let getSynonyms=(word)=>{
        return new Promise((resolve,reject)=>{
			wordService.fetchSynonyms(word).then((data)=>{
				let syns=[],k=0;
				for (let j=0;j<data.lexicalEntries.length;j++) {
					let i=0;
					while(data.lexicalEntries[j].entries[0].senses[i]!==undefined){
						if(data.lexicalEntries[j].entries[0].senses[i].synonyms!==undefined ){
							syns[k]=`${data.lexicalEntries[j].entries[0].senses[i].synonyms[0].text}`;
							i++;k++;
						}else break;
					}
				}   
				resolve({'word':word,'synonyms':syns})					
            },(err)=>{
                reject(err);
            });
		})
    }
	getSynonyms(word)
    .then((resolve)=>{
        console.log('\n  Game Loaded! Let\'s play..');
        let i=0;
        let gameBegins=()=>{
            inquirer.prompt([
                {
                type:'input',name:'word',
                message:`\n    Guess any synonym of ${colors.blue(resolve.synonyms[0])}`,
                validate:function check(name){return name!==''}   
                }
            ]).then(answers => {
                let checkOthers=()=>{
                    for (let syn of resolve.synonyms) {
                        if(syn===answers.word)
                        return true;
                    }
                    return false;
                }
                if(answers.word===resolve.word || checkOthers() )
					console.log(colors.green('  Congratulations!! You guessed it correctly.\n'))
                else{
                    console.log(colors.yellow('\n  oops.. It\'s Incorrect.'))
                    let playAgain=()=>{
                        inquirer.prompt([
                            {
                            type:'list',name:'options',
                            message:`\n  What would you like to do next.`,
                            choices:['1. Try Again','2. Hint', '3. Quit'],
                            validate:function check(name){return name!==''}   
                            }
                        ]).then(answer=>{
                            switch(answer.options){
                                case '1. Try Again' :   gameBegins();break;
                                case '2. Hint'      :   if(++i<resolve.synonyms.length)console.log(`\n  Word is similar to ${colors.green(resolve.synonyms[i])}`)
                                                        else console.log('\n  No More Hints available.')
                                                        playAgain();break;
                                case '3. Quit'      :   console.log(`\n	The word was ${resolve.word}`);fullDictionary(resolve.word);break;
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
let fetchMore=()=>{
	return new Promise((resolve)=>{
		console.log("\n")
	inquirer.prompt([{type:'list',name:'options',message:'Would like to fetch more ?',choices:['Yes','No'],validate:function check(name){return name!==''} }])
	.then(answers => {
		console.log("\n");
		if(answers.options=='Yes')
			return resolve(true)
		else
			return resolve(false)
		})
	})
}

let handleError=(err)=>{
	console.error( colors.red(new Error(`${err.substring(err.indexOf('<title>')+7,err.indexOf('</title>'))}` )));
}
module.exports={
    definitions:definitions,
    synonyms:synonyms,
    antonyms:antonyms,
    examples:examples,
    fullDictionary:fullDictionary,
    playGame:playGame
}