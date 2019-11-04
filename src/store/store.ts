import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';
import router from '../router/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    status: null,
    firebaseError: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    removeUser(state) {
      state.user = null;
    },
    setStatus(state, payload) {
      state.status = payload;
    },
    setFirebaseError(state, payload) {
      state.firebaseError = payload;
    }
  },
  actions: {
    REGISTER_USER({ commit }, payload) {
      commit('setStatus', 'busy');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit('setUser', response.user);
          commit('setStatus', 'success');
          commit('setFirebaseError', null);
          router.push('/');
        })
        .catch(error => {
          commit('setStatus', 'failure');
          commit('setFirebaseError', error.message);
        });
    },
    LOGIN_USER({ commit }, payload) {
      commit('setStatus', 'busy');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit('setUser', response.user);
          commit('setStatus', 'success');
          commit('setFirebaseError', null);
          router.push('/');
        })
        .catch(error => {
          commit('setStatus', 'failure');
          commit('setFirebaseError', error.message);
        });
    },
    LOGOUT_USER({ commit }) {
      commit('setStatus', 'busy');
      firebase
        .auth()
        .signOut()
        .then(response => {
          commit('setUser', null);
          commit('setStatus', 'success');
          commit('setFirebaseError', null);
          router.push('/login');
        })
        .catch(error => {
          commit('setStatus', 'failure');
          commit('setFirebaseError', error.message);
        });
    }
  },
  getters: {
    status(state) {
      return state.status;
    },

    user(state) {
      return state.user;
    },

    firebaseError(state) {
      return state.firebaseError;
    }
  }
});
