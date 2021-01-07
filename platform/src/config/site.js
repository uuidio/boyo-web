export const shopType = [
  { value: 'goods', label: '商品' },
  { value: 'shop', label: '店铺' },
  { value: 'class', label: '分类' },
  // { value: 'url', label: '链接地址' },
];

export const imageSiteConfigField = [
  {
    title: '图片',
    dataIndex: 'image_url',
    key: 'image_url',
    scopedSlots: { customRender: 'image_url' },
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '展示数据类型',
    dataIndex: 'show_type',
    key: 'show_type',
  },
  {
    title: '展示数据内容',
    dataIndex: 'value',
    key: 'value',
  },
];

export const listsSiteConfigField = [
  {
    title: '图片',
    dataIndex: 'image_url',
    scopedSlots: { customRender: 'image_url' },
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '展示数据类型',
    dataIndex: 'show_type',
  },
  {
    title: '展示数据内容',
    dataIndex: 'value',
  },
];
export const recommendSiteConfigField = [
	{
	  title: '标题',
	  dataIndex: 'title',
	},
	{
	  title: '展示数据类型',
	  dataIndex: 'show_type',
	},
	{
	  title: '展示数据内容',
	  dataIndex: 'value',
	},
  ];
export const goodsSwiperHead = [
  {
    title: 'banner图片',
    dataIndex: 'image_url',
    scopedSlots: { customRender: 'image_url' },
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '展示数据类型',
    dataIndex: 'show_type',
  },
  {
    title: '商品展示数量',
    dataIndex: 'value',
    scopedSlots: { customRender: 'value' },
  },
];
export const hotGoodsField = [{
  title: '商品图片',
  dataIndex: 'goods_image',
  scopedSlots: { customRender: 'goods_image' },
},
  {
    title: '商品名称',
    dataIndex: 'goods_name',
  },
  {
    title: '商品价格',
    dataIndex: 'goods_price',
  },
  // {
  //   title: '商品分类',
  //   dataIndex: 'class_name',
  // },
  // {
  //   title: '商品店铺',
  //   dataIndex: 'shop_name',
  // }
]
export const recommendFoodsField=[
	{
		title: '标题',
		dataIndex: 'title',
		key: 'title',
	  },
	  {
		title: '数量',
		dataIndex: 'count',
		key: 'count',
	  }
]
