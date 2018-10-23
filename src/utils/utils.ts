export function checkRequiredParams(fields, params: string[], res, callback): void {
  // 检查需求字段，不满足做出响应
  let notParams: string[] = [];
  params.forEach(item => {
    if (!Object.keys(fields).includes(item)) {
      notParams.push(item)
    }
  });
  if (notParams.length) {
    let msg: string = `缺少[${notParams.join(',')}]字段`;
    res.status(400).json({
      msg
    })
  } else {
    callback && callback()
  }
}
