<template>
  <div>
    <div class="container flex">
      <SideNav class="side"></SideNav>
      <div class="main">
        <div class="wrap-s">
          <p class="ttl m-15"></p>
          
        </div>
          <!-- <Message :post="post" ></Message> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      post: [],
    }
  },
  methods: {
    async fetchPost() {
      console.log(this.$route.query.id)
      const resData = await this.$axios.get(`/api/post/${this.$route.params.id}`);
      this.post = resData.data.data
      console.log(this.post)
    }
  },
  async created() {
    await this.fetchPost()
  }
}

</script>