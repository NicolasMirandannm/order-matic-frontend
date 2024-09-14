<script setup lang="ts">

</script>

<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card-title class="title">
          <h2 class="font-weight-regular text-title">Apartamento</h2>
          <v-divider />
        </v-card-title>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" style="padding-bottom: 0">
                <v-row>
                  <v-col cols="6" style="padding-right: 0">
                    <v-text-field
                      label="Andar"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Bloco"
                      variant="outlined"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="field-row" cols="12">
                <v-row>
                  <v-col cols="8" style="padding-right: 0">
                    <v-text-field
                      label="Observação"
                      variant="outlined"
                    />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Número"
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
  .text-title {
    color: #757575;
    margin-bottom: 12px;
    font-size: clamp(12px, 6vw, 48px);
    text-align: center;
  }
  .field-row {
    padding-bottom: 0;
    padding-top: 0;
  }
</style>
