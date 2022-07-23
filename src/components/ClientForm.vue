<template>
  <v-form
    ref="form"
    v-model="valid"
    :readonly="submitting"
    lazy-validation
    >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
          v-model="nombreVar"
          :rules="nombreRules"
          label="Nombre"
          required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
          v-model="apellidoPaternoVar"
          :rules="apellidoPaternoRules"
          label="Apellido Paterno"
          required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
          v-model="apellidoMaternoVar"
          label="Apellido Materno"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
          v-model="rfcVar"
          :rules="rfcRules"
          label="RFC"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
          v-model="curpVar"
          :rules="curpRules"
          label="CURP"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-3 my-5">
        <cuentas-container
          :cuentas="cuentas"
          v-on:submit-cuenta="$emit('submit-cuenta', $event)"
          v-on:update-cuenta="$emit('update-cuenta', $event)"
          v-on:delete-cuenta="$emit('delete-cuenta', $event)"
        />
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          color="gray"
          class="elevation-2 mr-3"
          @click="$emit('cancel')"
        >
          Cancelar
        </v-btn>

        <v-btn
          :disabled="!valid"
          color="success"
          class="elevation-2"
          @click="submit"
        >
          Guardar
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import CuentasContainer from './Cuentas'

export default {
  name: 'ClientForm',
  props: ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'rfc', 'curp', 'cuentas', 'submitting'],
  data () {
    return {
      valid: true,
      nombreVar: this.nombre,
      apellidoPaternoVar: this.apellidoPaterno,
      apellidoMaternoVar: this.apellidoMaterno,
      rfcVar: this.rfc,
      curpVar: this.curp,
      apellidoPaternoRules: [
        v => !!v || 'Apellido Paterno obligatorio'
      ],
      nombreRules: [
        v => !!v || 'Nombre obligatorio'
      ],
      rfcRules: [
        v => !!v || 'RFC obligatorio',
        v => /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/.test(v) || 'RFC no valido'
      ],
      curpRules: [
        v => !!v || 'CURP obligatorio',
        v => /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/.test(v) || 'CURP no valido'
      ]
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.$emit('submit', {
          nombre: this.nombreVar,
          apellidoPaterno: this.apellidoPaternoVar,
          apellidoMaterno: this.apellidoMaternoVar,
          rfc: this.rfcVar,
          curp: this.curpVar
        })
      }
    }
  },
  components: {
    CuentasContainer
  }
}
</script>
