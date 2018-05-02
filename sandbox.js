import * as I from './src/ison'

const elem = new I.CreateElem({
  name:'elem',
  tag:'div',
  index :2,
  display: 'flex',
  height: 100,
  bkgColor: 'yellow',
  append: I.S('#container'),
  style: {
    border: '5px solid red'
  },
})
elem.info()
