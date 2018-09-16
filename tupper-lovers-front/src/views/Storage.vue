<template>
  <div class="storage">
    <h2 v-if="storage.name">Tuppers en {{storage.name}}</h2>

    <button v-if="!creating" @click="creating = true">Nuevo tupper</button>
    <div v-else>
      <tupper-form :tupper="{}" :storage-id="storage.id" @cancel="creating = false" @saved="creating = false">
      </tupper-form>
    </div>

    <ul v-if="storage.name && tuppers.length">
      <li v-for="tupper in tuppers" :key="tupper.id">
        x{{tupper.quantity}} {{tupper.name}}

        <div v-if="editing === tupper.id">
          <tupper-form :tupper="tupper" :storage-id="storage.id" @cancel="editing = ''" @saved="editing = ''"></tupper-form>
        </div>
        <span v-else>
          <a href="" @click.prevent="editing = tupper.id">Editar</a> |
          <a href="" @click.prevent="decrement(tupper)">Consumir</a>
        </span>

      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TupperForm from '@/components/TupperForm';

export default {
  data() {
    return {
      creating: false,
      editing: ''
    };
  },
  created() {
    this.$store.dispatch("getStorageContent", this.$route.params.id);
  },
  components: {
    TupperForm
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
    async deleteStorage(storage) {
      const result = confirm(`¿Seguro que quieres eliminar el almacenamiento "${storage.name}"?`);
      if(result) this.$store.dispatch('deleteStorage', storage);
    }
  }
};
</script>
<style lang="scss" scoped>
@import 'src/styles/common';

.storage {
  ul {
    list-style: none;
    padding: 0;
    margin-top: 20px;
  }
  button {
    @extend %action-button;
  }
}
</style>
