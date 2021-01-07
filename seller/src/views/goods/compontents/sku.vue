<template>
  <div>
    <a-form-item
      label="选择商品规格"
      :label-col="{ md: 3, xs: 24 }"
      :wrapper-col="{ md: 18, xs: 24 }"
    >
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item
            @click="addSpecList(item)"
            v-for="item in skuItem"
            :key="item.id"
          >{{ item.sp_name }}</a-menu-item
          >
        </a-menu>
        <a-button>
          添加规格
          <a-icon type="plus" />
        </a-button>
      </a-dropdown>
    </a-form-item>
    <a-form-item
      :label="item.name"
      :required="true"
      :label-col="{ md: 3, xs: 24 }"
      :wrapper-col="{ md: 18, xs: 24 }"
      v-for="(item, index) in specList"
      :key="index"
    >
      <div class="specBox">
        <div style="display: flex;align-items: center;flex-wrap: wrap">
          <!--<a-tag @close="delSpecTag(index,num)" :key="num" closable v-for="(tag,num) in item.value">-->
          <!--{{tag}}-->
          <!--</a-tag>-->
          <div
            class="attrItem"
            :key="num"
            closable
            v-for="(tag, num) in item.value"
          >
            <span>{{ tag }}</span
            ><a-icon
            @click="delSpecTag(index, num)"
            class="attr-close"
            type="close"
          />
          </div>
        </div>
        <div>
          <a-input style="width:100px" v-model="addValues[index]" />
          <a-button type="primary" @click="addSpecTag(index)">确认</a-button>
          <a-popconfirm
            :title="'确认删除全部' + item.name + '规格'"
            @confirm="delSpecItem(index)"
            okText="确认"
            cancelText="取消"
          >
            <a-button type="danger">删除{{ item.name }}规格</a-button>
          </a-popconfirm>
        </div>
      </div>
    </a-form-item>
    <a-form-item
      label="库存配置"
      :label-col="{ md: 3, xs: 24 }"
      :wrapper-col="{ md: 20, xs: 24 }"
      :required="true"
      v-if="childProductArray.length"
    >
      <!--<a-table :scroll="{x:1100,y:700}" :columns="columns" :dataSource="data"></a-table>-->
      <table class="stock-table">
        <thead>
        <tr>
          <th v-for="(item, index) in specList" :key="index">
            {{ item.name }}
          </th>
          <th><span class="col-red">*</span>销售价</th>
          <th>成本价</th>
          <th><span class="col-red">*</span>市场价</th>
          <th><span class="col-red">*</span>库存</th>
          <!-- <th>预警库存</th> -->
          <th>货号</th>
          <th>条形码</th>
        </tr>
        </thead>
        <tbody>
        <tr
          :key="childProductArray[index].id"
          v-for="(item, index) in countSum(0)"
        >
          <td
            v-for="(n, specIndex) in specList.length"
            :key="n"
            v-if="showTd(specIndex, index)"
            :rowspan="countSum(n)"
          >
            {{ getSpecAttr(specIndex, index) }}
          </td>
          <td>
            <a-input type="number" v-model="childProductArray[index].price"/>
          </td>
          <td>
            <a-input
              type="number"
              v-model="childProductArray[index].goods_cost"
            />
          </td>
          <td>
            <a-input
              type="number"
              v-model="childProductArray[index].marketprice"
            />
          </td>
          <td>
            <a-input type="number" v-model="childProductArray[index].stock" />
          </td>
          <!-- <td>
            <a-input type="number" v-model="childProductArray[index].alarm" />
          </td> -->
          <td>
            <a-input v-model="childProductArray[index].sku" />
          </td>
          <td>
            <a-input v-model="childProductArray[index].barcode" />
          </td>
        </tr>
        </tbody>
      </table>
    </a-form-item>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  function objEquals(object1, object2) {
    // For the first loop, we only check for types
    for (const propName in object1) {
      // Check for inherited methods and properties - like .equals itself
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
      // Return false if the return value is different
      if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
        return false;
        // Check instance type
      }
      if (typeof object1[propName] !== typeof object2[propName]) {
        // Different types => not equal
        return false;
      }
    }
    // Now a deeper check using other objects property names
    for (const propName in object2) {
      // We must check instances anyway, there may be a property that only exists in object2
      // I wonder, if remembering the checked values from the first loop would be faster or not
      if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
        return false;
      }
      if (typeof object1[propName] !== typeof object2[propName]) {
        return false;
      }
      // If the property is inherited, do not check any more (it must be equa if both objects inherit it)
      if (!object1.hasOwnProperty(propName)) {
        continue;
      }
      // Now the detail check and recursion
      // This returns the script back to the array comparing
      /** REQUIRES Array.equals* */
      if (
        object1[propName] instanceof Array &&
        object2[propName] instanceof Array
      ) {
        // recurse into the nested arrays
        if (objEquals(!object1[propName], object2[propName])) {
          return false;
        }
      } else if (
        object1[propName] instanceof Object &&
        object2[propName] instanceof Object
      ) {
        // recurse into another objects
        // console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
        if (objEquals(!object1[propName], object2[propName])) {
          return false;
        }
        // Normal value comparison for strings and numbers
      } else if (object1[propName] !== object2[propName]) {
        return false;
      }
    }
    // If everything passed, let's say YES
    return true;
  }

  export default {
    computed: {
      ...mapState({
        skuItem: state => state.goods.skuItem
      }),
      stockSpecArr() {
        return this.childProductArray.map(item => item.sp_value);
      }
    },
    data() {
      return {
        addValues: [],
        specList: [],
        childProductArray: [],
        stockOne: false
      };
    },
    props: {
      dataList: Object
    },
    methods: {
      ...mapActions({
        getAllSpec: "goods/getAllSpec"
      }),
      delSpecItem(index) {
        const items = this.specList[index].value;
        for (let i = items.length - 1; i >= 0; i--) {
          for (let j = this.childProductArray.length - 1; j >= 0; j--) {
            const obj = this.childProductArray[j].sp_value;
            for (let key in obj) {
              if (obj[key] === items[i]) {
                delete obj[key];
              }
            }
            if (JSON.stringify(obj) == "{}") {
              this.childProductArray.splice(j, 1);
            }
          }
        }
        this.specList.splice(index, 1);
        this.childProductArray = this.childProductArrayDelete(
          this.childProductArray
        );
        if (this.specList.length === 0) {
          this.childProductArray.shift();
        }
      },
      childProductArrayDelete(obj) {
        var uniques = [];
        var stringify = {};
        for (var i = 0; i < obj.length; i++) {
          var keys = Object.keys(obj[i].sp_value);
          keys.sort(function(a, b) {
            return Number(a) - Number(b);
          });
          var str = "";
          for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i].sp_value[keys[j]]);
          }
          if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i]);
            stringify[str] = true;
          }
        }
        app.uniques = uniques;
        return uniques;
      },
      addSpecList(item) {
        if (this.specList.length !== 0) {
          for (let i = 0; i < this.specList.length; i++) {
            if (this.specList[i].name === item.sp_name) {
              return false;
            }
          }
        }
        const obj = {
          name: item.sp_name,
          value: [],
          id: item.id
        };
        this.specList.push(obj);
      },
      clearAddValues(index) {
        this.$set(this.addValues, index, "");
      },
      addSpecTag(index) {
        let str = this.addValues[index] || "";
        if (!str.trim()) return; // 判空
        str = str.trim();
        const arr = str.split(/\s+/); // 使用空格分割成数组
        let newArr = this.specList[index].value.concat(arr);
        newArr = Array.from(new Set(newArr)); // 去重
        this.$set(this.specList[index], "value", newArr);
        this.clearAddValues(index);
        this.handleSpecChange("add", index);
      },
      handleSpecChange(option, lvIndex) {
        // this.childProductArray.map((item, i) => {
        //   if (!item.stock) {
        //     this.childProductArray.splice(i, 1);
        //   }
        // });
        const stockCopy = JSON.parse(JSON.stringify(this.childProductArray));
        if (option === "del") {
          this.childProductArray = [];
        }
        for (let i = 0; i < this.countSum(0); i++) {
          let sp_value = this.getChildProductSpec(i);
          this.changeStock(option, i, stockCopy, lvIndex, sp_value);
        }
      },
      delSpecTag(index, num) {
        this.specList[index].value.splice(num, 1);
        this.handleSpecChange("del");
        // 规格最后一项被删除 删除整个规格
        if (!this.specList[index].value.length) {
          this.delSpecItem(index);
        }
      },
      changeStock(option, index, stockCopy, lvIndex, sp_value) {
        const childProduct = {
          marketprice: "", // 市场价
          goods_cost: "", // 成本价
          sp_value: sp_value,
          price: "", // 销售价
          stock: "", // 库存
          // alarm: "", // 预警库存
          sku: "", // 货号
          barcode: "" // 条形码
        };
        const spec = sp_value;
        if (option === "add") {
          // 如果此id不存在，说明为新增属性，则向 childProductArray 中添加一条数据
          if (this.stockSpecArr.findIndex(item => objEquals(spec, item)) === -1) {
            this.$set(this.childProductArray, index, childProduct);
          }
        } else if (option === "del") {
          // 因为是删除操作，理论上所有数据都能从stockCopy中获取到
          let origin = "";
          stockCopy.forEach(item => {
            if (objEquals(spec, item.sp_value)) {
              origin = item;
              return false;
            }
          });
          this.childProductArray.push(origin || childProduct);
        }
      },
      // 获取childProductArray的childProductSpec属性
      getChildProductSpec(index) {
        const obj = {};
        this.specList.forEach((item, specIndex) => {
          obj[specIndex] = this.getSpecAttr(specIndex, index);
        });
        return obj;
      },
      getSpecAttr(specIndex, index) {
        // 获取当前规格项目下的属性值
        const currentValues = this.specList[specIndex].value;
        let indexCopy;

        // 判断是否是最后一个规格项目
        if (
          this.specList[specIndex + 1] &&
          this.specList[specIndex + 1].value.length
        ) {
          indexCopy = index / this.countSum(specIndex + 1);
        } else {
          indexCopy = index;
        }

        const i = Math.floor(indexCopy % currentValues.length);

        if (i.toString() !== "NaN") {
          return currentValues[i];
        }
        return "";
      },

      /*
                 计算属性的乘积
                 @params
                   specIndex 规格项目在 advancedSpecification 中的序号
               */
      countSum(specIndex) {
        let num = 1;
        this.specList.forEach((item, index) => {
          if (index >= specIndex && item.value.length) {
            num *= item.value.length;
          }
        });
        return num;
      },
      // 根据传入的条件，来判断是否显示该td
      showTd(specIndex, index) {
        // 如果当前项目下没有属性，则不显示
        if (!this.specList[specIndex]) {
          return false;

          // 自己悟一下吧
        }
        if (index % this.countSum(specIndex + 1) === 0) {
          return true;
        }
        return false;
      },
      initSkuDetail(newName) {
        if (newName.sku !== undefined) {
          for (let i = 0; i < newName.spec_name.length; i++) {
            this.specList.push({
              name: newName.spec_name[i],
              value: []
            });
          }
          for (let o = 0; o < this.skuItem.length; o++) {
            if (this.specList[o] !== undefined) {
              if (this.specList[o].name === this.skuItem[o].sp_name) {
                this.specList[o].id = this.skuItem[o].id;
              }
            }
          }
          for (let i = 0; i < newName.spec_value.length; i++) {
            for (let j = 0; j < newName.spec_value[i].length; j++) {
              this.specList[i].value.push(newName.spec_value[i][j]);
            }
          }
          // 删除空规格
          for (let i = 0; i < newName.sku.length; i++) {
            for (let j = 0; j < newName.sku[i].sp_value.length; j++) {
              if (!newName.sku[i].sp_value[j]) {
                newName.sku[i].sp_value.splice(j, 1);
              }
            }
          }
          this.childProductArray = newName.sku;
          const lists = {
            spList: this.specList,
            data: this.childProductArray
          };
          this.$emit("skuVal", lists);
        }
      }
    },
    mounted() {
      this.getAllSpec();
    },
    watch: {
      dataList(newName) {
        this.initSkuDetail(newName);
      },
      specList: {
        handler(newName, oldName) {
          this.childProductArray.map((item, index) => {
            for (let val in item.sp_value) {
              // 如果是空值 就删除
              if (!item.sp_value[val]) {
                delete item.sp_value[val];
              }
            }
          });
          const lists = {
            spList: newName,
            data: this.childProductArray
          };
          this.$emit("skuVal", lists);
        },
        deep: true
      },
      childProductArray: {
        handler(newName, oldName) {
          const lists = {
            spList: this.specList,
            data: newName
          };
          this.$emit("skuVal", lists);
        },
        deep: true
      }
    }
  };
</script>

<style scoped lang="stylus">
  .attrItem {
    background #fafafa
    border 1px solid #d9d9d9
    border-radius 4px
    margin-right 8px
    padding 0 7px
    font-size 12px
    box-sizing border-box
    height 25px
    line-height 25px
    display flex
    align-items center
    >>>.attr-close {
      font-size 14px
      cursor pointer
      margin-left 5px
    }
  }
  .specBox {
    display flex
    flex-wrap wrap
    align-items center
    >>> .ant-btn-primary {
      margin 0 10px
    }
  }
  >>> .sepcInp {
    width 100px
    margin-right 10px
  }
  .stock-table {
    width 100%
    padding 0
    border-collapse separate
    border-color #dfe6ec
    border-style solid
    border-width 1px 0 0 1px
    background-color #fff
    th {
      background-color #eef1f6
    }
    td, th {
      padding 4px 10px
      border-bottom 1px solid #dfe6ec
      border-right 1px solid #dfe6ec
    }
  }
</style>
