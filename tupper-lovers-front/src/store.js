import Vue from 'vue'
import Vuex from 'vuex'
import { firestore } from '@/utils/firebase';

Vue.use(Vuex);

const storageRef = firestore.collection('storage');

export default new Vuex.Store({
  state: {
    storages: [],
    storageContent: {}
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
    },
    storageContent(state, { id, storageContent }) {
      state.storageContent = { ...state.storageContent, [id]: storageContent };
    }
  },
  actions: {
    async getStorages({ state, commit, dispatch }) {
      try {
        const response = await storageRef.get();
        const storages = response.docs.map( doc => ({ id: doc.id, ...doc.data() }) );
        commit('storages', storages);
        if(!Object.keys(state.storageContent).length) {
          storages.forEach(storage => dispatch('getStorageContent', storage.id));
        }
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
    },
    async getStorageContent({ state, commit, dispatch }, id) {
      try {
        const response = await storageRef.doc(id).collection('tuppers').get();
        const storageContent = response.docs.map( doc => ({ id: doc.id, ...doc.data() }));
        commit('storageContent', { id, storageContent });
        if(!Object.keys(state.storages).length) {
          dispatch('getStorages');
        }
      } catch(e) { handleError(e) }
    }
  }
});

function handleError(e) {
  console.error(e);
  alert('Ha ocurrido un error');
}