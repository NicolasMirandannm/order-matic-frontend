<template>
  <v-app :class="theme">
    <v-btn
      class="theme-toggle-btn"
      color="primary"
      icon
      @click="toggleTheme"
    >
      <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useTheme } from 'vuetify'

  const isDark = ref(false)
  const theme = useTheme()

  const toggleTheme = () => {
    isDark.value = !isDark.value
    theme.global.name.value = isDark.value ? 'light' : 'dark'
  }
</script>

<style scoped>
.theme-toggle-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
