<template>
    <div class="word">
    <Collapse simple v-for="(item,index) in wordList" :key="index">
        <Panel name="1">
            {{item.title}}
            <p slot="content" @click="insertWord(item.word)">{{item.word}}</p>
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
      wordList:[]
    };
  },
  methods: {
    insertWord: function(item) {
      this.$emit('insertWord', item);
    }
  },
  mounted(){
    this.$socket.listWord((res)=>{
          console.log(res.response.data,'---');
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