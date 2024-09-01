<script setup lang="ts">
  import { computed, defineEmits, defineProps } from 'vue'

  const props = defineProps({
    show: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  })
  const emit = defineEmits(['update:show'])

  const showRef = computed({
    get: () => props.show,
    set: value => emit('update:show', value),
  })
</script>

<template>
  <v-snackbar
    v-model="showRef"
    color="red-darken-4"
    elevation="6"
    multi-line
  >
    <v-icon class="mr-2" color="white" start>mdi-alert-circle</v-icon>
    {{ props.message }}

    <template #actions>
      <v-btn
        color="white"
        text=""
        @click="emit('update:show', false)"
      >
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
