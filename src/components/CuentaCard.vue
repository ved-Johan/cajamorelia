<template>
    <v-card
      :color="colors[idCuenta-1]"
      dark
    >
        <v-card-title>
          {{ tipoCuentas.tipoCuentas.find(e => e.idCuenta == idCuenta).nombreCuenta }}
        </v-card-title>
        <v-card-text>
          <span class="text-body" v-if="idClienteCuenta > 0" >ID Cuenta: {{ idClienteCuenta }}<br /></span>
          <span class="text-subtitle font-weight-light">Saldo</span><br />
          <span class="text-h4">{{ formattedMoney }}</span>
          <span class="text-body" v-if="fechaContratacion" ><br />Fecha Contratacion: {{ formattedContratacion }}</span>
          <span class="text-body" v-if="fechaUltimoMovimiento" ><br />Fecha Ultimo Movimiento: {{ formattedUltimoMovimiento }}</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          >
          <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="white"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          </template>
          <cuenta-form
            :edit="true"
            v-on:close="dialog = false"
            v-on:submit-cuenta="dialog = false; $emit('update-cuenta', $event)"
            :idClienteCuenta="idClienteCuenta"
            :idCuenta="idCuenta"
            :saldoActual="saldoActual"
            />
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="white"
                v-on="on"
                v-bind="attrs"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5">Esta seguro que desea eliminar esta cuenta?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
                <v-btn color="red darken-1" text @click="dialogDelete = false; $emit('delete-cuenta', idClienteCuenta)">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
          </v-card>
        </v-dialog>
        </v-card-actions>
    </v-card>
</template>

<script>
import CuentaForm from './CuentaForm'

export default {
  name: 'CuentaCard',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    colors: [
      'blue darken-2',
      'cyan darken-2',
      'light-green darken-2'
    ]
  }),
  props: ['idClienteCuenta', 'idCuenta', 'saldoActual', 'fechaContratacion', 'fechaUltimoMovimiento'],
  inject: ['tipoCuentas'],
  computed: {
    formattedMoney: function () {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })

      return formatter.format(this.saldoActual)
    },
    formattedContratacion: function () {
      return new Date(this.fechaContratacion).toLocaleString()
    },
    formattedUltimoMovimiento: function () {
      return new Date(this.fechaUltimoMovimiento).toLocaleString()
    }
  },
  components: {
    CuentaForm
  }
}
</script>
