import DataManagement from '../components/DataManagement/DataManagement';
import FileManagement from '../components/FileManagement/FileManagement';

export default [
  {
    path: '/',
    name: '资料管理',
    component: DataManagement
  },
  {
    title: 'Blog管理',
    children: [
      {
        path: '/ArticleManagement',
        name: '文章管理',
        component: null
      },
      {
        path: '/MessageManagement',
        name: '留言管理',
        component: null
      }
    ]
  },
  {
    title: '静态资源',
    children: [
      {
        path: '/PageManagement',
        name: '页面管理',
        component: null
      },
      {
        path: '/FileManagement',
        name: '文件管理',
        component: FileManagement
      }
    ]
  },
  {
    path: '/APIManagement',
    name: 'API管理',
    component: null
  }
]
