//@flow

//TYPE ===============================================================================================================
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
  event?: Function,
  tstart?: Function,
  tmove?: Function,
  tend?: Function,
  click?: Function,
  style?: {...CSSStyleDeclaration }
}

type Size = { w: number, h: number }




//string replace ===============================================================================================================

const px: string = 'px';

const getInt = (elem: string): number => parseInt(elem.replace(px, ''), 10);

//MRAID ===============================================================================================================

const amMraid = (): boolean => window.mraid !== undefined

const mraidReady = (): Promise<boolean> => {
  return new Promise((resolve) => {
    window.mraid.addEventListener('ready', () => {
      resolve(true)
    })
  })
}

//MOBILE CHECK ===============================================================================================================

const isIos = (): boolean => navigator.userAgent.includes('iPhone') && !navigator.userAgent.includes('Safari')

const isLandscape = (): boolean => window.orientation === 90 || window.orientation === -90

const formatPortrait = (): boolean => window.orientation == 0

//SIZE ===============================================================================================================

const getSize = (): Promise<Size> => {
  return new Promise((resolve, reject) => {
    var sizedDiv = document.createElement("div");
    sizedDiv.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;";
    const computedH = window.getComputedStyle(sizedDiv, null).getPropertyValue('height')
    if (document.documentElement !== null) document.documentElement.insertBefore(sizedDiv, document.documentElement.firstChild);
    if (sizedDiv.offsetWidth !== undefined && sizedDiv.offsetHeight !== undefined) {
      resolve({ w: sizedDiv.offsetWidth, h: sizedDiv.offsetHeight })
      if (document.documentElement !== null) document.documentElement.removeChild(sizedDiv)
    }
  })
}

async function getMRAIDSize(): Promise<Size> {
  const s = await getSize()
  const ready = await mraidReady()
  return ready
    ? { w: window.mraid.getCurrentPosition().width, h: window.mraid.getCurrentPosition().height }
    : { w: s.w, h: s.h }
}

async function computeSize(): Promise<Size> {
  const s = amMraid() ? await getMRAIDSize() : await getSize()
  window.creativeSize = {
    w: s.w,
    h: s.h
  }
  return {
    w: s.w,
    h: s.h
  }
}

//SELECTORS ===============================================================================================================

const select = (id: string): Elem | null => document.getElementById(id)

const selectClass = (className: string): HTMLCollection<Elem> | null => document.getElementsByClassName(className)

const selectTag = (tag: string): HTMLCollection<Elem> | null => document.getElementsByTagName(tag)

const S = (selector: string): HTMLCollection<Elem> | null | Elem => {
  const first = selector.charAt(0)
  switch (first) {
    case '.':
      return selectClass(selector.slice(1, selector.length))
    case '#':
      return select(selector.slice(1, selector.length))
    default:
      return selectTag(selector)
  }
}

//CREATOR ===============================================================================================================

const create = (tag: string): Elem => document.createElement(tag);

const setElem = (name: string, tag: string, index?: number): Elem => {
  const elem = create(tag)
  elem.id = index ? `${name}${index}` : name
  elem.className = index ? `${index} ${name}` : name
  return elem
}

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

//CSS MANIP ===============================================================================================================

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

const bkgColor = (color: string, ...elem: Elem[]): string[] => elem.map(e => e.style.backgroundColor = color)

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

//TODO: styles function

//TODO: VIDEO to CANVAS

//EVENT ===============================================================================================================
const eventHandler = (event: string) => (handleEvent: EventListener, elem: Elem, bubble?: boolean) => {
  elem.addEventListener(event, handleEvent, bubble)
}

const click = eventHandler('click')
const tstart = eventHandler('touchstart')
const tmove = eventHandler('touchmove')
const tend = eventHandler('touchend')

//HELPERS ===============================================================================================================
const debugo = (obj: {}): string => {
  let response: string = ''
  for (const key of Object.keys(obj)) {
    let kobj: string = '';
    if (typeof obj[key] === 'object') {
      if (key === 'append') {
        kobj = obj[key].id
      } else {
        for (const k of Object.keys(obj[key])) {
          kobj += '\n' + k + ' => ' + obj[key][k] + '\n'
        }
      }
    } else {
      kobj = obj[key]
    }
    response += key + ' => ' + kobj + '\n'
  }
  console.log(`%c ${response}`, 'color: yellow')
  return response
}

//CreateElem COMPIL ===============================================================================================================

function CreateElem(opt: OptionElement): void {
  this.opt = opt;
  this.i
  this.build();
}

CreateElem.prototype = {
  build: function () {
    this.i = setElem(this.opt.name, this.opt.tag, this.opt.index)
    if (this.opt.display) display(this.opt.display)(this.i)
    if (this.opt.position) setPos(this.opt.position)(this.i)
    if (this.opt.width) setWidth(this.opt.width, this.i)
    if (this.opt.height) setHeight(this.opt.height, this.i)
    if (this.opt.top) setTop(this.opt.top, this.i)
    if (this.opt.bottom) setBottom(this.opt.bottom, this.i)
    if (this.opt.left) setLeft(this.opt.left, this.i)
    if (this.opt.right) setRight(this.opt.right, this.i)
    if (this.opt.opacity) opacity(this.opt.opacity)(this.i)
    if (this.opt.zIndex) setZindex(this.opt.zIndex, this.i)
    if (this.opt.bkgColor) bkgColor(this.opt.bkgColor, this.i)
    if (this.opt.innerTxt) innerTxt(this.opt.innerTxt, this.i)
    if (this.opt.margin) setMargin(this.opt.margin, this.i)
    if (this.opt.padding) setPadding(this.opt.padding, this.i)
    if (this.opt.append) appendToDom(this.opt.append, this.i)
    if (this.opt.class) addClass(this.opt.class, this.i)
    if (this.opt.style) {
      const keys: string[] = Object.keys(this.opt.style)
      const values: mixed[] = Object.values(this.opt.style)
      keys.forEach((k, i) => {
        if (typeof values[i] === 'string') this.i.style.setProperty(k, values[i])
      })
    }
    if (this.opt.src) this.i.src = this.opt.src
    if (this.opt.href) this.i.href = this.opt.href
    if (this.opt.type) this.i.type = this.opt.type
    if (this.opt.tstart) tstart(this.opt.tstart, this.i)
    if (this.opt.tmove) tmove(this.opt.tmove, this.i)
    if (this.opt.tend) tend(this.opt.tend, this.i)
    if (this.opt.click) click(this.opt.click, this.i)
  },
  info: function () {
    debugo(this.opt)
  },
  _event: function (e: string, fn: Function) {
    eventHandler(e)(fn, this.i)
  }
}



module.exports = {
  px,
  getInt,
  amMraid,
  isIos,
  isLandscape,
  formatPortrait,
  computeSize,
  select,
  selectClass,
  selectTag,
  S,
  create,
  setElem,
  appendToDom,
  innerTxt,
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
  eventHandler,
  tstart,
  tmove,
  tend,
  click,
  debugo,
  CreateElem
}