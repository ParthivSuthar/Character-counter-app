const charValue = document.querySelector(".textarea");
const btn = document.querySelector(".btn");
const totalWord = document.querySelector('#total-word')
const totalCount = document.getElementById("total-counter");
const remainingCount = document.getElementById("remaining-char");
const plainTextBtn = document.querySelector('.plaintxt')
const pdfTxtBtn = document.querySelector('.pdftxt')
const exportBtn = document.querySelector('#export-btns')

let userChar = 0;

const updateCounter = function () {
  userChar = charValue.value.length;

  // Update character count directly without any additional text
  totalCount.textContent = userChar;
  remainingCount.textContent = 150 - userChar;
};

charValue.addEventListener("input", () => {
  updateCounter();
  updateWordCounter();
});

const copyText = () => {
  charValue.select();
  charValue.setSelectionRange(0, 999);
  navigator.clipboard.writeText(charValue.value);
};

btn.addEventListener("click", copyText);

// Word Count Functionality

function updateWordCounter() {
  const text = charValue.value.trim();
  const words = countwords(text);
  totalWord.textContent = `${words}`;
}

function countwords(text) {
  let wordcount = 0;
  let inword = false;
  let wordLength = 0;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const isSpace = char === " " || char === "\n" || char === "\t";

    if (!isSpace && !inword) {
      inword = true;
      wordLength = 1; // Reset word length to 1 for new word
    } else if (!isSpace && inword) {
      wordLength++;
    } else if (isSpace && inword) {
      if (wordLength > 1) {
        wordcount++;
      }
      inword = false;
    }
  }

  if (inword && wordLength > 1) {
    wordcount++;
  }
  return wordcount;
}

// Export Text Functionality 

exportBtn.addEventListener("click", function(e){
  if(e.target.classList.contains("plaintxt")){
    exportText("plain");
  } else {
    exportText("pdf");
  }
})

function exportText(format){
  if(format === "plain"){
    // Export as Plain Text
    let text = charValue.value;
    let blob = new Blob([text],{type: 'text/plain'})
    let url = window.URL.createObjectURL(blob)
    let link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'text.txt')
    document.body.appendChild(link);
    link.click();  
  } else if(format === "pdf"){
    // Export as PDF using html2pdf.js library
    const styledText = `<div style="font-size: 30px;">${charValue.value}</div>`;
    html2pdf().from(styledText).save('text.pdf');
  }
}


