const I = require('./ison')

const divtest1 = document.createElement('div')
divtest1.id = 'divtest1'
divtest1.classList += '1 divtest'
document.body.appendChild(divtest1)

const divtest2 = document.createElement('div')
divtest2.id = 'divtest2'
divtest2.classList += '2 divtest'
document.body.appendChild(divtest2)

const objTest = { foo: 'bar', hello: 'world', kow: { abu: 1, nga: 2 } }

test('px should return "px"', () => {
  expect(I.px).toBe('px')
})

test('isIos should be true if navigator userAgent is Ios', () => {
  Object.defineProperty(window.navigator, 'userAgent', { value: 'iPhone', configurable: true });
  expect(I.isIos()).toBeTruthy()
})

test('isIos should false if navigator userAgent is not Ios', () => {
  Object.defineProperty(window.navigator, 'userAgent', { value: 'windowsPhone', configurable: true });
  expect(I.isIos()).toBeFalsy()
})

test('isLandscape should be true if screen orientation is horizontal', () => {
  Object.defineProperty(window, 'orientation', { value: 90, writable: true });
  expect(I.isLandscape()).toBeTruthy()
})

test('formatPortrait should be true if screen orientation is vertical', () => {
  Object.defineProperty(window, 'orientation', { value: 0, writable: true });
  expect(I.formatPortrait()).toBeTruthy()
})

test('getInt should tranform a string size into int', () => {
  expect(I.getInt('666px')).toBe(666)
})

test('select should return a element', () => {
  expect(I.select('divtest1')).toEqual(divtest1)
})

test('selectClass should return a array of elements', () => {
  expect(I.selectClass('divtest')[0]).toEqual(divtest1)
})

test('selectTag should return a array of element', () => {
  expect(I.selectTag('div')[0]).toEqual(divtest1)
})

test('appendToDom should append an element to another', () => {
  I.appendToDom(divtest1, divtest2)
  expect(divtest2).toBe(divtest1.children[0])
  I.appendToDom('body', divtest1)
})

test('create should create an element', () => {
  const div = document.createElement('div')
  expect(I.create('div')).toEqual(div)
})

test('setElem should create an element width div, class and index', () => {
  expect(I.setElem('divtest', 'div', 2)).toEqual(divtest2)
})

test('innerTxt should write text into an element', () => {
  const text = 'innerTest'
  I.innerTxt(text, divtest1, divtest2)
  expect(divtest1.innerHTML).toEqual(text)
  expect(divtest2.innerHTML).toEqual(text)
})

test('opacity should change opacity style of an element', () => {
  I.opacity(0.5)(divtest1, divtest2)
  expect(divtest1.style.opacity).toEqual('0.5')
  expect(divtest2.style.opacity).toEqual('0.5')
})

test('display should change display style of an element', () => {
  I.display('flex')(divtest1, divtest2)
  expect(divtest1.style.display).toEqual('flex')
  expect(divtest2.style.display).toEqual('flex')
})

test('setPos should change position style of an element', () => {
  I.setPos('absolute')(divtest1, divtest2)
  expect(divtest1.style.position).toEqual('absolute')
  expect(divtest2.style.position).toEqual('absolute')
})

test('setZindex should change z-index style of an element', () => {
  I.setZindex(666, divtest1, divtest2)
  expect(divtest1.style.zIndex).toEqual('666')
  expect(divtest2.style.zIndex).toEqual('666')
})

test('bkgColor should change background-color style of an element', () => {
  I.bkgColor('000', divtest1, divtest2)
  expect(divtest1.style.backgroundColor).toEqual('rgb(0, 0, 0)')
  expect(divtest2.style.backgroundColor).toEqual('rgb(0, 0, 0)')
})

test('setPM should change margin and padding style of an element', () => {
  I.setPM('margin')(10, divtest1, divtest2)
  expect(divtest1.style.margin).toEqual('10px')
  expect(divtest2.style.margin).toEqual('10px')
})

test('setTransition should change transition style of an element', () => {
  I.setTransition('width', 2, 'linear', divtest1, divtest2)
  expect(divtest1.style.transition).toEqual('width 2s linear')
  expect(divtest2.style.transition).toEqual('width 2s linear')
  expect(divtest1.style.WebkitTransition).toEqual('width 2s linear')
  expect(divtest2.style.WebkitTransition).toEqual('width 2s linear')
})

test('setDim shoulde change dimension of element', () => {
  I.setWidth(100, divtest1)
  expect(divtest1.style.width).toEqual('100px')
  I.setHeight('50', divtest1)
  expect(divtest1.style.height).toEqual('50%')
})

test('addClass should add a class to a element', () => {
  I.addClass('test', divtest1, divtest2)
  expect(divtest1.classList).toContain('test')
  expect(divtest2.classList).toContain('test')
})

test('toggleClass should add a class if exist and remove if not to a element', () => {
  I.toggleClass('test', divtest1, divtest2)
  I.toggleClass('test2', divtest1, divtest2)
  expect(divtest1.classList).not.toContain('test')
  expect(divtest2.classList).not.toContain('test')
  expect(divtest1.classList).toContain('test2')
  expect(divtest2.classList).toContain('test2')
})

test('remClass should remove a class to a element', () => {
  I.remClass('test2', divtest1, divtest2)
  expect(divtest1.classList).not.toContain('test2')
  expect(divtest2.classList).not.toContain('test2')
})


test('createElement should create an element', () => {
  const obj = {
    name: 'test',
    tag: 'div',
    index: 1,
    style: {
      width: '10px',
      border: 'solid'
    },
    href: 'www.foo.com',
    src: 'www.bar.com',
    type: "test",
    append: divtest1
  }
  const test = I.createElement(obj)
  expect(test instanceof HTMLDivElement).toBeTruthy()
  expect(test.id).toEqual('test1')
  expect(test.style.width).toEqual('10px')
  expect(test.style.border).toEqual('solid')
  expect(test.href).toEqual('www.foo.com')
  expect(test.src).toEqual('www.bar.com')
  expect(test.type).toEqual('test')
  expect(test).toBe(divtest1.children[0])
})






