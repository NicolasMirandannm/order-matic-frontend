<script setup lang="ts">
  import { CondominiumDto } from '@/services/api/customer/customer-types'
  import { defineEmits, defineProps, ref, watch } from 'vue'

  const emit = defineEmits(['update:open', 'update:condominium'])
  const close = () => {
    emit('update:open', false)
  }

  const props = defineProps({
    condominium: {
      type: Object as () => CondominiumDto,
      required: false,
    },
  })

  const condominio = ref<CondominiumDto>({
    block: props.condominium?.block,
    houseNumber: props.condominium?.houseNumber,
    observation: props.condominium?.observation,
  })

  watch(condominio, newValue => {
    emit('update:condominium', newValue)
  }, { deep: true })
</script>

<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card-title class="title">
          <div class="title-container">
            <p class="font-weight-regular text-title">Condomínio</p>
            <v-btn variant="plain" @click="close">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-divider />
        </v-card-title>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" style="padding-bottom: 0">
                <v-row>
                  <v-col cols="8" style="padding-right: 0">
                    <v-text-field
                      v-model="condominio.houseNumber"
                      clearable
                      label="Número da casa"
                      :rules="[() => !!condominio.houseNumber || 'Campo obrigatório']"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="condominio.block"
                      clearable
                      label="Bloco"
                      :rules="[() => !!condominio.block || 'Campo obrigatório']"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="field-row" cols="12">
                <v-text-field
                  v-model="condominio.observation"
                  clearable
                  label="Observação (Opcional)"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .text-title {
    color: #757575;
    font-size: clamp(8px, 4.5vw, 28px);
    text-align: center;
  }
  .field-row {
    padding-bottom: 0;
    padding-top: 0;
  }
</style>
