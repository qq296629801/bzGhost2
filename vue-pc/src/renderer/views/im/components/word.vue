<template>
    <div class="word">
    <Collapse simple v-for="(item,index) in listItem" :key="index">
        <Panel name="1">
            {{item.title}}
            <p slot="content" @click="insertWord(item.content)">{{item.content}}</p>
        </Panel>
       
    </Collapse>
    </div>
</template>

<script>
export default {
  name: 'word',
  components: {},
  data() {
    return {
        listItem:[
            {
                title:'史蒂夫·乔布斯',
                content:'史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。'
            },
             {
                title:'斯蒂夫·盖瑞·沃兹尼亚克',
                content:'斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。'
            },
             {
                title:' 乔纳森·伊夫',
                content:'乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。'
            }
        ]
    };
  },
  methods: {
    insertWord: function(item) {
      this.$emit('insertWord', item);
    }
  }
};
</script>

<style scoped lang="scss">
.word {
  width: 30.5rem;
  list-style: none;
  background-color: #ffffff;
  border: 1px solid #f0f5ff;
  display: block;
  height: 33rem;
  overflow-x:auto;
  overflow-y:auto;
}
</style>