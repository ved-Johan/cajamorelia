<template>
  <v-container>
    <v-row>
        <div class="text-h5">Cuentas</div>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
        >
        <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="teal darken-1"
          dark
          v-bind="attrs"
          v-on="on"
        >
            Nueva Cuenta
        </v-btn>
        </template>
        <cuenta-form
          v-on:close="dialog = false"
          v-on:submit-cuenta="dialog = false; $emit('submit-cuenta', $event)"
        />
      </v-dialog>
  </v-row>
  <v-row>
    <v-col
      v-for="(cuenta, i) in cuentas"
      :key="i"
      cols="12"
    >
      <cuenta-card
        v-bind="cuenta"
        v-on:update-cuenta="$emit('update-cuenta', $event)"
        v-on:delete-cuenta="$emit('delete-cuenta', $event)"
      />
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import CuentaForm from './CuentaForm'
import CuentaCard from './CuentaCard.vue'

export default {
  name: 'CuentasContainer',
  props: ['cuentas'],
  data: () => ({
    dialog: false
  }),
  components: {
    CuentaForm,
    CuentaCard
  }
}
</script>
