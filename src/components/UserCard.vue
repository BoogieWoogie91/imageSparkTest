<template>
  <div class='userInsides'>
    <div class='ava'>
      <img :src= user.avatar_url alt="">
    </div>
    <div class='id'>
      {{user.id}}
    </div>

    <div class='login'>
      {{user.login}}
    </div>

    <div class='reposCount'>
      {{user.reposCount}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      required: false,
    },
  },
  methods: {
  },
};
</script>

<style scoped>
  .userInsides {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 5px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    margin: 10px 0;
    cursor: pointer;
  }

  .id {
    max-width: 100px;
    width: 100%;
    text-align: left;
  }

  .login {
    max-width: 400px;
    width: 100%;
    text-align: left;
  }

  .ava {
    max-width: 30px;
    max-height: 30px;
    width: 100%;
  }

  .ava img {
    width: 100%;
  }

</style>
