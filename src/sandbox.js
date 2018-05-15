import * as I from './ison'

const build = () => {
  const data = window.creative.data
  const size = window.creative.size
  const objVideo = {
    url: data.url,
    width: 640,
    height: 360,
    type: 'video'
  }
  // console.log('size: ', data.size);
  const test = new I.CreateElem({
    name: 'test',
    tag: 'div',
    index: 2,
    height: size.height,
    width: size.width,
    bkgColor: 'green',
    append: 'body'
    ,
    click: () => { console.log('yoyo') }
  })
  // test.info()
  const videoTest = new I.VideoOnCanvas(objVideo, test.i, size)
  videoTest.firstQuartile("https://s3-eu-west-1.amazonaws.com/static.tabmo.io/Auto/utilsFormats/fakeMacros/pixel.png")
    .midPoint("https://s3-eu-west-1.amazonaws.com/static.tabmo.io/Auto/utilsFormats/fakeMacros/pixel.png")
    .thirdQuartile("https://s3-eu-west-1.amazonaws.com/static.tabmo.io/Auto/utilsFormats/fakeMacros/pixel.png")
    .complete("https://s3-eu-west-1.amazonaws.com/static.tabmo.io/Auto/utilsFormats/fakeMacros/pixel.png")
    .clickable(0.33, "https://www.google.com")
    .play()
}
I.createNewCreative('test', build)

