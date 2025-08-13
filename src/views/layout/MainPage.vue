<template>
    <div class="MainPage-container">
        <div class="content-panel">
            <div class="content">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "MainPage",
  components: {

  },
  data() {
    return {
    }
  },
  created() {},
  mounted() {
  },
  computed: {
  },
  watch: {
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.MainPage-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.player {
  width: 100%;
  // width: 2560px;
  height: 100%;
  position: absolute;
  // left: 2464px;
}
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 202px;
}
.content-panel {
  position: unset;
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  //height: calc(100% - 40px);
  height: 100%;
}


</style>
