<template>
  <div style="height: calc(100% - 40px);">
    <div class="im-chat-main" style="height: 100%">
      <div class="messages" id="his-chat-message" style="height: 100%">
        <ul>
          <li
            v-for="(item, index) in hisMessageList"
            :key="index"
            :class="{ 'im-chat-mine': item.mine }"
          >
            <div class="im-chat-user" id="historyMessageBox">
              <img :src="[host + item.avatar]" />
              <div class="message-info right" v-if="item.mine">
                <i>{{ item.timestamp }}</i>
                <span>{{ item.username }}</span>
              </div>
              <div class="message-info" v-if="!item.mine">
                <span>{{ item.username }}</span>
                <i>{{ item.timestamp }}</i>
              </div>
            </div>
            <div class="im-chat-text" v-if="item.contentType == 0">
              <pre
                v-html="item.content"
                v-on:click="openImageProxy($event)"
              ></pre>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Page
      :total="count"
      size="small"
      show-total
      class="page"
      :page-size="pageSize"
      @on-change="getHistoryMessage"
    />
  </div>
</template>

<script>
import { transform, imageLoad } from "../../../utils/ChatUtils";
import { mapState, mapMutations } from 'vuex';
export default {
  name: "history-message",
  props: {
    showHistory: {
      type: Boolean,
      default: false
    },
    chat: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      count: 0,
      pageSize: 20,
      hisMessageList: []
    };
  },
  computed:{
		...mapState(['userData','chatObj'])
	},
  watch: {
    showHistory: function(show) {
      console.log("show", show);
      this.showHistory = show;
      if (show) {
        this.getHistoryMessage(1);
      }
    }
  },
  mounted() {},
  methods: {
    // 附件和图片点击展开
    openImageProxy: function(event) {
      let self = this;
      event.preventDefault();
      if (event.target.nodeName === "IMG") {
        self.winControl.openURL(event.target.src);
      } else if (
        event.target.className === "message-file" ||
        event.target.nodeName === "A"
      ) {
        self.winControl.openURL(event.target.href);
      }
    },
    getHistoryMessage(pageNo) {

			let httpReqData = {
				toGroupId: this.chatObj.chatId,
				userId: this.userData.user.operId,
				condition:'',
				pageNum: pageNo,
				pageSize: 10
			}
			
			this.$post('app/group/msg/list', httpReqData).then(res=>{
				let data = res.list;
				this.hisMessageList = data.concat(this.hisMessageList);
			}).catch(e=>{
			});
      
  }
  }
};
</script>

<style scoped lang="scss"></style>
