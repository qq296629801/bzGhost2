<template>
  <div>
    <div>
      <p class="text-center">
        <img width="100" height="100" :src="[webUrl + user.imgUrl]" class="img" />
      </p>
      <p class="user-model-item">
        <label>姓名：</label>
        <span>{{ user.chatName }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import base from "@/utils/baseUrl.js";
export default {
  name: "userModal",
  props: ["user"],
  data() {
    return {
      webUrl:base.webUrl
    };
  },
  watch: {

  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style scoped>
.img{
  width: 100px;
  height: 100px;
}
</style>
