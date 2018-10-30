import React from 'react';
import {Link} from 'react-router-dom';

function NotPage() {
  return (
    <div className={'not_page'}>
      <Link to={'/'}>
        <h1>404</h1>
        <p>没有找到你想要的资源，点击此处返回首页</p>
      </Link>
    </div>
  )
}

export default NotPage;
