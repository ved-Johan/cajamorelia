<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">{{ header }}</span>
        </v-card-title>
        <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
            >
                <v-row>
                    <v-col
                        cols="12"
                        md="7"
                    >
                    <v-select
                      :items="tipoCuentas.tipoCuentas"
                      v-model="tipoCuentaVar"
                      :rules="tipoCuentaRules"
                      :readonly="edit"
                      item-text="nombreCuenta"
                      item-value="idCuenta"
                      label="Tipo Cuenta"
                      required
                    ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        md="5"
                    >
                    <v-text-field
                    v-model="saldoActualVar"
                    :rules="saldoRules"
                    label="Saldo"
                    prefix="$"
                    type="number"
                    min="0"
                    step="any"
                    required
                    ></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-gray darken-1"
            text
            @click="$emit('close')"
          >
            Cancelar
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="success"
            text
            @click="submitCuenta"
          >
            Guardar
          </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: 'CuentaForm',
  props: ['edit', 'idClienteCuenta', 'idCuenta', 'saldoActual'],
  inject: ['tipoCuentas'],
  data: function () {
    return {
      valid: false,
      tipoCuentaVar: this.idCuenta ? this.idCuenta : 0,
      saldoActualVar: this.saldoActual ? this.saldoActual : 0,
      tipoCuentaRules: [
        v => !!v || 'Tipo Obligatorio'
      ],
      saldoRules: [
        v => !!v || 'Saldo obligatorio',
        v => v >= 0 || 'Saldo mayor a 0'
      ]
    }
  },
  methods: {
    submitCuenta () {
      if (this.$refs.form.validate()) {
        this.$emit('submit-cuenta', {
          idClienteCuenta: this.idClienteCuenta,
          idCuenta: this.tipoCuentaVar,
          saldoActual: this.saldoActualVar
        })
      }
    }
  },
  computed: {
    header: function () {
      return (this.edit === true ? 'Editar Cuenta' : 'Nueva Cuenta')
    }
  }
}
</script>
