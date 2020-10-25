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