<script setup lang="ts">
  import { defineEmits } from 'vue'

  const emit = defineEmits(['update:open'])
  const close = () => {
    emit('update:open', false)
  }
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
                      label="Número da casa"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Bloco"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="field-row" cols="12">
                <v-text-field
                  label="Observação"
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
