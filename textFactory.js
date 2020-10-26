/**
 * @summary 
 * @param {Array} words Array of words
 * @param {Number} maxWidth Maximum width of a line.
 * @returns {Array} Justified lines
 */
function justifyText(words, maxWidth) {
    if(words === null) return [['\n']];
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

/**
 * @param {Array} words 
 * @param {Number} numOfSpaces 
 * @param {Boolean} isLastLine 
 */
function justifyLine(words, numOfSpaces, isLastLine){
    
    const N = words.length;

    if(isLastLine || N === 1){
        // left justify
        let leftSpaces = numOfSpaces;
        for(let i = 0; i < N -1; ++i){
            if(words[i] == '\n') continue;
            words[i] += ' ';
            --leftSpaces; 
        }
        // extraSpace
        if(words[N-1] == '\n') return;
        words[N-1] += ' '.repeat(leftSpaces);
    }else {
        // middlejustify

        const groupSpace = N - 1;
        const reqSpace = parseInt(numOfSpaces / groupSpace);
        let extraSpace = numOfSpaces % groupSpace;

        for(let i = 0; i < N -1; ++i){
            if(words[i] == '\n') continue;
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
 * @summary split text into words.
 * @description split text into words and consideration 
 *              the ponctuation and paragraphs.
 * @returns {Array} Return array of words 
 */
function paragraphToWords(paragraph){
    const regex = /\b(\w+[^ \n]*\w*)|([\wÀ-ÿ]+)|([^ ])|(\n)/g;
    return paragraph.match(regex);
}

/**
 * 
 * @param {String} text
 * @summary split text into paragraphs
 * @returns {Array} Array of string
 */
function textToParagraphs(text){
    const regex = /\n/g;
    return text.split(regex);
}

/**
 * 
 * @param {String} text
 * @summary  
 * @param {Number} maxWidth
 * @returns  {Array}
 */
function textToJustifiedText(text, maxWidth) {
    const paragraphs = textToParagraphs(text);
    let jParagraphs = [];

    // justify each paragraph
    paragraphs.forEach(paragraph => {
        const words = paragraphToWords(paragraph);
        const lines = justifyText(words, maxWidth);
        jParagraphs.push(lines);
    });

    return jParagraphs;
}

/**
 * 
 * @param {Array} jParagraphs
 * @returns {String} Justified text 
 */
function textBuilder(jParagraphs){
    let justifiedText = '';
    jParagraphs.forEach(lines => {
            lines.forEach(line => {
                line.forEach( word => {
                    if(word !== '\n'){
                        justifiedText += word;
                    }
                })
                    justifiedText += '\n';
            })
    });
    return justifiedText;
}

module.exports = {
    textToJustifiedText,
    textBuilder
}