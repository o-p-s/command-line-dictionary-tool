# command-line-dictionary-tool

1. Installation \n
    To install this tool run npm install in this directory.
    Use npm link.
    Change Shebang line according to node installation int ./dict.js.
   
2. Commands \n
 => Word Definitions
	  Display definitions of a word. 
	  ./dict def <word>

 => Word Synonyms
	  Display synonyms of a word. 
	  ./dict syn <word>
    
 => Word Antonyms
	  Display antonyms of a word
	  . /dict ant <word>

 => Word Examples
	  Display examples of a word
	  ./dict ex <word>

 => Word Full Dict
	  Display all above details for a word
	  ./dict <word> or ./dict dict <word>

 => Word of the Day Full Dict
	  Display all above details of word of the day
	  ./dict

 => Word Game
	  ./dict play
	  The program displays a synonym and ask the user to guess the word.

	  If correct word is entered, program should tells that the word is correct.
	  * Other(not displayed) Synonyms of the word are accepted as correct answer.
	  
    If incorrect word is entered, program asks for
		  - 1. try again
			  Lets the user to enter word again.

		  - 2. hint
			  Display a hint in form of another synonym of the word, and let the user to enter word again.
        If no more synonyms are available, tells the user "No more hints are available".
		
      -3 quit
			  Display the word, its full dict, and quits.
   
   To run these commands properly set the node location correctly in shebang line. 
   Otherwise you can always try it with node ./dict <command> <word>.
   
