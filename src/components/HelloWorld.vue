<template>
  <div class="hello">
    <input class='searchInput' type="search" v-on:keyup.enter="searchInitiation">
    <button @click="searchInitiation">search</button>
    <button @click="sort">sorter</button>
    <div class='cardContainer'>
      <UserCard v-for="(user, key) in users" :key="key"
      :user = "user"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import UserCard from './UserCard.vue';

export default {
  name: 'HelloWorld',
  components: {
    UserCard,
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters('users', ['users', 'sortType']),
  },
  methods: {
    ...mapActions('users', ['searchUser', 'sortUsers']),
    searchInitiation() {
      const searchVal = document.querySelector('.searchInput').value;
      this.searchUser(searchVal);
    },

    sort() {
      this.sortUsers();
    },
  },

  created() {
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.clientHeight;
      const appHeight = document.documentElement.scrollHeight;
      const offset = window.pageYOffset;
      if (windowHeight + offset === appHeight) {
        this.searchInitiation();
      }
    });
  },

  watch: {
  },
};
</script>

<style scoped>
  .modal {
    background: red;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 1;
  }

  .modal.hidden {
    opacity: 0;
    z-index: -1;
  }
</style>
