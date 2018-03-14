export default function LineFlashing (fatherEle, config) {
  this.fatherEle = fatherEle
  this.config = config
}

LineFlashing.prototype = {
  init (data) {
    this.dataList = data
    this.createCanvas()
  },
  createCanvas () {
    this.ele = document.createElement('canvas')
    this.ele.className = this.config.className
    this.fatherEle.appendChild(this.ele)

    this.initSize()
    this.startPainting()
  },
  initSize () {
    this.ele.width = this.fatherEle.offsetWidth
    this.ele.height = this.fatherEle.offsetHeight
  },
  startPainting () {
    const dataList = this.dataList
    const width = this.ele.offsetWidth
    const clearanceNumber = dataList.length + 1
    const clearanceWidth = width / clearanceNumber
    for (let i = 0; i < dataList.length; i++) {
      /* eslint-disable no-new */
      new CreatePoint({
        left: clearanceWidth * (i + 1),
        name: dataList[i].name,
        value: dataList[i].value
      })
    }
  }
}

function CreatePoint (data) {
  console.log(data)
}
