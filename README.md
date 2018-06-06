# ISON-JS

```javascript
// Just say I
import * as I from "ison-js"
```

### I.createNewCreative
Init a new creative, should be call at the end of the JS file

```javascript
I.createNewCreative({
  callback: build,
  name: 'creative',
  orga: 'ison.inc',
  favicon: 'assets/favicon.ico'
})
```
***
### I.getInt
return the Int value of a size elem in pixel

```javascript
I.getInt(elem.style.width)

//where elem.style.width = '200px' return 200
```
***
### I.amIphone
return true on Apple Iphone, browser or app

```javascript
I.amIphone()

```
***
### I.amLandscape
return true if mobile is in landscape position

```javascript
I.amLandscape()
```
***
### I.amPortrait
return true if mobile is in portrait position

```javascript
I.amPortrait()
```
***
### I.getSize
return an object size of an element or body
could return an error for some SDK overwriting the body

```javascript
I.getSize(elem)
```
***
## SELECTORS
#### I.select
short way for `document.getElementById`
```javascript
I.select('elem')
```
#### I.select
short way for `document.getElementsByClassName`
```javascript
I.selectClass('elem')
```
#### I.selectTag
short way for `document.getElementsByTag`
```javascript
I.selectTag('elem')
```
#### I.S
superSelector
```javascript
I.S('#id')
I.S('.class')
I.S('tag')
```
***
### I.have
is false if an element is undefined
```javascript
I.have(elem)
```
***
### I.create
short way for `document.createElement`
```javascript
I.create('div')
```
***
### I.setElem
create an element with name and class
`setElem(tag: string, name: string, index?: number)`
```javascript
I.setElem('div', 'foo', 1)
I.setElem('span', 'bar')
```
return
```html
<div id="foo1" class="1 foo"></div>
<span id="bar" class="bar"></span>
```
***
### I.addClass
short way for `elem.classList.add` for one or many elements
```html
<div id="foo1" class="1 foo"></div>
<span id="bar" class="bar"></span>
```
```javascript
const div = I.select('foo1')
const span = I.select('bar')

I.addClass('baz', div, span)
```
return
```html
<div id="foo1" class="1 foo baz"></div>
<span id="bar" class="bar baz"></span>
```
***
### I.remClass
short way for `elem.classList.remove` for one or many elements
```html
<div id="foo1" class="1 foo baz"></div>
<span id="bar" class="bar baz"></span>
```
```javascript
const div = I.select('foo1')
const span = I.select('bar')

I.remClass('baz', div, span)
```
return
```html
<div id="foo1" class="1 foo"></div>
<span id="bar" class="bar"></span>
```
***
### I.toggleClass
short way for `elem.classList.toggle` for one or many elements
```html
<div id="foo1" class="1 foo baz"></div>
<span id="bar" class="bar baz"></span>
```
```javascript
const div = I.select('foo1')
const span = I.select('bar')

I.toggleClass('baz', div)
I.toggleClass('fuz', span)
```
return
```html
<div id="foo1" class="1 foo"></div>
<span id="bar" class="bar baz fuz"></span>
```
***
### I.appendToDom
short way for `elem.appendChild(anotherElem)` for one or many elements. Could be 'body' for document.body
```javascript
I.appendToDom(wrapper, div, span)
```
should append div and span into wrapper
***
## CSS manipulation
### I.innerTxt
short way for `elem.innerHTML` for one or many elements.
```javascript
I.innerTxt('some text', div, span)
```
### I.opacity
short way for `elem.style.opacity` for one or many elements.
```javascript
I.opacity(0.5, div, span)
```
could be shortened :
```javascript
I.opacity0(div, span) // set opacity to 0
I.opacity1(div, span) // set opacity to 1
```
### I.display
short way for `elem.style.display` for one or many elements.
```javascript
I.display('none', div, span)
```
could be shortened :
```javascript
I.displayBlock(div, span) // set display to 'block'
I.displayNone(div, span) // set display to 'none'
I.displayFlex(div, span) // set display to 'flex'
```
### I.setPos
short way for `elem.style.position` for one or many elements.
```javascript
I.setPos('absolute', div, span)
```
could be shortened :
```javascript
I.setAbs(div, span) // set position to 'absolute'
I.setRel(div, span) // set position to 'relative'
I.setFix(div, span) // set position to 'fixed'
```
### I.setZindex
short way for `elem.style.zIndex` for one or many elements.
```javascript
I.setZindex(42, div, span)
```
### I.bkgColor
short way for `elem.style.backgroundColor` for one or many elements.
```javascript
I.bkgColor('#fff', div, span)
```
### I.setPM
short way for `elem.style.margin` or `elem.style.padding` for one or many elements.
Can be an int for px, a string for %, a vh or vw value or auto
```javascript
I.setPM('margin',10, div, span) // 10px
I.setPM('padding','10', div, span) // 10%
I.setPM('margin','10vw', div, span) // 10vw
I.setPM('padding','auto', div, span) //auto
```
could be shortened :
```javascript
I.setPadding(10,div, span) // set margin to 10px
I.setMargin('10',div, span) // set position to 'relative'
```
#### I.innerTxt
short way for `elem.innerHTML` for one or many elements.
```javascript
I.innerTxt('some text', div, span)
```
#### I.innerTxt
short way for `elem.innerHTML` for one or many elements.
```javascript
I.innerTxt('some text', div, span)
```
#### I.innerTxt
short way for `elem.innerHTML` for one or many elements.
```javascript
I.innerTxt('some text', div, span)
```
#### I.innerTxt
short way for `elem.innerHTML` for one or many elements.
```javascript
I.innerTxt('some text', div, span)
```
