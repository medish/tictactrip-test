/**
 * @module textFactory
 * Build a justified text from any given text
 */

/**
 * Text justification function
 * @param {Array} words Array of words
 * @param {Number} maxWidth Maximum width of each line.
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
            words[i] += ' ';
            --leftSpaces; 
        }
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
 * @param {String} paragraph
 * @summary split a given 'paragraph' into words.
 * @returns {Array} Array of words 
 */
function paragraphToWords(paragraph){
    const regex = /\b(\w+[^ \n]*\w*)|([\wÀ-ÿ]+)|([^ ])|(\n)/g;
    return paragraph.match(regex);
}

/**
 * 
 * Split a given 'text' into paragraphs and take in consideration 
 * the ponctuation and paragraphs (and break lines).
 * @param {String} text
 * @returns {Array} Array of paragraphs.
 */
function textToParagraphs(text){
    const regex = /\n/g;
    return text.split(regex);
}

/**
 * Justify a given 'text' with maximum width of line
 * @param {String} text
 * @param {Number} maxWidth
 * @returns  {Array} Array of justified paragraphs.
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
 * Split a given 'text' into words
 * @param {String} text
 * @returns {Array} Array of words 
 */
function textToWords(text){
    const regex = /([\wÀ-ÿ]+)/g;

    return text.match(regex);
}

/**
 * Build a string from a given array of words
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
    textBuilder,
    textToWords
}