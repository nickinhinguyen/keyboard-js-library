"use strict";

(function (global, document) {
  const KEYBOARD_LAYOUT_60 = '60'
  const KEYBOARD_LAYOUT_60_KEY_SYMBOL_DEDFAULT = {
    "key-0": 'ESC', "key-1": "1", "key-2": "2", "key-3": "3", "key-4": "4", "key-5": "5", "key-6": "6", "key-7": "7", "key-8": "8", "key-9": "9", "key-10": "0", "key-11": "-_", "key-12": "=+", "key-13": "BACK",
    "key-14": "TAB", "key-15": "Q", "key-16": "W", "key-17": "E", "key-18": "R", "key-19": "T", "key-20": "Y", "key-21": "U", "key-22": "I", "key-23": "O", "key-24": "P", "key-25": "[{", "key-26": "]}", "key-27": "\\|",
    "key-28": "CapsLock", "key-29": "A", "key-30": "S", "key-31": "D", "key-32": "F", "key-33": "G", "key-34": "H", "key-35": "J", "key-36": "K", "key-37": "L", "key-38": ";:", "key-39": `'"`, "key-40": "ENTER",
    "key-41": "SHIFT", "key-42": "Z", "key-43": "X", "key-44": "C", "key-45": "V", "key-46": "B", "key-47": "N", "key-48": "M", "key-49": ",<", "key-50": ".>", "key-51": "/?", "key-52": "SHIFT",
    "key-53": "Ctrl", "key-54": "Option", "key-55": "CMD", "key-57": "CMD", "key-58": "ALT", "key-59": "FN", "key-60": "Ctrl", "key-56": ""
  }

  const KEYBOARD_LAYOUT_65 = '65'
  const KEYBOARD_LAYOUT_65_KEY_SYMBOL_DEDFAULT = {
    "key-0": 'ESC', "key-1": "1", "key-2": "2", "key-3": "3", "key-4": "4", "key-5": "5", "key-6": "6", "key-7": "7", "key-8": "8", "key-9": "9", "key-10": "0", "key-11": "-_", "key-12": "=+", "key-13": "BACK", "key-14": "Ins",
    "key-15": "TAB", "key-16": "Q", "key-17": "W", "key-18": "E", "key-19": "R", "key-20": "T", "key-21": "Y", "key-22": "U", "key-23": "I", "key-24": "O", "key-25": "P", "key-26": "[{", "key-27": "]}", "key-28": "\\ |", "key-29": "Home",
    "key-30": "CapsLock", "key-31": "A", "key-32": "S", "key-33": "D", "key-34": "F", "key-35": "G", "key-36": "H", "key-37": "J", "key-38": "K", "key-39": "L", "key-40": ";:", "key-41": `'"`, "key-42": "ENTER", "key-43": "PgUp",
    "key-44": "SHIFT", "key-45": "Z", "key-46": "X", "key-47": "C", "key-48": "V", "key-49": "B", "key-50": "N", "key-51": "M", "key-52": ",<", "key-53": ".>", "key-54": "/?", "key-55": "SHIFT", "key-56": "↑",
    "key-57": "PgDn", "key-58": "Option", "key-59": "CMD", "key-60": "CMD", "key-61": "", "key-62": "ALT", "key-63": "FN", "key-64": "Ctrl", "key-65": "←", "key-66": "↓", "key-67": "→"
  }
  const TEXT_ALIGN = ["left", "right", "center"]

  /**
   * Create a KeyBoardGenerator object with givin options
   * @param {Object} options to initial a KeyBoardGenerator Object
   * @param {String} options.size the size of the keyboard. You can choose between: "60" || "65"
   * @param {String} A CSS id for the keyboard element (e.g: <div id='keyboard-layout'/> where the keyboard will be inserted to the DOM 
   * @returns {Object} KeyBoardGenerator Object
   */
  function KeyBoardGenerator(options) {
    this.keyboardSize = options.size
    this.element = options.element
    this.caseColor = "rgba(60, 60, 60,0.99)"
    this.fontFamily = "Skia"
    this.textColor = "rgba(60, 60, 60,0.99)"
    this.keyRows = []
    this.keys = {}
    _initialKeyboardLayout(this, this.keyboardSize)
    this.currentKeyDiv = null
    return this
  }

  function _makeSpecialButton(keyboardObj, width, row, count) {

    const key = document.createElement('div')
    key.style = `width: ${width}px ; height: 50px; background-color: rgba(210, 210, 210,0.5); border-color: aliceblue; border: 1px; border-style: solid; border-radius:4px;  display: grid; justify-content: center;`
    let keyTopSurface = document.createElement('button')
    keyTopSurface.style = `width: ${width - 10}px; height: 40px; background-color: 	rgba(255,255,255,0.99);border:none; border-radius: 4px;margin-top:2px;`
    key.id = `key-${count}`
    keyTopSurface.id = `key-${count}`
    key.appendChild(keyTopSurface)
    key.addEventListener('click', _setButtonDiv.bind(keyboardObj))
    keyboardObj.keys[`key-${count}`] = key
    count += 1
    row.appendChild(key)
    return count
  }

  function _makeRowOfSquareKey(keyboardObj, numKeys, row, count) {
    let i = 0
    for (i; i < numKeys; i++) {
      let key = document.createElement('div')
      key.style = "width: 50px; height: 50px; background-color: rgba(210, 210, 210,0.5); border-color: aliceblue; border: 1px; border-style: solid; border-radius: 4px; display: grid; justify-content: center;"
      let keyTopSurface = document.createElement('button')
      keyTopSurface.style = 'width: 40px; height: 40px; background-color:	rgba(255,255,255,0.99);border:none;border-radius: 4px; rgb(240, 240, 240, 0.99);margin-top:2px;'
      keyTopSurface.id = `key-${count + i}`
      key.id = `key-${count + i}`
      key.appendChild(keyTopSurface)
      key.addEventListener('click', _setButtonDiv.bind(keyboardObj))
      keyboardObj.keys[`key-${count + i}`] = key
      row.appendChild(key)
    }
    count += numKeys
    return count
  }

  function _initialKeyboardLayout(keyboardObj, size) {
    if (size == KEYBOARD_LAYOUT_60) {
      keyboardObj.makeLayout60(keyboardObj.element)
    } else if (size == KEYBOARD_LAYOUT_65) {
      keyboardObj.makeLayout65(keyboardObj.element)
    }
  }
  function _resetState(keyboardObj) {
    keyboardObj.caseColor = "rgba(60, 60, 60,1)"
    keyboardObj.fontFamily = "Skia"
    keyboardObj.textColor = "rgba(60, 60, 60,1)"
    keyboardObj.keyRows = []
    keyboardObj.keys = {}
    keyboardObj.currentKeyDiv = null
    const list = document.getElementById(keyboardObj.element);
    list.childNodes[0] ? list.removeChild(list.childNodes[0]) : null
  }

  function _setButtonDiv(e) {
    if (e.target.id.includes('key')) {
      if (e.target.tagName.toLowerCase() == 'button') {
        this.currentKeyDiv = e.target.parentElement
        return 1
      }
      this.currentKeyDiv = e.target
      return 1
    }
    return -1
  }

  KeyBoardGenerator.prototype = {
    getCurrentKeyDiv() {
      return this.currentKeyDiv
    },

    resetLayout: function () {
      this.caseColor = "rgba(60, 60, 60,1)"
      this.fontFamily = "Skia"
      this.textColor = "rgba(60, 60, 60,1)"
      this.keyRows = []
      this.keys = {}
      this.currentKeyDiv = null
      const list = document.getElementById(this.element);
      list.childNodes[0] ? list.removeChild(list.childNodes[0]) : null
      _initialKeyboardLayout(this, this.keyboardSize)
    },

    makeLayout60: function () {
      _resetState(this)
      this.keyboardSize = KEYBOARD_LAYOUT_60
      const container = document.getElementById(this.element)
      const caseEle = document.createElement('div')
      caseEle.style = `background-color: ${this.caseColor};
    width: max-content;
    padding: 20px;
    border-radius: 10px;
    border-color: ${this.caseColor};
    display:flex;
    flex-direction: column;
    `
      caseEle.id = 'keyboard-case'
      let count = 0

      const firstRow = document.createElement('div')
      firstRow.style = `display:flex`
      this.keyRows.push(firstRow)
      count = _makeRowOfSquareKey(this, 13, firstRow, count)
      count = _makeSpecialButton(this, 100, firstRow, count)

      const secondRow = document.createElement('div')
      secondRow.style = `display:flex`
      this.keyRows.push(secondRow)
      count = _makeSpecialButton(this, 75, secondRow, count)
      count = _makeRowOfSquareKey(this, 12, secondRow, count)
      count = _makeSpecialButton(this, 75, secondRow, count)

      const thirdRow = document.createElement('div')
      thirdRow.style = `display:flex`
      this.keyRows.push(thirdRow)
      count = _makeSpecialButton(this, 90, thirdRow, count)
      count = _makeRowOfSquareKey(this, 11, thirdRow, count)
      count = _makeSpecialButton(this, 112, thirdRow, count)

      const fourthRow = document.createElement('div')
      fourthRow.style = `display:flex`
      this.keyRows.push(fourthRow)
      count = _makeSpecialButton(this, 117, fourthRow, count)
      count = _makeRowOfSquareKey(this, 10, fourthRow, count)
      count = _makeSpecialButton(this, 137, fourthRow, count)

      const fifthRow = document.createElement('div')
      fifthRow.style = `display:flex`
      this.keyRows.push(fifthRow)
      for (let i = 0; i < 3; i++) {
        count = _makeSpecialButton(this, 65, fifthRow, count)
      }
      count = _makeSpecialButton(this, 307, fifthRow, count)
      for (let i = 0; i < 4; i++) {
        count = _makeSpecialButton(this, 65, fifthRow, count)
      }

      const layout = document.createElement('div')
      layout.id = 'key-layout'
      layout.appendChild(firstRow)
      layout.appendChild(secondRow)
      layout.appendChild(thirdRow)
      layout.appendChild(fourthRow)
      layout.appendChild(fifthRow)
      caseEle.appendChild(layout)
      container.appendChild(caseEle)
    },

    makeLayout65: function () {
      _resetState(this)
      this.keyboardSize = KEYBOARD_LAYOUT_65
      const container = document.getElementById(this.element)
      const caseEle = document.createElement('div')
      caseEle.style = `background-color: ${this.caseColor};
    width: max-content;
    padding: 20px;
    border-radius: 10px;
    border-color: ${this.caseColor};
    display:flex;
    flex-direction: column;
    `
      caseEle.id = 'keyboard-case'
      let count = 0

      const firstRow = document.createElement('div')
      firstRow.style = `display:flex`
      this.keyRows.push(firstRow)
      count = _makeRowOfSquareKey(this, 13, firstRow, count)
      count = _makeSpecialButton(this, 100, firstRow, count)
      count = _makeRowOfSquareKey(this, 1, firstRow, count)

      const secondRow = document.createElement('div')
      secondRow.style = `display:flex`
      this.keyRows.push(secondRow)
      count = _makeSpecialButton(this, 75, secondRow, count)
      count = _makeRowOfSquareKey(this, 12, secondRow, count)
      count = _makeSpecialButton(this, 75, secondRow, count)
      count = _makeRowOfSquareKey(this, 1, secondRow, count)


      const thirdRow = document.createElement('div')
      thirdRow.style = `display:flex`
      this.keyRows.push(thirdRow)
      count = _makeSpecialButton(this, 90, thirdRow, count)
      count = _makeRowOfSquareKey(this, 11, thirdRow, count)
      count = _makeSpecialButton(this, 112, thirdRow, count)
      count = _makeRowOfSquareKey(this, 1, thirdRow, count)

      const fourthRow = document.createElement('div')
      fourthRow.style = `display:flex`
      this.keyRows.push(fourthRow)
      count = _makeSpecialButton(this, 117, fourthRow, count)
      count = _makeRowOfSquareKey(this, 10, fourthRow, count)
      count = _makeSpecialButton(this, 87, fourthRow, count)
      count = _makeRowOfSquareKey(this, 2, fourthRow, count)

      const fifthRow = document.createElement('div')
      fifthRow.style = `display:flex`
      this.keyRows.push(fifthRow)
      for (let i = 0; i < 3; i++) {
        count = _makeSpecialButton(this, 65, fifthRow, count)
      }
      count = _makeSpecialButton(this, 270, fifthRow, count)
      for (let i = 0; i < 3; i++) {
        count = _makeSpecialButton(this, 65, fifthRow, count)
      }
      count = _makeRowOfSquareKey(this, 3, fifthRow, count)

      const layout = document.createElement('div')
      layout.id = 'key-layout'
      layout.appendChild(firstRow)
      layout.appendChild(secondRow)
      layout.appendChild(thirdRow)
      layout.appendChild(fourthRow)
      layout.appendChild(fifthRow)
      caseEle.appendChild(layout)
      container.appendChild(caseEle)
    },

    generateDefaultKeyText() {
      if (this.keyboardSize == KEYBOARD_LAYOUT_60) {
        this.changeButtonText(KEYBOARD_LAYOUT_60_KEY_SYMBOL_DEDFAULT)
      }
      if (this.keyboardSize == KEYBOARD_LAYOUT_65) {
        this.changeButtonText(KEYBOARD_LAYOUT_65_KEY_SYMBOL_DEDFAULT)
        this.changeButtonTextSize({ "key-43": "11", "key-57": "11", "key-29": "11", })
      }
    },

    changeCaseColor: function (hexColor) {

      const keyboard = document.getElementById(this.element)
      const keyCase = keyboard.querySelector('#keyboard-case')
      keyCase.style.backgroundColor = hexToRGB(hexColor, "1")
      this.caseColor = hexToRGB(hexColor, "1")
      return 1
    },

    changeCurrentButtonColor: function (hexColor) {
      if (this.currentKeyDiv) {
        this.currentKeyDiv.style.backgroundColor = hexToRGB(hexColor, "0.5")
        this.currentKeyDiv.firstChild.style.backgroundColor = hexToRGB(hexColor, "0.99")
        return 1
      }
      return -1

    },

    changeButtonText: function (keyToTextDict) {
      Object.keys(keyToTextDict).map(k => {
        if (Object.keys(this.keys).includes(k)) {
          this.keys[k].firstChild.innerHTML = keyToTextDict[k]
        }
      })
    },

    changeButtonTextSize: function (keyToSizeDict) {
      Object.keys(keyToSizeDict).map(k => {

        if (Object.keys(this.keys).includes(k)) {
          this.keys[k].firstChild.style.fontSize = keyToSizeDict[k]
        }
      })
    },


    changeCurrentButtonText: function (text) {
      if (this.currentKeyDiv && text.length) {
        this.currentKeyDiv.firstChild.innerHTML = text
      }
    },

    changeCurrentButtonTextAlign: function (textAlign) {
      if (this.currentKeyDiv && TEXT_ALIGN.includes(textAlign)) {
        this.currentKeyDiv.firstChild.style.textAlign = textAlign
      }
    },

    changeCurrentButtonTextSize: function (size) {
      if (this.currentKeyDiv && size > 0 && size < 100) {
        this.currentKeyDiv.firstChild.style.fontSize = size
      }
    },

    changeCurrentButtonTextColor: function (Hextcolor) {
      if (this.currentKeyDiv) {
        this.currentKeyDiv.firstChild.style.color = hexToRGB(Hextcolor, 0.99)
      }
    },

    changeCurrentButtonTextFontFamily: function (fontFamily) {
      if (this.currentKeyDiv) {
        this.currentKeyDiv.firstChild.style.fontFamily = fontFamily
      }
    },
    changeTextColorforAll: function (hexColor) {
      Object.keys(this.keys).map(k => {
        this.keys[k].firstChild.style.color = hexToRGB(hexColor, 0.99)
      })
    },

    applyTheme: function (theme) {
      if (theme.keyboardSize != this.keyboardSize) {
        console.log(theme.keyboardSize)
        console.log(this.keyboardSize)

        console.log("ERROR: keyboardSize not compatible")
        return -1
      }
      theme.fontFamily ? this.fontFamily = theme.fontFamily : null
      theme.textColor ? this.textColor = theme.textColor : null
      theme.caseColor ? this.changeCaseColor(theme.caseColor) : null
      Object.keys(theme.keys).map(k => {
        let buttonDiv = this.keys[k]
        if (buttonDiv) {
          let keyFont = theme.keys[k].fontFamily ? theme.keys[k].fontFamily : this.fontFamily
          let keyTextColor = theme.keys[k].textColor ? theme.keys[k].textColor : this.textColor
          this.currentKeyDiv = buttonDiv
          this.changeCurrentButtonText(theme.keys[k].text)
          this.changeCurrentButtonTextFontFamily(keyFont)
          this.changeCurrentButtonTextColor(keyTextColor)
          theme.keys[k].textAlign ? this.changeCurrentButtonTextAlign(theme.keys[k].textAlign) : null
          theme.keys[k].textSize ? this.changeCurrentButtonTextSize(theme.keys[k].textSize) : null
          theme.keys[k].color ? this.changeCurrentButtonColor(theme.keys[k].color) : null

        }
      }
      )
    },

    exportTheme: function () {
      let theme = {}
      console.log(this.caseColor)
      theme.keyboardSize = this.keyboardSize
      theme.textColor = RGBToHex(this.textColor)
      theme.fontFamily = this.fontFamily
      theme.caseColor = RGBToHex(this.caseColor)
      theme.keys = {}
      Object.keys(this.keys).map(k => {
        let key = {}
        key.text = this.keys[k].firstChild.innerHTML
        this.keys[k].firstChild.style.color ? key.textColor = RGBToHex(this.keys[k].firstChild.style.color) : null
        this.keys[k].firstChild.style.backgroundColor ? key.color = RGBToHex(this.keys[k].firstChild.style.backgroundColor) : null
        this.keys[k].firstChild.style.textAlign ? key.textAlign = this.keys[k].firstChild.style.textAlign : null
        this.keys[k].firstChild.style.fontFamily ? key.fontFamily = this.keys[k].firstChild.style.fontFamily : null
        this.keys[k].firstChild.style.textSize ? key.textSize = this.keys[k].firstChild.style.textSize : null
        theme.keys[k] = key
      }
      )
      return JSON.stringify(theme)
    },

    applySkin: function (skin, buttonSideColor = '#FFFFFF') {
      buttonSideColor = hexToRGB(buttonSideColor, 0.5)
      console.log(buttonSideColor)
      const keyboard = document.getElementById(this.element)
      const layout = keyboard.firstChild.firstChild

      const heigth = layout.offsetHeight
      const h = heigth / this.keyRows.length

      // offset
      let x = 0
      let y = 0
      this.keyRows.map(r => {
        r.childNodes.forEach(div => {
          let button = div.firstChild
          div.style.backgroundColor = buttonSideColor
          button.style.backgroundImage = `url(${skin})`
          button.style.backgroundPosition = "-" + x + 'px' + ' -' + y + 'px'
          x += div.offsetWidth
        })
        x = 0
        y += h
      })
    }
  }


  /*
  This function will convert hex color string to rbga with given opacity
  this code snippet is from https://css-tricks.com/converting-color-spaces-in-javascript/
  */
  function hexToRGB(h, opacity) {
    let r = 0, g = 0, b = 0;

    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];


    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }

    return "rgba(" + +r + "," + +g + "," + +b + "," + opacity + ")";
  }
  /*
  This function will convert rbga to hex color string 
  this code snippet is from https://css-tricks.com/converting-color-spaces-in-javascript/
  */
  function RGBToHex(rgba) {
    let sep = rgba.indexOf(",") > -1 ? "," : " ";
    rgba = rgba.substr(5).split(")")[0].split(sep);

    // Strip the slash if using space-separated syntax
    if (rgba.indexOf("/") > -1)
      rgba.splice(3, 1);

    for (let R in rgba) {
      let r = rgba[R];
      if (r.indexOf("%") > -1) {
        let p = r.substr(0, r.length - 1) / 100;

        if (R < 3) {
          rgba[R] = Math.round(p * 255);
        } else {
          rgba[R] = p;
        }
      }
    }

    let r = (+rgba[0]).toString(16),
      g = (+rgba[1]).toString(16),
      b = (+rgba[2]).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;


    return "#" + r + g + b;
  }

  global.KeyBoardGenerator = global.KeyBoardGenerator || KeyBoardGenerator

})(window, window.document);

