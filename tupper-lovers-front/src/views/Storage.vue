<template>
  <div class="storage">
    <h2 v-if="storage.name">Tuppers en {{storage.name}}</h2>
    <button v-if="!creating" @click="createMode()">Nuevo tupper</button>
    <div v-else class="create-tupper">
      <form @submit.prevent="newTupper(newName)">
        <label>Nombre: <input v-model="newValues.name"></label>&nbsp;
        <label>Cantidad: <input type="number" v-model="newValues.quantity"></label>
        <a href="" @click.prevent="cancelCreation()"> Cancelar </a>
        <input type="submit" value="Guardar">
      </form>
    </div>
    <ul v-if="storage.name && tuppers.length">
      <li v-for="tupper in tuppers" :key="tupper.id">
        x{{tupper.quantity}} {{tupper.name}}
        <a href="" @click.prevent="decrement(tupper)">Consumir</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      creating: false,
      newValues: {}
    };
  },
  created() {
    this.$store.dispatch("getStorageContent", this.$route.params.id);
  },
  computed: {
    ...mapState({
      storage(state) {
        return state.storages.find(s => s.id === this.$route.params.id) || {};
      },
      tuppers(state) {
        return state.storageContent[this.$route.params.id] || [];
      }
    })
  },
  methods: {
    decrement(tupper) {
      const result = confirm(
        `¿Seguro que has gastado 1 tupper de ${tupper.name}?`
      );
      if (result) alert("tupper consumido");
    },
    createMode() {
      this.creating = true;
      this.newValues = {};
    },
    cancelCreation() {
      this.creating = false;
    },
    async editTupper({ id }, newValues) {
      await this.$store.dispatch('editTupper', { id, newValues });
      this.cancelEdit();
    },
    async newTupper(newTupper) {
      await this.$store.dispatch('newTupper', newTupper);
      this.cancelCreation();
    },
    async deleteStorage(storage) {
      const result = confirm(`¿Seguro que quieres eliminar el almacenamiento "${storage.name}"?`);
      if(result) this.$store.dispatch('deleteStorage', storage);
    }
  }
};
</script>
<style lang="scss" scoped>
.storage {
  ul {
    list-style: none;
    padding: 0;
    margin-top: 20px;
  }
}
</style>
