//@flow

type Elem = HTMLElement & { src?: string, type?: string, href?: string }

type OptionElement = {
  name: string,
  tag: string,
  index?: number,
  display?: string,
  position?: string,
  width?: string | number,
  height?: string | number,
  top?: string | number,
  bottom?: string | number,
  right?: string | number,
  left?: string | number,
  opacity?: number,
  zIndex?: number,
  bkgColor?: string,
  innerTxt?: string,
  margin?: number,
  padding?: number,
  append?: Elem | 'body',
  class?: string,
  src?: string,
  href?: string,
  type?: string,
  style?: {...CSSStyleDeclaration }
}

const px: string = 'px';

const isIos = (): boolean => navigator.userAgent.includes('iPhone') && !navigator.userAgent.includes('Safari')

const isLandscape = (): boolean => window.orientation === 90 || window.orientation === -90

const formatPortrait = (): boolean => window.orientation == 0

const getInt = (elem: string): number => parseInt(elem.replace(px, ''), 10);

const select = (id: string): Elem | null => document.getElementById(id)

const selectClass = (className: string): HTMLCollection<Elem> | null => document.getElementsByClassName(className)

const selectTag = (tag: string): HTMLCollection<Elem> | null => document.getElementsByTagName(tag)

const create = (tag: string): Elem => document.createElement(tag);

const setElem = (name: string, tag: string, index?: number): Elem => {
  const elem = create(tag)
    elem.id = index ? `${name}${index}` : name
    elem.className = index ? `${index} ${name}`: name
  return elem
}

const appendToDom = (container: Elem | 'body', ...elem: Elem[]): void => {
  elem.map(e => {
    switch (typeof container) {
      case ('string'):
        if (document.body != null) {
          document.body.appendChild(e)
        } else {
          console.error("null error")
        }
        break;
      default:
        container.appendChild(e)
        break;
    }
  })
}


const innerTxt = (text: string, ...elem: Elem[]): string[] => elem.map(e => e.innerHTML = text)

const opacity = (lvl: number) => (...elem: Elem[]): string[] => elem.map(e => e.style.opacity = lvl.toString())

const opacity0 = opacity(0)
const opacity1 = opacity(1)

const display = (type: string) => (...elem: Elem[]): string[] => elem.map(e => e.style.display = type)

const displayBlock = display('block')
const displayNone = display('none')
const displayFlex = display('flex')

const setPos = (type: string) => (...elem: Elem[]): string[] => elem.map(e => e.style.position = type)

const setAbs = setPos('absolute')
const setRel = setPos('relative')
const setFix = setPos('fixed')

const setZindex = (z: number = 0, ...elem: Elem[]): string[] => elem.map(e => e.style.zIndex = z.toString())

const bkgColor = (color: string, ...elem: Elem[]): void => {
  const reg: RegExp = /^#/;
  elem.map(e => {
    const result: string = reg.test(color)
      ? color
      : '#' + color
    e.style.backgroundColor = hexToRgb(result)
    return e
  })
}

const setPM = (type: string) => (x: number, ...elem: Elem[]): void => {
  const style: string[] = ['margin', 'padding']
  const pm: number = style.indexOf(type)
  elem.map(e => {
    switch (pm) {
      case 0:
        e.style.margin = `${x}px`
        break;
      case 1:
        e.style.padding = `${x}px`
        break;
      default:
        console.error('margin/padding');
        break;
    }
    return e
  })
}

const setMargin = setPM('margin')
const setPadding = setPM('padding')

const setTransition = (prop: string, duration: number, ease: string, ...elem: Elem[]): void => {
  let param: string = `${prop} ${duration}s ${ease}`
  elem.map(e => {
    e.style.transition = param
    e.style.setProperty('-webkit-transition', param)
    return e
  })
}

const setDim = (dim: string) => (x: string | number, ...elem: Elem[]): void => {
  const vwvh: RegExp = /vw|vh/gi
  const result: string = typeof x === 'string'
    ? vwvh.test(x)
      ? `${x}`
      : `${x}%`
    : `${x}px`
  elem.map(e => {
    switch (dim) {
      case 'width':
        e.style.width = result
        break;
      case 'height':
        e.style.height = result
        break;
      case 'top':
        e.style.top = result
        break;
      case 'bottom':
        e.style.bottom = result
        break;
      case 'right':
        e.style.right = result
        break;
      case 'left':
        e.style.left = result
        break;
      default:
        console.error('dimension');
        break;
    }
    return e
  })
}

const setHeight = setDim('height')
const setWidth = setDim('width')
const setTop = setDim('top')
const setBottom = setDim('bottom')
const setRight = setDim('right')
const setLeft = setDim('left')

const classe = (type: string) => (newclass: string, ...elem: Elem[]): Elem[] => elem.map(e => {
  const classList: DOMTokenList = e.classList
  switch (type) {
    case 'add':
      classList.add(newclass)
      break;
    case 'remove':
      classList.remove(newclass)
      break;
    case 'toggle':
      classList.toggle(newclass)
      break;
    default:
      break;
  }
  return e
})

const addClass = classe('add')
const remClass = classe('remove')
const toggleClass = classe('toggle')

const debugo = (obj: {}): string => {
  let response: string = ''
  for (const key of Object.keys(obj)) {
    let kobj: string = '';
    if (typeof obj[key] === 'object') {
      for (const k of Object.keys(obj[key])) {
        kobj += '\n' + k + ' => ' + obj[key][k] + '\n'
      }
    } else {
      kobj = obj[key]
    }
    response += key + ' => ' + kobj + '\n'
  }
  console.log(`%c ${response}`, 'color: yellow')
  return response
}

const createElement = (opt: OptionElement): Elem => {
  const elem = setElem(opt.name, opt.tag, opt.index)
  if (opt.display)
    display(opt.display)(elem)
  if (opt.position)
    setPos(opt.position)(elem)
  if (opt.width)
    setWidth(opt.width, elem)
  if (opt.height)
    setHeight(opt.height, elem)
  if (opt.top)
    setTop(opt.top, elem)
  if (opt.bottom)
    setBottom(opt.bottom, elem)
  if (opt.left)
    setLeft(opt.left, elem)
  if (opt.right)
    setRight(opt.right, elem)
  if (opt.opacity)
    opacity(opt.opacity)(elem)
  if (opt.zIndex)
    setZindex(opt.zIndex, elem)
  if (opt.bkgColor)
    bkgColor(opt.bkgColor, elem)
  if (opt.innerTxt)
    innerTxt(opt.innerTxt, elem)
  if (opt.margin)
    setMargin(opt.margin, elem)
  if (opt.padding)
    setPadding(opt.padding, elem)
  if (opt.append)
    appendToDom(opt.append, elem)
  if (opt.class)
    addClass(opt.class, elem)
  if (opt.style) {
    const keys: string[] = Object.keys(opt.style)
    const values: mixed[] = Object.values(opt.style)
    keys.forEach((k, i) => {
      if (typeof values[i] === 'string') elem.style.setProperty(k, values[i])
    })
  }
  if (opt.src)
    elem.src = opt.src
  if (opt.href)
    elem.href = opt.href
  if (opt.type)
    elem.type = opt.type
  return elem
}

const hexToRgb = (hex: string): string => {
  const bigint: number = parseInt(hex, 16);
  const r: number = (bigint >> 16) & 255;
  const g: number = (bigint >> 8) & 255;
  const b: number = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

module.exports = {
  px,
  isIos,
  isLandscape,
  formatPortrait,
  select,
  selectClass,
  selectTag,
  create,
  setElem,
  appendToDom,
  innerTxt,
  getInt,
  opacity,
  opacity0,
  opacity1,
  display,
  displayNone,
  displayFlex,
  displayBlock,
  displayBlock,
  setPos,
  setFix,
  setAbs,
  setRel,
  setZindex,
  bkgColor,
  setPM,
  setMargin,
  setPadding,
  setTransition,
  setDim,
  setWidth,
  setHeight,
  setTop,
  setBottom,
  setRight,
  setLeft,
  classe,
  addClass,
  remClass,
  toggleClass,
  debugo,
  createElement
}