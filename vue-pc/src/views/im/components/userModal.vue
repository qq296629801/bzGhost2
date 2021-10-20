<template>
  <div>
    <div>
      <p class="text-center">
        <img :src="[host + user.avatar]" class="img" />
      </p>
      <p class="user-model-item">
        <label>姓名：</label>
        <span>{{ user.name }}</span>
      </p>
      <p class="user-model-item">
        <label>手机：</label>
        <span>{{ user.mobile }}</span>
      </p>
      <p class="user-model-item">
        <label>邮箱：</label>
        <span>{{ user.email }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "userModal",
  props: ["userId"],
  data() {
    return {
      title: "",
      user: {}
    };
  },
  watch: {
    userId(id) {
      this.getUser(id);
    }
  },
  mounted() {
    this.getUser(this.userId);
  },
  methods: {
    getUser(id) {
      let self = this;
      let param = new FormData();
      param.set("id", id);
    }
  }
};
</script>

<style scoped></style>
