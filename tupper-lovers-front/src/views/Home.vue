<template>
  <div class="home">
    <button v-if="!creating" @click="createMode()">Nuevo almacén</button>
    <div v-else class="create-storage">
      <form @submit.prevent="newStorage(newName)">
        <label>Nombre: <input v-model="newName"></label>
        <a href="" @click.prevent="cancelCreation()"> Cancelar </a>
        <input type="submit" value="Guardar">
      </form>
    </div>
    <hr>
    <div class="storage" v-for="storage in storages" :key="storage.id">
      <div v-if="editing === storage">
        <form @submit.prevent="changeStorageName(storage, newName)">
          <input v-model="newName">
          <a href="" @click.prevent="cancelEdit()"> Cancelar </a>
          <input type="submit" value="Guardar">
        </form>
      </div>
      <div v-else>
        <h2>{{storage.name}}</h2>
        <a href="" @click.prevent="editMode(storage)">Editar</a> |&nbsp;
        <a href="" @click.prevent="deleteStorage(storage)">Eliminar</a>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      creating: false,
      editing: null,
      newName: ''
    }
  },
  created() {
    this.$store.dispatch('getStorages');
  },
  computed: {
    ...mapState({
      storages: 'storages'
    })
  },
  methods: {
    ...mapActions([]),
    createMode() {
      this.cancelEdit();
      this.creating = true;
      this.newName = '';
    },
    cancelCreation() {
      this.creating = false;
    },
    editMode(storage) {
      this.cancelCreation();
      this.editing = storage;
      this.newName = storage.name;
    },
    cancelEdit() {
      this.editing = null;
    },
    async changeStorageName({ id }, newName) {
      await this.$store.dispatch('changeStorageName', { id, name: newName });
      this.cancelEdit();
    },
    async newStorage(newName) {
      await this.$store.dispatch('newStorage', { name: newName });
      this.cancelCreation();
    },
    async deleteStorage(storage) {
      const result = confirm(`¿Seguro que quieres eliminar el almacenamiento "${storage.name}"?`);
      if(result) this.$store.dispatch('deleteStorage', storage);
    }
  }
}
</script>
