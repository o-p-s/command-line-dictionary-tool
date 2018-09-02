const request = require('request-promise');
const colors= require('colors');

let baseUri='https://api.wordnik.com/v4/';
let options ={
    method:'GET',
    uri:'',
    qs:{
        apiKey:'1e940957819058fe3ec7c59d43c09504b400110db7faa0509'
    },   
};

let fetchDefinitions=(word,limit)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/word.json/${word}/definitions`;
        options.qs['limit']=limit;
        options.qs['partOfSpeech']='noun';
        options.qs['includeRelated']=false;
        options.qs['sourceDictionaries']='all';

        request(options).then(response=>{
            return resolve(JSON.parse(response));
        }).catch(err=>{
            return reject(JSON.parse(err.error));
        })
    })
}
let fetchSynonyms=(word,limit)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/word.json/${word}/relatedWords`;
        if(limit>0)options.qs['limitPerRelationshipType']=limit;
        options.qs['relationshipTypes']='synonym';

        request(options).then(response=>{
            return resolve(JSON.parse(response));
        }).catch(err=>{
            return reject(JSON.parse(err.error));
        })
    })
}
let fetchAntonyms=(word,limit)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/word.json/${word}/relatedWords`;
        options.qs['limitPerRelationshipType']=limit;
        options.qs['relationshipTypes']='antonym';

        request(options).then(response=>{
           return resolve(JSON.parse(response));
        }).catch(err=>{
            return reject(JSON.parse(err.error));
        })
    })
}
let fetchExamples=(word,limit)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/word.json/${word}/examples`
        options.qs['limit']=limit;

        request(options).then(response=>{
            resolve(JSON.parse(response));
        }).catch(err=>{
            reject(JSON.parse(err.error));
        })
    })
}

let fetchWordOfTheDay=()=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/word.json/wordOfTheDay`;
        request(options).then(response=>{
            return resolve(JSON.parse(response))
        }).catch(err=>{
           return reject(JSON.parse(err.error));
        })
    })
}
let validateWord=(word)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/words.json/search/${word}`;
        request(options).then(response=>{
            if(JSON.parse(response).totalResults>=1)
                return resolve(true);
            else
                console.log(colors.yellow('oops! Word does not exist in Wordnik dictionary.'));
        }).catch(err=>{
            return reject(JSON.parse(err.error));
        })
    })
}
let getRandomWord=()=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/words.json/randomWord`;
        options.qs['limit']=1;
        request(options).then(response=>{
            return resolve(JSON.parse(response).word);
        }).catch(err=>{
            return reject(JSON.parse(err.error));
        })
    })
}

module.exports={
    fetchDefinitions:fetchDefinitions,
    fetchAntonyms:fetchAntonyms,
    fetchSynonyms:fetchSynonyms,
    fetchExamples:fetchExamples,
    fetchWordOfTheDay:fetchWordOfTheDay,
    validateWord:validateWord,
    getRandomWord:getRandomWord
}