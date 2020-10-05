const path = require('path');
const { readFile, writeFile } = require('../../utils/fs-promises');

// eslint-disable-next-line
(async function() {
  const pathToHtml = path.join(process.cwd(), 'build', 'index.html');

  const htmlContent = await readFile(pathToHtml, { encoding: 'utf-8' });

  const htmlWithoutFonts = htmlContent.replace(
    /(<style id="fonts">)(.*)(<style id="preloader">)/gi,
    (match, $1, $2, $3) => $3,
  );

  await writeFile(pathToHtml, htmlWithoutFonts);
})();
