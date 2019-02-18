
export const _import = file => resolve => require([`@/views/${file}`], resolve)

export default [
    {
      path: '/',
      redirect: 'introduce'
    },
    {
      path: '/introduce',
      name: 'Introduce',
      component: _import('introduce/Introduce'),
      meta: {
        title: '大赛介绍',
        keepAlive: true
      }
    },
    {
      path: '/awards',
      name: 'Awards',
      component: _import('awards/Awards'),
      meta: {
        title: '奖项设置',
        keepAlive: true
      }
    },
    {
      path: '/enroll',
      name: 'Enroll',
      component: _import('enroll/Enroll'),
      meta: {
        title: '我要报名',
        keepAlive: false
      }
    },
    {
      path: '/vote',
      name: 'Vote',
      component: _import('vote/Vote'),
      meta: {
        title: '我要投票',
        keepAlive: false
      }
    },
    {
      path: '/vote/detail',
      name: 'VoteDetail',
      component: _import('vote/VoteDetail'),
      meta: {
        title: '我要投票',
        keepAlive: false
      }
    },
    {
      path: '*',
      component: resolve => require(['@/components/error/error-notfound'], resolve)
    }
]

