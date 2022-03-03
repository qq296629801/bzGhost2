<template>
  <div>
    <viewer :images="images">
      <img class="img" v-for="src in images" :key="src" :src="src" />
    </viewer>
  </div>
</template>
<script>
export default {
  name: "imgView",
  components: {},
  props: ["images"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.img {
  width: 100px;
  height: auto;
}
</style>
