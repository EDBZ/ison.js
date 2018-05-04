import * as I from './ison'

I.computeSize().then(r => build())

const build = () => {
  const size = window.creativeSize
  console.log('size: ', size);
  const test = new I.CreateElem({
    name: 'test',
    tag: 'div',
    index: 2,
    height:size.h,
    width: '100',
    bkgColor: 'yellow',
    append: I.S('#container'),
    click: () => { console.log('yoyo') }
  })
  test.info()
}
