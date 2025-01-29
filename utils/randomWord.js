const axios = require('axios');
const { validateWord } = require('./dictionary');

const getRandomWord = async () => {
    try {
        const response = await axios.get('https://random-word-api.herokuapp.com/word?number=1');
        const word = response.data[0];
        const { isValid, meaning } = await validateWord(word);
        if (isValid) {
            return { word, meaning };
        }
        throw new Error('Failed to validate random word');
    } catch (error) {
        throw new Error('Failed to fetch random word');
    }
};

module.exports = {
    getRandomWord
};