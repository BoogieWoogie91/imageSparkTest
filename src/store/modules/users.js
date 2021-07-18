import mutations from '@/store/mutations';

const {
  USERSCONCAT, USERS, QUERY, REPOURL, SORTTYPE, PAGE,
} = mutations;

const usersStore = {
  namespaced: true,
  state: {
    query: '',
    users: [],
    repoUrl: '',
    sortType: '',
    page: 1,
  },
  getters: {
    query: ({ query }) => query,
    users: ({ users }) => users,
    repoUrl: ({ repoUrl }) => repoUrl,
    sortType: ({ sortType }) => sortType,
    page: ({ page }) => page,
  },
  mutations: {
    [USERSCONCAT](state, value) {
      state.users = state.users.concat(value);
    },
    [USERS](state, value) {
      state.users = value;
    },
    [QUERY](state, value) {
      state.query = value;
    },
    [REPOURL](state, value) {
      state.repoUrl = value;
    },
    [SORTTYPE](state, value) {
      state.sortType = value;
    },
    [PAGE](state, value) {
      state.page = value;
    },
  },
  actions: {
    async fetcher({ getters, commit, dispatch }) {
      const { query, page } = getters;
      const res = await new Promise((resolve, reject) => {
        fetch(`https://api.github.com/search/users?q=${query}&per_page=20&page=${page}`)
          .then((response) => response.json())
          .then((results) => resolve(results))
          .catch((err) => reject(err));
      });
      commit(USERSCONCAT, res.items);
      commit(PAGE, page + 1);
      dispatch('reposFetcher');
    },

    async reposFetcher({ getters, commit }) {
      const { users } = getters;
      const acc = [];
      await users.forEach((element) => {
        const res = new Promise((resolve, reject) => {
          fetch(`${element.repos_url}`)
            .then((response) => response.json())
            .then((results) => resolve(results))
            .catch((err) => reject(err));
        });

        res.finally(() => {})
          .then((result) => Object.assign(element, { reposCount: result.length }))
          .then(() => acc.push(element))
          .then(() => commit(USERS, acc));
      });
      // commit(USERS, acc);
    },

    searchUser({ commit, dispatch }, query) {
      commit(QUERY, query);
      dispatch('fetcher');
    },

    sortUsers({ getters, commit }) {
      const { users, sortType } = getters;
      if (sortType === '') {
        users.sort((a, b) => {
          if (a.reposCount > b.reposCount) {
            return 1;
          }
          return -1;
        });
        commit(SORTTYPE, 'toBigger');
      } else if (sortType === 'toBigger') {
        users.sort((a, b) => {
          if (b.reposCount > a.reposCount) {
            return 1;
          }
          return -1;
        });
        commit(SORTTYPE, 'toSmaller');
      } else if (sortType === 'toSmaller') {
        users.sort((a, b) => {
          if (a.reposCount > b.reposCount) {
            return 1;
          }
          return -1;
        });
        commit(SORTTYPE, 'toBigger');
      }
    },
  },
};

export default usersStore;
