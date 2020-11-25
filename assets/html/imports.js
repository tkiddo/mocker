function supportsImports() {
  return 'import' in document.createElement('link');
}

console.log(supportsImports());

const links = document.querySelectorAll('link[rel="import"]');
console.log(links);
// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
  const template = link.import.querySelector('.html-template');
  const clone = document.importNode(template.content, true);
  document.querySelector('body').appendChild(clone);
});
