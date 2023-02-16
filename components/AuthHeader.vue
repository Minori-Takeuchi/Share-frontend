<template>
  <div class="header-nav">
    <img src="@/assets/img/logo.png" alt="ロゴ" class="header-logo">
    <div class="header-list">
      <nuxt-link to="/register" class="header-list-item">新規作成</nuxt-link>
      <nuxt-link to="/login" class="header-list-item">ログイン</nuxt-link>
    </div>
  </div>
  
</template>
<style>
.header-nav {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-color: black;
  }
  .header-logo {
    width: 100px;
    height: 35px;
    margin: 10px ;
  }
  .header-list {
    display: flex;
    width: 20%;
    justify-content: space-around;
    align-items: center;
  }
  .header-list-item {
    text-decoration: none;
    color: white;
    font-size: small;
    display: inline-block;
    margin-right: 10px;
  }
</style>