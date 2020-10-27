const textFactory = require('../../textFactory');

describe('text factory', () => {
    it('text should return words', () => {
        const text = 'Dolore magné sinté ùay nisi duis.';
        const words = textFactory.textToWords(text);
        expect(words.length).toBe(6);
    })

    it('justify a text', () => {
        const text = `Cillum sint incididunt fugiat laboris sint dolore id laboris.

        Ad minim cillum commodo proident officia veniam ea velit ullamco commodo magna.`;

        
        const jParagraphs = textFactory.textToJustifiedText(text, 40);
        expect(jParagraphs.length).toBe(3);

        const jText = textFactory.textBuilder(jParagraphs);
        expect(jText).not.toBe('');
    })
})