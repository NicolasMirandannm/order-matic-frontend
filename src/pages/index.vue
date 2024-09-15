<template>
  <v-container class="register-container">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col class="register-btn" cols="6">
            <v-btn color="primary" dark width="100%" @click="router.push('/cliente/registro')">
              Cadastrar Cliente
            </v-btn>
          </v-col>
          <v-col class="register-btn" cols="6">
            <v-btn color="primary" dark width="100%" @click="router.push('/cliente/endereco')">
              Cadastrar Endereço
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()
</script>
