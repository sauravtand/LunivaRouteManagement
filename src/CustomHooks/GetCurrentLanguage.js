import { useState } from 'react';

export default function useCurrentLanguage() {

    const getLanguage = () => {
        const languageString = sessionStorage.getItem('lan');
        if (languageString) {
            const userLanguage = JSON.parse(languageString);
            return userLanguage
        }
    };

    const [language, setLanguage] = useState(getLanguage());

    const saveLanguage = userLanguage => {
        sessionStorage.setItem('lan', JSON.stringify(userLanguage));
        setLanguage(userLanguage.language);
    };

    return {
        setLanguage: saveLanguage,
        language
    }
}