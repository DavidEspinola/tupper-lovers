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
    },
    addTupper(state, { storageId, newTupper }){
      state.storageContent[storageId].push(newTupper);
    },
    editTupper(state, { storageId, newTupper }) {
      const oldTupper = state.storageContent[storageId].find(tupper => tupper.id === newTupper.id);
      const index = state.storageContent[storageId].indexOf(oldTupper);
      state.storageContent[storageId][index] = newTupper;
      //state.storageContent = { ...state.storageContent, [storageId]: { newContent } 
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
    },
    async editTupper({ commit }, {storageId, newTupper}) {
      try {
        await storageRef.doc(storageId).collection('tuppers').doc(newTupper.id).update(newTupper);
        commit('editTupper', {storageId, newTupper});
      } catch(e) { handleError(e) }
    },
    async addTupper({ commit }, {storageId, newTupper}) {
      try {
        const { id } = await storageRef.doc(storageId).collection('tuppers').add(newTupper);
        commit('addTupper', { storageId, newTupper: {id, ...newTupper} });
      } catch(e) { handleError(e) }
    },
  }
});

function handleError(e) {
  console.error(e);
  alert('Ha ocurrido un error');
}