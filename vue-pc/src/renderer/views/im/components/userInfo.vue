<template>
<div class="user-info">
    <div class="user-info-top">
        <span class="user-info-con">
            <div class="user-name">{{u.realname || u.nickName}}</div>
            <div>
                <span class="count-title">积分：</span>
                <span class="count-money">{{u.money}}</span>
            </div>
        </span>
        <Avatar shape="square" size="large" :src="`${$url}/${ u.avatar || u.imgUrl }`" />
    </div>
    <Divider />
    <div class="user-info-bot">
        <i-button type="primary" shape="circle" size="large" @click="showChat">发送消息</i-button>
    </div>
</div>
</template>

<script>
export default {
    name: 'userInfo',
    props: ['u'],
    data() {
        return {
            host: '',
            user: this.$store.state.user,
        };
    },
    methods: {
        // 打开一个聊天对话框
        showChat() {
            let self = this;
            let chat = self.u;
            chat.chatName = self.u.nickName;
            chat.chatId = self.u.id;
            this.$store.commit('setChat', chat);
            console.log(chat,'-----------------')
            this.$store.commit('setChatType', 0);
            self.$router.push({
                path: '/index/chatBox',
                params: {}
            });
        },
    }

};
</script>

<style lang="scss">
.user-info {
    font-size: 16px;
    line-height: 200%;
    color: #666;

    .user-info-top {
        display: flex;
        justify-content: space-between;
        .user-name {
            color: #171717;
            font-size: 20px;
        }
        .count-title {
            font-size: 14px;
            color: #666;
        }
        .count-money {
            color: #999;
            font-size: 12px;
        }
    }
    .user-info-bot {
        text-align: center;
    }
}
</style>
