import * as I from './ison'

const build = () => {
  const size = window.creativeSize
  console.log('size: ', size);
  const test = new I.CreateElem({
    name: 'test',
    tag: 'div',
    index: 2,
    height:size.h,
    width: size.w,
    bkgColor: 'green',
    append: 'body',
    click: () => { console.log('yoyo') }
  })
  test.info()
}

I.createNewCreative('test', build)

