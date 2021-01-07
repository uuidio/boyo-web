import areaData from "./chinaArea.json";
function filterArea (num){
  let lists = []
  let province = areaData["86"]
  for(let key in province){
    const obj = {
      key:key,
      title:province[key]
    }
    if(num>1){
      obj.children=[]
    }
    lists.push(obj)
  }
  if(num>1){
    for(let i = 0;i<lists.length;i++){
      let allCity = areaData[lists[i].key]
      for(let key in allCity){
        let obj = {
          key:key,
          title:allCity[key]
        }
        if(num>2){
          obj.children = []
        }
        lists[i].children.push(obj)
        if(num>2){
          for(let j=0;j<lists[i].children.length;j++){
            const city = lists[i].children[j]
            let allDistrict = areaData[city.key]
            for(let key in allDistrict){
              let obj = {
                key:key,
                title:allDistrict[key]
              }
              // if(num>3){
              //   obj.children = []
              // }
              city.children.push(obj)
              // if(num>3){
              //   for(let o = 0;o<city.children.length;o++){
              //     let street = city.children[o]
              //     let allStreet = areaData[street.key]
              //     for(let key in allStreet){
              //       street.children.push({
              //         key:key,
              //         title:allStreet[key]
              //       })
              //     }
              //   }
              // }
            }
          }
        }
      }
    }
  }
  return lists
}
export {filterArea}
