export const bindDomSizeEvent = function (dom, cb) {
  // 元素大小改变 触发事件
  const child = document.createElement('div')
  child.className = 'dom-size util-child'

  const shrink = document.createElement('div')
  const expand = document.createElement('div')
  shrink.className = 'dom-size util-shrink'
  expand.className = 'dom-size util-expand'

  const shrinkChild = document.createElement('div')
  const expandChild = document.createElement('div')
  shrinkChild.className = 'dom-size util-shrink-child'
  expandChild.className = 'dom-size util-expand-child'

  shrink.appendChild(shrinkChild)
  expand.appendChild(expandChild)

  child.appendChild(shrink)
  child.appendChild(expand)

  dom.appendChild(child)

  const Max = 100000

  shrink.scrollTop = Max
  shrink.scrollLeft = Max

  expand.scrollTop = Max
  expand.scrollLeft = Max

  shrink.addEventListener('scroll', () => {
    cb()
    shrink.scrollTop = expand.scrollTop = Max
    shrink.scrollLeft = expand.scrollLeft = Max
  })
  expand.addEventListener('scroll', () => {
    cb()
    shrink.scrollTop = expand.scrollTop = Max
    shrink.scrollLeft = expand.scrollLeft = Max
  })
}
