const cardElements = document.getElementsByClassName('card');
const initializeElements = [];
Array.from(cardElements).forEach(cardElement => {
  const asideParagraph = cardElement.querySelector('aside > p');
  initializeElements.push(asideParagraph.innerHTML);
});
const formatUnderLine = () => {
  const cardElements = document.getElementsByClassName('card');
  for (let i = 0; i < cardElements.length; i++) {
    const card = cardElements[i];
    const cardText = card.querySelector('aside > p');
    const fontSize = parseInt(window.getComputedStyle(cardText).getPropertyValue('font-size'));
    const textLength = Math.floor(cardText.offsetWidth / fontSize);
    console.log(textLength);
    function formatText(initializeText) {
      const cleanedText = initializeText.replace(/<\/?span[^>]*>/g, '');
      return cleanedText;
    }

    const formatCardText = (inputString, numChars) => {
      const resultArray = [];
      let currentChunk = '';
      let charCount = 0;
      for (let i = 0; i < inputString.length; i++) {
        if (inputString[i] === '<' && inputString[i + 1] === 'b' && inputString[i + 2] === 'r' && inputString[i + 3] === '>') {
          if (currentChunk.length > 0) {
            resultArray.push(currentChunk);
            currentChunk = '';
            charCount = 0;
          }
          i += 3;
        } else {
          if ((charCount === numChars) || (charCount + 1 === numChars && inputString[i + 1] === '。')) {
            resultArray.push(currentChunk);
            currentChunk = '';
            charCount = 0;
          }
          currentChunk += inputString[i];
          charCount++;
        }
      }
      if (currentChunk.length > 0) {
        resultArray.push(currentChunk);
      }
      return resultArray;
    };
    console.log(formatText(initializeElements[i]))

    const formattedArray = formatCardText(formatText(initializeElements[i]), textLength);
    console.log(formattedArray.map(item => `<span>${item}</span>`).join(' '));
    cardText.innerHTML = formattedArray.map(item => `<span>${item}</span>`).join(' ');
  }
}

formatUnderLine()
let resizeTimeout;

window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      formatUnderLine()
    }, 500);
});
