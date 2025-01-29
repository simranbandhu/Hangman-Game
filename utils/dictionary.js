const axios = require('axios');

const validateWord = async (word) => {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (response.status === 200 && response.data.length > 0) {
            const meaning = response.data[0].meanings[0].definitions[0].definition;
            return { isValid: true,word, meaning };
        }
        return { isValid: false, meaning: null };
    } catch (error) {
        return { isValid: false, meaning: null };
    }
};

module.exports = {
    validateWord
};