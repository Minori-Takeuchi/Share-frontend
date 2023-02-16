<template>
  <div class="post wrap-m">
    <div class="post-item flex">
      <p class="post-user txt">{{ $store.state.user }}</p>
      <img src="~/assets/img/heart.png" alt="いいね" class="item-img">
      <p class="txt"></p>
      <img src="~/assets/img/cross.png" alt="削除" @click="deletePost" class="item-img">
      <img src="~/assets/img/detail.png" alt="コメントへ" class="item-img" @click="goPostDetail">
    </div>
    <br>
    <div class="post-content txt">{{ post.content }}</div>
  </div>
  </template>
<script>
export default {
  props: {
    post: {
      type: Object,
    },
  },
  methods: {
    async getPost() {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/post/");
      this.postList = resData.data.data
      this.posts = this.postList.filter((e) =>
        e.user_id === this.$store.state.user);
    },

    async deletePost(id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/post/" + id)
      this.getPost();
    },
    goPostDetail() {
      this.$router.push({ path: `/posts/${this.id}` });
    },

  },
  async created() {
    await this.getPost()
  },
}
</script>
<style>
.post {
  width: 100%;
  height: 100px;
}
.wrap-m {
  width: 100%;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
}
.post-item {
  padding-top: 15px;
}
.post-content {
  display: inline;
  padding-bottom: 20px;
}
.post-item .item-img:last-child {
  margin-left: 50px;
}
</style>