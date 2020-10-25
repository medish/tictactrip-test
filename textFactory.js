/**
 * 
 * @param {Array} words Array of words
 * @param {Number} maxWidth Maximum width of line.
 * @returns {Array}
 */
function justifyText(words, maxWidth) {
    let lines = [];
    let currentWord = 0;
    const N = words.length;
    const ONE_SPACE = 1;

    while(currentWord < N){
        let nextWord = currentWord + 1;
        let lineLength = words[currentWord].length;
        
        while(  nextWord < N 
            && (lineLength + words[nextWord].length + (nextWord - currentWord - ONE_SPACE)) < maxWidth)
        {
                lineLength += words[nextWord].length;
                ++nextWord;
        }
        // 
        const numOfSpaces = maxWidth - lineLength;
        const isLastLine = (nextWord >= N);
        let line = words.slice(currentWord, nextWord);
        justifyLine(line, numOfSpaces, isLastLine);
        lines.push(line);
        
        currentWord = nextWord;
    }

    return lines;
}

function justifyLine(words, numOfSpaces, isLastLine){
    
    const N = words.length;

    if(isLastLine || N === 1){
        // left justify
        let leftSpaces = numOfSpaces;
        for(let i = 0; i < N -1; ++i){
            words[i] += ' ';
            --leftSpaces; 
        }
        // extraSpace
        words[N-1] += ' '.repeat(leftSpaces);
    }else {
        // middlejustify

        const groupSpace = N - 1;
        const reqSpace = parseInt(numOfSpaces / groupSpace);
        let extraSpace = numOfSpaces % groupSpace;

        for(let i = 0; i < N -1; ++i){
            words[i] += ' '.repeat(reqSpace);
            if(extraSpace > 0){
                words[i] += ' ';
                --extraSpace;
            }
        }
    }
}
/**
 * 
 * @param {String} text
 * @summary split text into words and take in consideration the ponctuation.
 * @returns {Array} Return array of words 
 */
function textToWords(text){
    const regex = /\b(\w+[.,;!?]+)|(\w+)|([.,!?]+)/g;
    return text.match(regex);
}

const text = `Et eu velit labore anim cupidatat velit consequat esse adipisicing. Nulla pariatur consequat pariatur qui aliqua adipisicing esse sunt commodo incididunt incididunt nisi sit ipsum. Consequat labore commodo velit aliquip ipsum dolore cupidatat. Qui ullamco est fugiat sint occaecat non incididunt. Consequat est labore ad do ea sit amet sunt aliqua veniam culpa eiusmod veniam.
Cillum in reprehenderit cillum ex cillum elit minim ullamco. Enim exercitation velit nostrud Lorem esse qui ut excepteur tempor nisi. Aliquip eu aliqua velit in deserunt do nisi laborum dolore elit labore elit pariatur. Eiusmod incididunt qui magna sunt duis qui dolore amet sit aliquip voluptate. Sint et ut commodo magna ex eiusmod sint sint.

Sint tempor duis ipsum nostrud pariatur enim quis labore qui. Dolore voluptate quis consectetur elit. Adipisicing minim ea eiusmod culpa. Velit eiusmod commodo ipsum nostrud et ex consectetur sint pariatur adipisicing. Nulla occaecat voluptate elit occaecat eiusmod ea aute est proident. Ut labore proident eiusmod ipsum ea cillum ex ea esse. Sint do exercitation nisi esse.`
let words = textToWords(text);
//console.log(words);
let jWords = justifyText(words, 40);
let jText = '';
for (let i =0; i < jWords.length; ++i){
    for(let j = 0; j < jWords[i].length; ++j){
        jText += (jWords[i][j]);
    }
    jText += '\n';
}

console.log(jText);