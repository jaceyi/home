export default function CreateLine () {
  this.ele = document.createElement('canvas')
}

CreateLine.prototype = {
  init: function (o) {
    this.parent = o.parent
    this.canvas = {
      ele: this.ele,
      canText: this.ele.getContext('2d'),
      points: [],
      config: {
        pointSpeed: 2, // 点移动速度
        pointSize: 1.8, // 点大小
        pointNum: o.pointNum, // 点数量
        pointColor: o.pointColor || '255,255,255', // 点颜色
        lineColor: o.lineColor || '255,255,255', // 线条颜色
        pointDist: o.pointDist, // 两个点距离多远可以连线
        lineMax: o.lineMax, // 一个点的最多连线
        isMouse: o.isMouse || false // 是否捕捉鼠标位置
      }
    }
    this.initSize().move().timer()
  },
  initSize: function () {
    const parent = this.parent
    this.ele.width = parent.offsetWidth
    this.ele.height = parent.offsetHeight
    parent.appendChild(this.ele)
    return this
  },
  move: function () {
    this.parent.addEventListener('mousemove', (e) => {
      const event = e || window.event
      const left = this.parent.offsetLeft
      const top = this.parent.offsetTop
      this.canvas.mouse = {
        x: event.clientX - left,
        y: event.clientY - top
      }
    })
    this.parent.addEventListener('mouseleave', () => {
      this.canvas.mouse = null
    })
    return this
  },
  timer: function () {
    setInterval(() => {
      drawingPoint(this.canvas)
    }, 30)
  }
}

function drawingPoint (o) {
  const c = o.canText
  const w = o.ele.width
  const h = o.ele.height
  const v = o.config.pointSpeed
  c.clearRect(0, 0, w, h)
  c.fillStyle = 'rgb(' + o.config.pointColor + ')'
  const pointNum = o.config.pointNum
  let point = {}
  for (let i = 0; i < pointNum; i++) {
    if (o.points.length < pointNum) {
      point = {
        x: Math.floor(Math.random() * w),
        y: Math.floor(Math.random() * h),
        xv: Math.random() * (Math.random() > 0.5 ? v : -v),
        yv: Math.random() * (Math.random() > 0.5 ? v : -v),
        line: 0
      }
    } else {
      point = movePoint(o.points[i], o.ele)
    }
    c.beginPath()
    c.arc(point.x - o.config.pointSize / 2, point.y - o.config.pointSize / 2, o.config.pointSize, 0, Math.PI * 2, true)
    c.fill()
    o.points.push(point)
  }
  line(o, c)
}

function movePoint (point, ele) {
  let p = point
  if (p.x <= 0 || p.x >= ele.width) {
    p.xv = -p.xv
  } else if (p.y <= 0 || p.y >= ele.height) {
    p.yv = -p.yv
  }
  p.x += p.xv
  p.y += p.yv
  return p
}

function line (o, c) {
  const config = o.config
  const points = o.points
  const pointNum = config.pointNum
  const mouse = o.mouse
  for (let i = 0; i < pointNum; i++) {
    let lineMax = 0
    for (let j = (i + 1); j < pointNum; j++) {
      const dist = Math.sqrt(Math.pow(Math.abs(points[i].x - points[j].x), 2) + Math.pow(Math.abs(points[i].y - points[j].y), 2))
      if (dist < config.pointDist && lineMax < config.lineMax) {
        lineMax += 1
        c.lineWidth = 1
        c.strokeStyle = 'rgba(' + o.config.lineColor + ',' + (1 - dist / config.pointDist) + ')'
        c.beginPath()
        c.moveTo(points[i].x, points[i].y)
        c.lineTo(points[j].x, points[j].y)
        c.stroke()
      }
    }
    if (config.isMouse && mouse) {
      const mouseDist = Math.sqrt(Math.pow(Math.abs(points[i].x - mouse.x), 2) + Math.pow(Math.abs(points[i].y - mouse.y), 2))
      if (mouseDist < (config.pointDist * 1.5)) {
        c.lineWidth = 1
        c.strokeStyle = 'rgba(' + o.config.lineColor + ',' + (1 - mouseDist / (config.pointDist * 1.5)) + ')'
        c.beginPath()
        c.moveTo(points[i].x, points[i].y)
        c.lineTo(mouse.x, mouse.y)
        c.stroke()
      }
    }
  }
}
