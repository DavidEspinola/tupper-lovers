import Vue from 'vue'
import Vuex from 'vuex'
import { firestore } from '@/utils/firebase';

Vue.use(Vuex);

const storageRef = firestore.collection('storage');

export default new Vuex.Store({
  state: {
    storages: []
  },
  mutations: {
    storages(state, storages) {
      state.storages = storages;
    },
    storageName(state, { id, name }) {
      const modified = state.storages.find( storage => storage.id === id);
      Vue.set(modified, 'name', name);
    },
    newStorage(state, storage) {
      state.storages.push(storage);
    },
    deletedStorage(state, deletedStorage) {
      state.storages = state.storages.filter(storage => storage !== deletedStorage);
    }
  },
  actions: {
    async getStorages({ commit }) {
      try {
        const storages = await storageRef.get();
        commit('storages', storages.docs.map( doc => ({ id: doc.id, ...doc.data() }) ));
      } catch(e) { handleError(e) }
    },
    async changeStorageName({ commit }, { id, name }) {
      try {
        await storageRef.doc(id).update({ name });
        commit('storageName', { id, name });
      } catch(e) { handleError(e) }
    },
    async newStorage({ commit }, storage) {
      try {
        const { id } = await storageRef.add(storage);
        commit('newStorage', { id, ...storage});
      } catch(e) { handleError(e) }
    },
    async deleteStorage({ commit }, storage) {
      try {
        await storageRef.doc(storage.id).delete();
        commit('deletedStorage', storage);
      } catch(e) { handleError(e) }
    }
  }
});

function handleError(e) {
  console.error(e);
  alert('Ha ocurrido un error');
}