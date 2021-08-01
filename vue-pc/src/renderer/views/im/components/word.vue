<template>
    <div class="word">
    <i-tag 
        wx:for="{{tags}}" 
        wx:key="{{index}}"
        bindchange="onChange" 
        checkable="{{true}}" 
        name="{{index}}" 
        color="{{item.color}}" 
        checked="{{item.checked}}" 
        type="border"
        style="margin-right:5px;">
        {{item.name}}
    </i-tag>
    <!-- <Collapse simple v-for="(item,index) in wordList" :key="index">
        <Panel name="1">
            {{item.title}}
            <p slot="content" @click="insertWord(item.word)">{{item.word}}</p>
        </Panel>
    </Collapse> -->
    </div>
</template>

<script>
export default {
  name: 'word',
  components: {},
  data() {
    return {
      wordList:[],
      tags : [
            {
                name : '标签一',
                checked : false,
                color : 'default'
            },
            {
                name : '标签二',
                checked : false,
                color : 'red'
            },
            {
                name : '标签三',
                checked : true,
                color : 'blue'
            },
            {
                name : '标签4️',
                checked : true,
                color : 'green'
            }
        ]
    };
  },
  methods: {
    insertWord: function(item) {
      this.$emit('insertWord', item);
    }
  },
  mounted(){
      this.$socket.listWord((res)=>{
          this.wordList = res.response.data;
      });
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