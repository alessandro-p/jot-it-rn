import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

interface AvailableLanguagesMapper
{
    [language: string]: () => any;
}

const available_languages_mapper: AvailableLanguagesMapper = {
    en: () => require('../../locales/en.json')
};

export const t = (key: string, options?: i18n.TranslateOptions) => i18n.t(key, options);

export const setup_18n = () =>
{
    const fallback = {languageTag: 'en'};
    const {languageTag: language_tag} = RNLocalize.findBestAvailableLanguage(Object.keys(available_languages_mapper)) || fallback;

    i18n.translations = {[language_tag]: available_languages_mapper[language_tag]()};
    i18n.locale = language_tag;
};
