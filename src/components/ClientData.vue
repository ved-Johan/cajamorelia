<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <span class="text-caption">RFC</span><br/>
        <span class="text-body-1">{{ rfc }}</span>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <span class="text-caption">CURP</span><br/>
        <span class="text-body-1">{{ curp }}</span>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <span class="text-caption">Fecha Alta</span><br/>
        <span class="text-body-1">{{ formattedAlta }}</span>
      </v-col>
    </v-row>
    <v-row>
      <cuentas-container
          :cuentas="cuentas"
          v-on:submit-cuenta="$emit('submit-cuenta', $event)"
          v-on:update-cuenta="$emit('update-cuenta', $event)"
          v-on:delete-cuenta="$emit('delete-cuenta', $event)"
        />
    </v-row>
  </v-container>
</template>

<script>
import CuentasContainer from './Cuentas'

export default {
  name: 'ClientData',
  props: ['rfc', 'curp', 'fechaAlta', 'cuentas'],
  components: {
    CuentasContainer
  },
  computed: {
    formattedAlta: function () {
      return new Date(this.fechaAlta).toLocaleString()
    }
  }
}
</script>
