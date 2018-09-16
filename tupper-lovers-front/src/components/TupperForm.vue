<template>
  <div class="tupper-form">
    <form @submit.prevent="saveTupper()">
      <div>
        <label>Nombre</label>
        <input v-model="newTupper.name">
      </div>
      <div class="quantity">
        <label>Cantidad</label>
        <quantity-control v-model="newTupper.quantity"></quantity-control>
      </div>
      <div class="controls">
        <a href="" @click.prevent="$emit('cancel')">Cancelar</a>
        <input type="submit" value="Guardar">
      </div>
    </form>
  </div>
  
</template>

<script>

import QuantityControl from '@/components/QuantityControl';

export default {
  props: {
    tupper: Object,
    storageId: String
  },
  components: {
    QuantityControl
  },
  data() {
    return {
      newTupper: {}
    };
  },
  watch: {
    tupper(oldTupper, newTupper) {
      this.newTupper = newTupper;
    }
  },
  created() {
    this.newTupper = this.tupper ? { ...this.tupper }: {};
  },
  methods: {
    async saveTupper() {
      if (this.tupper.id) {
        await this.editTupper();
      } else {
        await this.addTupper();
      }
      console.log('saved');
      this.$emit('saved');
    },
    async editTupper() {
      await this.$store.dispatch('editTupper', {
        storageId: this.storageId,
        newTupper: this.newTupper
      });
    },
    async addTupper() {
      await this.$store.dispatch('addTupper', {
        storageId: this.storageId,
        newTupper: this.newTupper
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/styles/common';

.tupper-form {
  display: flex;
  justify-content: center;
  form {
    text-align: left;
    padding: 20px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    box-shadow: grey;
    box-shadow: 0 4px 8px 0 rgba(8, 8, 8, 0.32);
    & > div {
      margin-bottom: 20px;
      label {
        text-align: center;
        display: block;
        width: 100%; 
        text-align: center; 
        font-weight: bold;
        margin-bottom: 10px;
      }
      input:not([type=submit]) {
        @extend %input-base;
      }
      &.controls {
        margin-bottom: 0;
        display: flex;
        justify-content: flex-end;
        input {
          @extend %action-button;
        }
        a {
          color: $mainColor;
          padding: 10px;
        }
      }
    }
  }
}
</style>
