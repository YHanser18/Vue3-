export const steps = (i18n) => [
  {
    element: '#guide', // 绑定元素
    popover: {
      title: i18n('driver.guideBtn'),
      description: 'hello world',
      position: 'left' // 出现的方向
    }
  },
  {
    element: '#hamburger',
    popover: { title: i18n('driver.hamburgerBtn'), position: 'bottom' }
  },
  {
    element: '#screenFull',
    popover: { title: i18n('driver.fullScreen'), position: 'left' }
  },
  {
    element: '#language',
    popover: { title: i18n('driver.language'), position: 'left' }
  }
]
