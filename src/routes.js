import AboutPage from './pages/About.vue'
// /
import IconsRef from './data/icon.js'
import { SysConfig } from './data/sys-config.js'
// /GIF2APNG
import WelcomePage from './pages/GIF2APNG/Welcome.vue'
import DiscoverPage from './pages/GIF2APNG/Find/Discover.vue'
import ConvertPage from './pages/GIF2APNG/Convert.vue'
///
import Recommendation from './pages/GIF2APNG/Find/recommendation.vue'
import Classification from './pages/GIF2APNG/Find/classification.vue'
import Material from './pages/GIF2APNG/Find/material.vue'
import TopRank from './pages/GIF2APNG/Find/topRank.vue'

// Config SystemConfig
const icons = IconsRef.iconSet
const rootPath = '/' + SysConfig.appName

// Config menu
const menu = [{
    title: 'routes.common.title',
    isExpand: true,
    enableExpand: false,
    visible: true,
    menu: [{
      path: '',
      redirect: rootPath + '/welcome',
      show: false
    }, {
      path: rootPath + '/welcome',
      show: true,
      component: WelcomePage,
      title: 'routes.common.menu.welcome.title',
      tip: 'routes.common.menu.welcome.tip',
      tipAsSubTitle: true,
      icon: icons.adjust,
      sourceUrl: ''
    }, {
      path: rootPath + '/Find',
      show: true,
      component: DiscoverPage,
      title: 'routes.common.menu.discover.title',
      tip: 'routes.common.menu.discover.tip',
      tipAsSubTitle: true,
      icon: icons.adjust,
      sourceUrl: '',
      redirect:rootPath + '/Find/recommendation',
      children:[
          {
            path: 'recommendation',
            component: Recommendation
          },
          {
            path: 'classification',
            component: Classification
          },
          {
            path: 'material',
            component: Material
          },
          {
            path: 'topRank',
            component: TopRank
          }
      ]
    },{
      path: rootPath + '/convert',
      show: true,
      component: ConvertPage,
      title: 'routes.common.menu.convert.title',
      tip: 'routes.common.menu.convert.tip',
      tipAsSubTitle: true,
      icon: icons.adjust,
      sourceUrl: ''
    }]
  },
  {
    title: 'routes.set.title',
    isExpand: true,
    enableExpand: false,
    visible: true,
    menu: [{
      path: '/about',
      show: true,
      component: AboutPage,
      title: 'routes.set.menu.about.title',
      tip: 'routes.set.menu.about.tip',
      tipAsSubTitle: true,
      icon: icons.discover,
      sourceUrl: ''
    }]
  },
  {
    title: '我的应用',
    isExpand: true,
    enableExpand: false,
    visible: false,
    menu: [{
      path: '/MyTool/local',
      show: true,
      component: AboutPage,
      title: '本地应用',
      tip: '',
      icon: icons.discover,
      sourceUrl: ''
    }, {
      path: '/MyTool/download',
      show: true,
      component: AboutPage,
      title: '下载管理',
      tip: '',
      icon: icons.discover,
      sourceUrl: ''
    }, {
      path: '/MyTool/cloud',
      show: false,
      component: AboutPage,
      title: '我的应用云盘',
      tip: '',
      icon: icons.discover,
      sourceUrl: ''
    }, {
      path: '/MyTool/author',
      show: true,
      component: AboutPage,
      title: '我关注的应用开发者',
      tip: '',
      icon: icons.discover,
      sourceUrl: ''
    }]
  },
  {
    title: '创建的应用清单',
    isExpand: false,
    enableExpand: true,
    visible: false,
    menu: []
  },
  {
    title: '收藏的应用清单',
    isExpand: false,
    enableExpand: true,
    visible: false,
    menu: [{
      path: '/ui-about',
      component: AboutPage,
      title: 'About',
      tip: '',
      icon: icons.discover,
      sourceUrl: ''
    }]
  }
]

// Generate a Vue Router compatible routes map from the menu
const routes = menu.reduce((paths, section) => {
  const sectionPaths = section.menu.map(menuItem => {
    var _children = []
    if(menuItem.children) {
      menuItem.children.map(childItem => {
        _children.push({
          path: childItem.path,
          component: childItem.component,
          parentPath:menuItem.path,
          meta: {
            section: section.title,
            title: menuItem.title
          }
        })
      })
    }
    return {
      path: menuItem.path,
      redirect: menuItem.redirect || '',
      component: menuItem.component,
      children: _children,
      meta: {
        section: section.title,
        title: menuItem.title,
        tip: menuItem.tip,
        tipAsSubTitle: menuItem.tipAsSubTitle || false,
        icon: menuItem.icon,
        show: menuItem.show,
        sourceUrl: menuItem.sourceUrl
      }
    }
  })
  return paths.concat(sectionPaths)
}, [])

// export
export default {
  SysConfig,
  icons,
  menu,
  routes
}
