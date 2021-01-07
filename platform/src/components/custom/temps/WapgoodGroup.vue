<template>
  <div>
    <div v-if="dataLists.length>0"
         :class="config.list_num==6?'over_flow':''"
         :style="{margin: config.mT+'px'+' '+config.mL+'px',padding: '8px',borderRadius: config.tR+'px'+' '+config.tR+'px'+' '+config.bR+'px'+' '+config.bR+'px'+' ',background: '#fff'}"
    >
      <ul class="nav-ul" :style="{ 'padding-left':padg+'px',
        'padding-right':padg+'px','margin-left':-(mage/2)+'px','margin-right':-(mage/2)+'px',borderRadius: config.tR+'px'+' '+config.tR+'px'+' '+config.bR+'px'+' '+config.bR+'px'+' '}">
        <li :style="{'borderRadius':config.r+'px'}" :key="index" v-for="(item,index) in dataLists" :class="config.list_num==1?'shop_one':config.list_num==2?'shop_two':config.list_num==3?'shop_three':'shop_six'">
         <a :class="config.btom==1?'white_back':config.btom==2?'shdow_back':config.btom==3?'border_back':'inherit_back'" :style="orr_style">
            <div class="img-box" v-if="item.goods_image">
             <img :src="item.goods_image" alt="">
            </div>
          <div class="img-box" v-if="!item.goods_image">
            <div class="img-box-back">
            </div>
          </div>
          <div class="img_title line2" :data-line="config.list_num==6?'1':'2'">{{item.goods_name}}</div>
          <div class="fxBox1">
             <span  class="img_price">
                ￥{{item.goods_price}}
             </span>
            <span class="del-text col-666">
               ￥{{item.goods_marketprice}}
            </span>
          </div>
         </a>
        </li>
      </ul>
    </div>
    <div v-else class="img_null">
      <p class="fs16">点击添加商品</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     padg:0,
     mage:0,
     orr_style:{//奇数列样式
      'padding-left':'0px',
      'padding-right':'0px'
     },
    };
  },
  props: {
    dataLists:{
      type:Array,
      default:[]
    },
    config: Object,
  },
  methods: {},
  mounted() {

  },
  watch:{
    config(val){
       console.log('222',val);
       this.padg=val.pad;
       this.mage=val.mag;
       if(val.redius==1){
         console.log('圆角');
           this.orr_style={
          'margin':val.mag/2+'px',
          'border-radius':5+'px'
        }
       }else{
         this.orr_style={
          'margin':val.mag/2+'px'
        }
       }

    },
    dataLists(val){
    }

  }

};
</script>

<style lang="less" scoped>
.title_ul{
    margin: 0;
    padding: 0;
    height: auto;
    overflow: auto;
    width: 100%;
    li{
    list-style:none;
    float:left ;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height:auto;
    overflow: hidden;
    text-align: center;
    padding: 10px 0;
    }
    .active_li{
        border-bottom:3px solid red;
    }
  }
  .default_ul{
       margin: 0;
    padding: 0;
    height: auto;
    overflow: auto;
    width: 100%;
    li{
    width: 20%;
    list-style:none;
    float:left ;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height:auto;
    overflow: hidden;
    text-align: center;
    padding: 10px 0;
    }
    .active_li{
        border-bottom:3px solid red;
    }
  }
  .nav-ul{
    margin: 0;
    padding: 0;
    height: auto;
    overflow: auto;
  }
  .nav-ul li{
    list-style:none;
    float:left ;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height:auto;
    overflow: hidden;
  }
 .nav-ul li a{
   display: block;
    position: relative;
    min-height: 50px;
    color: #333;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
 }
 .white_back{

 }
 .shdow_back{
       box-shadow: 0 2px 8px rgba(93,113,127,.08);
 }
 .border_back{
       border: 1px solid rgba(50,50,51,.1);
 }
 .inherit_back{
       background-color: inherit;
 }
 .nav-ul li a i{
   color: #38f;
 }
.shop_one{
    width: 100%;
  .img-box{
    width :100%;
    height:250px;
    background-color: #ebf8fd;
    i{
      width:100%;
      height:100%;
      position:relative;
      font-size:80px;
      svg{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%)
      }
    }
    img{
      width: 100%;
    height: 100%;
    }
    .img-box-back{
        background-image: url(../../../assets/img_0.png);
        background-size: cover;
        background-position: 50%;
        width: 100%;
        height: 100%;
}
  }
  .img_title{
    font-size:14px;
    padding:5px 8px;
  }
  .img_description{
     text-align:center;
    line-height:20px;
    font-size:12px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .img_price{
     margin-left:5px;
     color:#128D80;
     font-size:14px;
  }

}
  .shop_two:nth-child(2n){
    margin-left:2%;
  }
  .shop_two{
    width:49%;
    height:auto;
    margin-bottom:10px;
  .img-box{
    width:100%;
    height:140px;
    background-color: #ebf8fd;
    i{
      width:100%;
      height:100%;
      position:relative;
      font-size:50px;
      svg{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
      }
    }
    img{
      width: 100%;
    height: 100%;
    }
    .img-box-back{
        background-image: url(../../../assets/img_0.png);
        background-size: cover;
        background-position: 50%;
        width: 100%;
        height: 100%;
}
  }
  .img_title{
    font-size:12px;
    padding:5px 8px;
  }
  .img_description{
     text-align:center;
    line-height:20px;
    font-size:12px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .img_price{
    float:left ;
    margin-left:5px;
    color:#128D80;
    font-size:12px;
  }
  .img_cart{
     float:right ;
     margin-right:5px;
     i{
       font-size:20px;
       color:red;
     }
  }
  }
.shop_three:not(:nth-child(3n)){
  margin-right:2%;
}
.shop_three,.shop_six{
    width:32%;
    height:auto;
    margin-bottom:10px;
  .img-box{
    width:100%;
    height:100px;
    background-color: #ebf8fd;
    i{
      width:100%;
      height:100%;
      position:relative;
      font-size:50px;
      svg{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
      }
    }
    img{
      width: 100%;
      height: 100%;
    }
    .img-box-back{
        background-image: url(../../../assets/img_0.png);
        background-size: cover;
        background-position: 50%;
        width: 100%;
        height: 100%;
}
  }
  .img_title{
    font-size:12px;
    padding:5px 8px;
  }
  .img_description{
     text-align:center;
    line-height:20px;
    font-size:12px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .img_price{
    float:left ;
    margin-left:5px;
    color:#128D80;
    font-size:12px;
  }
  .img_cart{
     float:right ;
     margin-right:5px;
     i{
       font-size:20px;
       color:red;
     }
  }
}
.over_flow{
  overflow-x: scroll; overflow-y: auto;
   ul{
     width: 200%;
     li{
       width: 16.6667%
     }
   }
}
</style>
