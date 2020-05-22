const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { readFile, readdir, writeFile } = require('../../_utils/fs-promises');

const PUBLIC_URL = process.env.PUBLIC_URL || '/';

const pathToHTML = path.join(process.cwd(), 'build', 'index.html');
const pathToBuild = 'build';
const fontsSubDir = 'static/media';
const pathToFontsDir = path.join(pathToBuild, fontsSubDir);
const staticFilesRegExp = /\/static\/\w+\/\w+(\.\w+)+/g; // eslint-disable-line
const linksRegExp = /<link href.*rel="stylesheet">/g; // eslint-disable-line
const splitBy = '</head>';

const makeFontString = ({ link, extension }) =>
  `<link rel="preload" href="${link}" as="font" type="font/${extension}" crossorigin/>`;

const makeStyleString = link => `<link href="${link}" rel="stylesheet"/>`;

const makeHTMLFormattedLinks = links =>
  links.reduce((acc, link) => {
    const extension = path.extname(link).replace('.', '');

    const isFont = /\.(woff|woff2|ttf)$/.test(link);
    const isCss = /\.(css)$/.test(link);

    if (isFont) {
      // eslint-disable-next-line
      return (acc += makeFontString({ link, extension }));
    }

    if (isCss) {
      // eslint-disable-next-line
      return (acc += makeStyleString(link));
    }

    return acc;
  }, '');

const fontsPatcher = async () => {
  // read html content
  const HTMLContent = await readFile(pathToHTML, 'utf-8');
  // get fonts from build dir
  const fontsFilesList = await readdir(pathToFontsDir);
  // get first <head> part
  const htmlParts = HTMLContent.split(splitBy);
  // get html without prev links

  const headPart = htmlParts[0];
  const bodyPart = htmlParts[1];

  const HTMLContentWithoutPrevLinks = headPart.replace(linksRegExp, '');
  // get links
  const links = headPart.match(staticFilesRegExp) || [];
  // format fonts paths to html paths
  const mappedFontsWithPath = fontsFilesList.map(
    font => `${PUBLIC_URL}${fontsSubDir}/${font}`,
  );
  // get links in html format
  const newHTMLFormattedLinks = makeHTMLFormattedLinks([
    ...links,
    ...mappedFontsWithPath,
  ]);
  // get new html with formatted links
  const newHTMLContent =
    HTMLContentWithoutPrevLinks + newHTMLFormattedLinks + splitBy + bodyPart;

  await writeFile(pathToHTML, newHTMLContent);

  // eslint-disable-next-line
  console.log("Fonts patched");
};

fontsPatcher();
