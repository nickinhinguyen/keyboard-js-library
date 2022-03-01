"use strict";

const keyBoard = new KeyBoardGenerator({
  "element": 'keyboard-layout',
  "size": "60"
})
let currentSelectedkey = null

function generateDefaultLabel() {
  keyBoard.generateDefaultKeyText()
}

function resetLayout() {
  keyBoard.resetLayout()
}
let theme = null
fetch('../../theme.json')
  .then(response => response.json())
  .then(data => theme = data)
  .catch(error => console.log(error));


const keyCustomForm = document.querySelector('#custom-form')
keyCustomForm.addEventListener('submit', customAKey)
function customAKey(e) {
  e.preventDefault();
  if (currentSelectedkey) {
    document.querySelector('#nokeyerror').style.display = 'none'

    const keyLabel = document.querySelector('#button-label')
    keyBoard.changeCurrentButtonText(keyLabel.value)

    const keyColor = document.querySelector('#button-color')
    keyBoard.changeCurrentButtonColor(keyColor.value)

    const labelColor = document.querySelector('#label-color')
    keyBoard.changeCurrentButtonTextColor(labelColor.value)

    const labelSize = document.querySelector('#label-size')
    keyBoard.changeCurrentButtonTextSize(labelSize.value)

    const labelFont = document.querySelector('#font')
    keyBoard.changeCurrentButtonTextFontFamily(labelFont.value)

    const align = document.querySelector('#align')
    keyBoard.changeCurrentButtonTextAlign(align.value)

  } else {
    document.querySelector('#nokeyerror').style.display = 'block'
  }
}

const caseForm = document.querySelector('#case-color-form')
caseForm.addEventListener('submit', changeCaseColor)
function changeCaseColor(e) {
  e.preventDefault();
  const hex = document.querySelector('#case-color-hex').value
  keyBoard.changeCaseColor(hex)
}


const keysForm = document.querySelector('#all-keys-color-form')
keysForm.addEventListener('submit', changeKeysColor)
function changeKeysColor(e) {
  e.preventDefault();
  const hex = document.querySelector('#keys-color-hex').value
  keyBoard.changeTextColorforAll(hex)
}

const skinForm = document.querySelector('#skinForm')
skinForm.addEventListener('submit', submitSkin)
function submitSkin(e) {
  console.log('submit skin')
  e.preventDefault();
  const url = document.getElementById('imageURL').value;
  console.log(url)
  keyBoard.applySkin(url)
  const modal = document.getElementById('id01');
  modal.style.display = "none";
}



function exportTheme() {
  const outputDisplay = document.querySelector('#theme-textarea')
  outputDisplay.value = keyBoard.exportTheme()
}


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function myFunction2() {
  document.getElementById("myDropdown2").classList.toggle("show");
}

/*External library
* Colorwheel
* Copyright (c) 2010 John Weir (http://famedriver.com)
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*
* requires jQuery & Raphael
*   http://jquery.com http://raphaeljs.com
*
* see http://jweir.github.com/colorwheel for Usage
*
*/
function input_example() {
  var cw = Raphael.colorwheel($("#input_example .colorwheel")[0], 150);
  cw.input($("#input_example input")[0]);
}
input_example()
/* End of colorwheel library */



// Close the dropdown menu if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }

    // change keyboard size layout
    if (e.target.matches('.keysize-60')) {
      keyBoard.makeLayout60()
    } else if (e.target.matches('.keysize-65')) {
      keyBoard.makeLayout65()
    }
    // apply theme
    else if (e.target.matches('.rainbow')) {
      keyBoard.applyTheme(theme['rainbow-65'])
      keyBoard.applyTheme(theme['rainbow-60'])
    } else if (e.target.matches('.superman')) {
      keyBoard.applyTheme(theme["superman-60"])
      keyBoard.applyTheme(theme["superman-65"])
    } else if (e.target.matches('.koreaboo')) {
      keyBoard.applyTheme(theme["koreaboo-65"])
    } else if (e.target.matches('.shiba')) {
      keyBoard.applyTheme(theme["shiba-60"])
      // select a key for customization
    } else if (e.target.id.includes('key-')) {
      console.log('a')
      unselectButton()
      document.querySelector("#unselect-button").style.display = 'block'
      if (e.target.tagName.toLowerCase() == 'button') {
        currentSelectedkey = e.target.parentElement
        currentSelectedkey.firstChild.style.border = "dashed"
        currentSelectedkey.firstChild.style.borderColor = "red"

      } else {
        currentSelectedkey = e.target
        currentSelectedkey.firstChild.style.border = "dashed"
        currentSelectedkey.firstChild.style.borderColor = "red"
      }
    }
  }
}

function unselectButton() {
  if (currentSelectedkey) {
    currentSelectedkey.firstChild.style.borderColor = "grey"
    currentSelectedkey.firstChild.style.border = "none"
    currentSelectedkey = null
    document.querySelector("#unselect-button").style.display = 'none'
  }
}


/* Get all the fonts available in the user's browser
The code snippet below is from https://stackoverflow.com/questions/3368837/list-every-font-a-users-browser-can-display
*/
const fontCheck = new Set([
  // Windows 10
  'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New', 'Ebrima', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'HoloLens MDL2 Assets', 'Impact', 'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode', 'Malgun Gothic', 'Marlett', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MV Boli', 'Myanmar Text', 'Nirmala UI', 'Palatino Linotype', 'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Historic', 'Segoe UI Emoji', 'Segoe UI Symbol', 'SimSun', 'Sitka', 'Sylfaen', 'Symbol', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 'Yu Gothic',
  // macOS
  'American Typewriter', 'Andale Mono', 'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS', 'Avenir', 'Avenir Next', 'Avenir Next Condensed', 'Baskerville', 'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter', 'Cochin', 'Comic Sans MS', 'Copperplate', 'Courier', 'Courier New', 'Didot', 'DIN Alternate', 'DIN Condensed', 'Futura', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica', 'Helvetica Neue', 'Herculanum', 'Hoefler Text', 'Impact', 'Lucida Grande', 'Luminari', 'Marker Felt', 'Menlo', 'Microsoft Sans Serif', 'Monaco', 'Noteworthy', 'Optima', 'Palatino', 'Papyrus', 'Phosphate', 'Rockwell', 'Savoye LET', 'SignPainter', 'Skia', 'Snell Roundhand', 'Tahoma', 'Times', 'Times New Roman', 'Trattatello', 'Trebuchet MS', 'Verdana', 'Zapfino',
].sort());

async function getFont() {
  await document.fonts.ready;

  const fontAvailable = new Set();

  for (const font of fontCheck.values()) {
    if (document.fonts.check(`12px "${font}"`)) {
      fontAvailable.add(font);
    }
  }

  return fontAvailable;
};

/* End of code from https://stackoverflow.com/questions/3368837/list-every-font-a-users-browser-can-display
*/

// get all fonts to display as options for customize a key
let availableFonts = null
getFont().then(function (value) {
  availableFonts = value
  console.log(availableFonts)
  const fontOptions = document.querySelector("#font")
  availableFonts.forEach(f => {
    let option = document.createElement('option')
    option.value = f
    option.innerHTML = f
    fontOptions.appendChild(option)
  })
}
)