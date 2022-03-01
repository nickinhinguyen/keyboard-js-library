# KeyBoardGenerator API v1.0.0

## options
options to initial a KeyBoardGenerator Object

Propperty    |    Type       | Description
-----------  |:-------------:| :-----------
size         | String        |  The size of the keyboard. <br>You can choose between: <ul><li>"60"</li><li>"65"</li></ul>
element      | String        | A CSS id for the keyboard element (e.g: `<div id='keyboard-layout'/>` where the keyboard will be inserted to the DOM 

## Events

When the user click on a button on the keyboard, the `currentKeyDiv` state will be set for the KeyBoardGenerator. User can get the key that was pressed with method `getCurrentKeyDiv()`

## Methods
methods to control a KeyBoardGenerator Object

Name         | Params          | Description
-----------  |:-------------| :-----------
getCurrentKeyDiv         | None        | Return the most recent clicked on key on the keyboard (ex return div:`<div id="key-1" style=""><button id="key-1" style=""></button></div>`)
resetLayout      | None        | Reset the caseColor, fontFamily, textColor and render the default keyboard with the same size
makeLayout60|None|Created a 60% keyboard and insert to the DOM with id: `KeyBoardGenerator.element `
makeLayout65|None|Created a 65% keyboard and insert to the DOM with id: `KeyBoardGenerator.element `
generateDefaultKeyText|None|Assign the standard English keyboard label for each key
changeCaseColor|String: a hex color string <br>(e.g: `'#ffffff'`)| Change the KeyBoardGenerator object case color with given hex color string
changeCurrentButtonColor|String: a hex color string <br>(e.g: `'#ffffff'`)|Change the key color of the most recent clicked key with given hex color string
changeCurrentButtonText|String: label for the key <br>(e.g: `'Esc`)|Change the label symbol of the most recent clicked key with given text
changeCurrentButtonTextAlign|String: <ul><li>"right"</li><li>"left"</li><li>"center"</li>|Change the symbol align of the most recent clicked key with given alignment
changeCurrentButtonTextSize|String of int: size(e.g:`"12"`)|Change the symbol size of the most recent clicked key with given alignment
changeCurrentButtonTextColor| String: a hex color string <br>(e.g: `'#ffffff'`)|Change the symbol color of the most recent clicked key with given alignment
changeCurrentButtonTextFontFamily| String: font family <br>(e.g: `"Skia"`)|Change the font family of the most recent clicked key with given alignment
changeTextColorforAll| String: a hex color string <br>(e.g: `'#ffffff'`)|Change the symbol color for all keys
changeButtonText|Object{keyId:symbol}: A JS object which contains keyId String map to symbol string <br> e.x: `{"key-0": 'ESC', "key-1": "1", "key-2": "A"}`| Change the symbol of multiple keys given it's keyId and symbol text
changeButtonTextSize|Object{keyId:size}: A JS object which contains keyId String map to symbol size <br> e.x: `{ "key-43": "11", "key-57": "11", "key-29": "11", }`| Change the symbol size of multiple keys given it's keyId and symbol size
exportTheme|None|Export the current layout in JSON format. Note: export theme does not include skin propperty
applyTheme|Object: see Note for Theme | apply a them to the keyboard
applySkin|String: url of a photo.<br> Optional String: button edges color. Default value: `#FFFFFF`| Overlay a photo on the keyboard's key. Note, the skin won't be export using `exportTheme()`

## Theme
Theme is a JSON object. <br>
For reference, see example themes: <br>
 - [rainbow-theme](rainbowTheme.md) <br>
 - [koreaboo-theme](koreabooTheme.md) - only for 65% keyboard <br>
Options for theme:

Propperty    |    Value       | Description
-----------  |:-------------:| :-----------
keyboardSize | <ul><li>"60"</li><li>"65"</li></ul>        |  The size of the keyboard. 
textColor| String: hex color (e.x: `'#ffffff'`)| color for all key symbols
fontFamily|String: font family (e.x: `'#Trebuchet MS`)| font family for all key symbols
caseColor|String: hex color (e.x: `'#ffffff'`)| color for the keyboard case
keys| Object: keyid maps to a Theme-key fields object| Specific layout for each key

## Theme-key field object
JSON object to specify the layout for specific keys

Propperty    |    Value       | Description
-----------  |:-------------:| :-----------
text (Optional)| String: symbol for the key      |  Change symbol for the key with given text
textColor (Optional)| string: hex color |  Change symbol color the key with given color
color (Optional)|string: hex color |  Change key color  with given color
fontFamily (Optional)|string: hex color |  Change fontFamily of key with given fontFamily
textAlign (Optional)|<ul><li>"right"</li><li>"left"</li><li>"center"</li>|Change symbol align of key with given alignment