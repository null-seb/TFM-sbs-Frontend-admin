import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/college',
    component: Layout,
    redirect: '/college/list',
    name: 'College',
    meta: { title: 'College Management' },
    children: [
      {
        path: 'list',
        name: 'CollegeList',
        component: () => import('@/views/college/list'),
        meta: { title: 'College list' }
      },
      {
        path: 'create',
        name: 'CollegeCreate',
        component: () => import('@/views/college/form'),
        meta: { title: 'Create college' }
      },
      {
        path: 'edit/:id',
        name: 'CollegeEdit',
        component: () => import('@/views/college/form'),
        meta: { title: 'Edit college' },
        hidden: true
      }
    ]
  },
  // 课程分类管理
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: 'Subject',
    meta: { title: 'Subject Category' },
    children: [
      {
        path: 'list',
        name: 'SubjectList',
        component: () => import('@/views/subject/list'),
        meta: { title: 'Subject Category List' }
      },
      {
        path: 'import',
        name: 'SubjectImport',
        component: () => import('@/views/subject/import'),
        meta: { title: 'Import Subject Category' }
      }
    ]
  },
  // 课程管理
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Course',
    meta: { title: 'Course' },
    children: [
      {
        path: 'list',
        name: 'CourseList',
        component: () => import('@/views/course/list'),
        meta: { title: 'Course List' }
      },
      {
        path: 'info',
        name: 'CourseInfo',
        component: () => import('@/views/course/form'),
        meta: { title: 'Publish Course' }
      },
      {
        path: 'info/:id',
        name: 'CourseInfoEdit',
        component: () => import('@/views/course/form'),
        meta: { title: 'Edit Course' },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'CourseChapterEdit',
        component: () => import('@/views/course/form'),
        meta: { title: '编辑大纲' },
        hidden: true
      }
    ]
  },
  // 内容管理
  {
    path: '/ad',
    component: Layout,
    redirect: '/ad/list',
    name: 'Ad',
    meta: { title: 'Content Management' },
    children: [
      {
        path: 'list',
        name: 'AdList',
        component: () => import('@/views/ad/list'),
        meta: { title: 'Ad Recommendation' }
      },
      {
        path: 'create',
        name: 'AdCreate',
        component: () => import('@/views/ad/form'),
        meta: { title: 'Create Ad' },
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'AdEdit',
        component: () => import('@/views/ad/form'),
        meta: { title: 'Edit Ad' },
        hidden: true
      },

      {
        path: 'type-list',
        name: 'AdTypeList',
        component: () => import('@/views/adType/list'),
        meta: { title: 'Recommended Position' }
      },
      {
        path: 'type-create',
        name: 'AdTypeCreate',
        component: () => import('@/views/adType/form'),
        meta: { title: 'Create AdType' },
        hidden: true
      },
      {
        path: 'type-edit/:id',
        name: 'AdTypeEdit',
        component: () => import('@/views/adType/form'),
        meta: { title: 'Edit AdType' },
        hidden: true
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/create',
    name: 'Statistics',
    meta: { title: 'Statistical Analysis' },
    children: [
      {
        path: 'create',
        name: 'StatisticsCreate',
        component: () => import('@/views/statistics/create'),
        meta: { title: 'Generate data' }
      },
      {
        path: 'chart',
        name: 'StatisticsChart',
        component: () => import('@/views/statistics/chart'),
        meta: { title: 'Statistical Graphs' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
