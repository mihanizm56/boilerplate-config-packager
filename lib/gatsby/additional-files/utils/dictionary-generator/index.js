/* eslint-disable no-console */

const path = require('path');
const { writeFile, readdir, mkdir } = require('../fs-promises');
const { getLanguagesRequest } = require('./api/get-languages-request');
const { i18nextRequest } = require('./api/i18next-request');

const PATH_TO_I18N_DICT = path.join(process.cwd(), 'src', 'i18n', 'dictionary');
const PATH_TO_I18N_IMPORT_FILE = path.join(
  process.cwd(),
  'src',
  'i18n',
  'dictionary',
  'index.ts',
);

const fetchDictionary = async () => {
  // загружаем список языков (ns - root)
  const { data, errorText, error } = await getLanguagesRequest();

  if (error) {
    throw new Error(errorText);
  }

  if (!data.languages.length) {
    return;
  }

  const generateDictionariesData = await data.languages.reduce(
    async (acc, language) => {
      try {
        // загружаем словарь для конкретного языка
        const {
          data: translationsData,
          errorText: translationsErrorText,
          error: translationsError,
        } = await i18nextRequest(language);

        if (translationsError) {
          throw new Error(translationsErrorText);
        }

        // путь до папки с переводами для конкретного языка
        const PATH_TO_DICT = `${PATH_TO_I18N_DICT}/${language}`;

        // проверям что папка есть - если нет то создаём
        try {
          await readdir(PATH_TO_DICT);
        } catch {
          await mkdir(PATH_TO_DICT);
        }

        // пишем файл с переводами для конкретного языка
        await writeFile(
          `${PATH_TO_DICT}/translation.json`,
          JSON.stringify(translationsData.translate),
        );

        // пишем строчку с импортом языка
        const PathToImportDir = `translations${language.toUpperCase()}`;

        // async reduce
        // https://advancedweb.hu/how-to-use-async-functions-with-array-reduce-in-javascript/
        const awaitedAcc = await acc;

        return await {
          ...awaitedAcc,
          imports: `${awaitedAcc.imports}import ${PathToImportDir} from "./${language}/translation.json";`,
          objectStringToParse: `${awaitedAcc.objectStringToParse}${language}:${PathToImportDir},`,
        };
      } catch (err) {
        console.log('i18nextRequest error: ', err.message);

        return (await acc); // eslint-disable-line
      }
    },

    //  imports - строка с импортами
    //  objectStringToParse - строка с реекспортами из объекта
    { imports: '', objectStringToParse: '' },
  );

  // пишем результат в файл индексовый для экспорта словаря
  await writeFile(
    PATH_TO_I18N_IMPORT_FILE,
    `${generateDictionariesData.imports} export const i18nextDictionary = {${generateDictionariesData.objectStringToParse}}`,
  );

  process.exit(1);
};

fetchDictionary();
