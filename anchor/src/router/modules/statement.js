import { PageView } from '@/components/layouts';

export default {
  path: '/statement',
  redirect: '/statement/statement',
  component: PageView,
  name: 'statement',
  meta: {
    title: '报表',
    icon: 'icon-areachart',
  },
  children: [
		// {
		//   path: '/statementLists',
		//   name: 'statement',
		//   component: () => import('@/views/statement/statement'),
		//   meta: {
		//     auth: true,
		//     title: '门店运营概况',
		//   },
		// },
  ],
};
