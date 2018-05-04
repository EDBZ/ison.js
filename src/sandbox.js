import * as I from './ison'

const test = new I.CreateElem({
  name:'test',
  tag:'div',
  index :2,
  height: 100,
  bkgColor: 'yellow',
  append: I.S('#container'),
  style: {
    border: '5px solid red'
  },
  click: ()=>{console.log('yoyo')}
})
test.info()
I.eventHandler('click')(()=>{console.log('pouet')}, test.i)
 test._event()
 const foo = new I.CreateElem({
   name:'foo',
   tag:'div',
   height: 100,
   bkgColor: 'red',
   append: I.S('#container'),
   style: {
     border: '5px solid yellow'
    }
  })
console.log('I.amMraid(): ', I.amMraid());