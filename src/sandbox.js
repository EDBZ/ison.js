import * as I from './ison'

const build = () => {
  const objVideo = {
    url: "https://s3-eu-west-1.amazonaws.com/static.tabmo.io/Auto/utilsFormats/fakeMacros/video.mp4",
    width: 640,
    height: 360,
    type: 'video'
  }
  const size = window.creativeSize
  console.log('size: ', size);
  const test = new I.CreateElem({
    name: 'test',
    tag: 'div',
    index: 2,
    height: size.h,
    width: size.w,
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
    // setTimeout(() => {
    //   setInterval(()=> {

    //    var test =  I.getInt(I.select('canvas').style.left)
    //    I.select('canvas').style.left = test+10+'px'
    //   },200)
    // },5000)
}
I.createNewCreative('test', build)

