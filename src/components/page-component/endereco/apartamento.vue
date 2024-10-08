<script setup lang="ts">
  import { ApartmentDto } from '@/services/api/customer/customer-types'
  import { defineEmits, defineProps, ref, watch } from 'vue'

  const emit = defineEmits(['update:open', 'update:apartment'])
  const close = () => {
    emit('update:open', false)
  }

  const props = defineProps({
    apartment: {
      type: Object as () => ApartmentDto,
      required: false,
    },
  })

  const apartment = ref<ApartmentDto>({
    floor: props.apartment?.floor,
    block: props.apartment?.block,
    observation: props.apartment?.observation,
    number: props.apartment?.number,
  })

  watch(apartment, newValue => {
    emit('update:apartment', newValue)
  }, { deep: true })
</script>

<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card-title class="title">
          <div class="title-container">
            <p class="font-weight-regular text-title">Apartamento</p>
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
                  <v-col cols="6" style="padding-right: 0">
                    <v-text-field
                      v-model="apartment.floor"
                      clearable
                      label="Andar"
                      :rules="[() => !!apartment.floor || 'Campo obrigatório']"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="apartment.block"
                      clearable
                      label="Bloco"
                      :rules="[() => !!apartment.block || 'Campo obrigatório']"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="field-row" cols="12">
                <v-row>
                  <v-col cols="7" style="padding-right: 0">
                    <v-text-field
                      v-model="apartment.observation"
                      clearable
                      label="Observação (Opcional)"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      v-model="apartment.number"
                      clearable
                      label="Número"
                      :rules="[() => !!apartment.number || 'Campo obrigatório']"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .title {
    margin-bottom: 20px;
  }
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
