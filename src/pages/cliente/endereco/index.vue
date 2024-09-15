<script setup lang="ts">
  import Apartamento from '@/components/page-component/endereco/apartamento.vue'

  const hasApartamento = ref(false)
  const hasCondominio = ref(false)
  const isEnderecoComercial = ref(false)
</script>

<template>
  <v-container class="register-container" fluid>
    <v-row align="center" justify="center">
      <v-col cols="11" md="8">
        <v-card-title class="title">
          <h2 class="font-weight-regular text-title">Endereço</h2>
          <v-divider />
        </v-card-title>
        <v-form ref="form">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" style="padding-bottom: 0">
                  <v-row>
                    <v-col cols="7" style="padding-right: 0">
                      <v-text-field
                        label="Cidade"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        label="CEP"
                        variant="outlined"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-text-field
                    label="Estado"
                    variant="outlined"
                  />
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-text-field
                    label="Bairro"
                    variant="outlined"
                  />
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-row>
                    <v-col cols="7" style="padding-right: 0">
                      <v-text-field
                        label="Rua"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        label="Número"
                        variant="outlined"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-text-field
                    label="Referência"
                    variant="outlined"
                  />
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-checkbox
                    v-model="isEnderecoComercial"
                    label="Endereço comercial."
                  />
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-row v-if="hasApartamento">
                    <Apartamento @update:open="(val: Boolean) => hasApartamento = val" />
                  </v-row>
                  <v-row v-else>
                    <v-checkbox
                      v-model="hasApartamento"
                      label="Endereço faz parte de um apartamento."
                    />
                  </v-row>
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-row v-if="hasCondominio">
                    <Condominio @update:open="(val: Boolean) => hasCondominio = val" />
                  </v-row>
                  <v-row v-else>
                    <v-checkbox
                      v-model="hasCondominio"
                      label="Endereço faz parte de um condomínio."
                    />
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="save-btn-container" cols="12">
              <v-btn
                color="primary"
                dark
                width="50%"
              >
                Cadastrar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .register-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .field-row {
    padding-bottom: 0;
    padding-top: 0;
  }

  .title {
    margin-bottom: 20px;
  }

  .text-title {
    color: #757575;
    margin-bottom: 12px;
    font-size: clamp(12px, 6vw, 48px);
    text-align: center;
  }

  .save-btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
