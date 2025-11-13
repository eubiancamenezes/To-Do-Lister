const fs = require('fs');
const { minify } = require('terser');
const CleanCSS = require('clean-css');
const htmlMinifier = require('html-minifier');

// Configuração para minificação HTML
const htmlConfig = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true
};

// Criar pasta dist se não existir
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

console.log('🚀 Iniciando processo de build...');

// Minificar CSS
try {
  const css = fs.readFileSync('style.css', 'utf8');
  const minifiedCSS = new CleanCSS().minify(css).styles;
  fs.writeFileSync('dist/style.min.css', minifiedCSS);
  console.log('✅ CSS minificado: redução de ' + css.length + ' para ' + minifiedCSS.length + ' caracteres');
} catch (error) {
  console.error('❌ Erro ao minificar CSS:', error);
}

// Minificar JavaScript
async function minifyJS() {
  try {
    const js = fs.readFileSync('script.js', 'utf8');
    const minifiedJS = await minify(js);
    fs.writeFileSync('dist/script.min.js', minifiedJS.code);
    console.log('✅ JavaScript minificado: redução de ' + js.length + ' para ' + minifiedJS.code.length + ' caracteres');
  } catch (error) {
    console.error('❌ Erro ao minificar JavaScript:', error);
  }
}

// Minificar HTML e atualizar referências
try {
  let html = fs.readFileSync('index.html', 'utf8');
  
  // Substituir referências para arquivos minificados
  html = html.replace('style.css', 'style.min.css');
  html = html.replace('script.js', 'script.min.js');
  
  // Minificar HTML
  const minifiedHTML = htmlMinifier.minify(html, htmlConfig);
  fs.writeFileSync('dist/index.html', minifiedHTML);
  console.log('✅ HTML minificado: redução de ' + html.length + ' para ' + minifiedHTML.length + ' caracteres');
} catch (error) {
  console.error('❌ Erro ao minificar HTML:', error);
}

// Executar minificação JS
minifyJS().then(() => {
  console.log('🎉 Build concluído! Arquivos otimizados em /dist/');
  console.log('📁 Estrutura criada:');
  console.log('   dist/index.html');
  console.log('   dist/style.min.css');
  console.log('   dist/script.min.js');
});
