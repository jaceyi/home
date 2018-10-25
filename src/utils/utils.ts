interface checkRequiredParams {
  (fields: any, params: string[], res: any, callback: any): void
}

export const checkRequiredParams: checkRequiredParams = function(fields, params, res, callback) {
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
};

interface sendServerErrorInfo {
  (res: any, err: object, msg?: string): void
}
export const sendServerErrorInfo: sendServerErrorInfo = function(res, err, msg) {
  res.status(500).json({
    msg: msg || '服务器错误！',
    err
  })
};
