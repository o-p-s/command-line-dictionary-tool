const request = require('request-promise');
const colors= require('colors');

let baseUri='https://od-api.oxforddictionaries.com:443/api/v1';
let options ={
    method:'GET',
    uri:'',
	json:true,
	headers:{
		"Accept": "application/json",
		"app_id": "1f5c4a48",
		"app_key": "bd68b02d7a177659bc5b1d881540b6f1"
	}
};

let fetchDefinitions=(word)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/entries/en/${word}`;
        request(options).then(response=>{
            return resolve(response.results[0]);
        }).catch(err=>{
            return reject(err.error);
        })
    })
}
let fetchSynonyms=(word)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/entries/en/${word}/synonyms`;
        request(options).then(response=>{
            return resolve(response.results[0]);
        }).catch(err=>{
            return reject(err.error);
        })
    })
}
let fetchAntonyms=(word,limit)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/entries/en/${word}/antonyms`;
        request(options).then(response=>{
            return resolve(response.results[0]);
        }).catch(err=>{
            return reject(err.error);
        })
    })
}
let fetchAntsAndSyns=(word)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/entries/en/${word}/synonyms;antonyms`;

        request(options).then(response=>{
            return resolve(response.results[0]);
        }).catch(err=>{
            return reject(err.error);
        })
    })
}

let validateWord=(word)=>{
    return new Promise((resolve,reject)=>{
        options.uri=`${baseUri}/inflections/en/${word}`;
        request(options).then(response=>{
            return resolve(true);                
        }).catch(err=>{
            return reject(err);
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
	fetchAntsAndSyns:fetchAntsAndSyns,
    validateWord:validateWord,
    getRandomWord:getRandomWord
}