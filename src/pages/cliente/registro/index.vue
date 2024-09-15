<script setup lang="ts">
  import { CustomerRestSingleton } from '@/services/api/customer/customer-rest-singleton'
  import { CustomerDto } from '@/services/api/customer/customer-types'
  import HttpException from '@/services/exceptions/http-exception'
  import { computed, ref } from 'vue'
  import { RulesType } from './types'
  import AlertException from '@/components/exception/AlertException.vue'

  const user = ref<CustomerDto>({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
  })
  const hasException = ref({
    show: false,
    message: '',
  })
  const termsAccepted = ref(false)
  const showPassword = ref(false)
  const valid = ref(false)
  const rules = ref<RulesType>({
    required: (value: string) => !!value || 'Campo obrigatório!',
    email: (value: string) => /.+@.+\..+/.test(value) || 'O e-mail deve ser válido.',
    phone: (value: string) => extractDigits(value).length === 11 || 'O telefone deve ser válido.',
    password: (value: string) => value.length >= 6 || 'A senha deve possuir no mínimo 6 caracteres.',
  })
  const form = ref()

  // functions
  const submit = () => {
    if (form.value?.validate()) {
      const customerRestService = CustomerRestSingleton.getInstance()
      user.value.phoneNumber = extractDigits(user.value.phoneNumber)
      customerRestService.registerCustomer(user.value)
        .then(() => {
          alert('Usuário cadastrado com sucesso!')
        })
        .catch((err: HttpException) => {
          exceptionAlertHandler(true, err?.data || 'Ocorreu algum erro ao cadastrar usuário!')
        })
        .then(() => {
          form.value?.reset()
        })
    } else {
      console.error('Form is not valid')
    }
  }

  const exceptionAlertHandler = (show: boolean, message?: string) => {
    hasException.value.show = show
    hasException.value.message = message ?? ''
  }

  const extractDigits = (value: string) => {
    return value.replace(/\D/g, '')
  }

  const phoneMask = (value: string) => {
    if (!value) return ''
    const digits = extractDigits(value)
    if (digits.length < 1) return value
    if (digits.length < 3) return `(${digits}`
    if (digits.length < 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }

  // computed
  const isValidInput = computed(() => {
    return (value: string, field?: keyof RulesType) => {
      if (!field) return rules.value.required(value) === true
      const fieldRule = rules.value[field]
      if (fieldRule) {
        return rules.value.required(value) === true && fieldRule(value) === true
      }
      return false
    }
  })

  const computedPhone = computed({
    get: () => user.value.phoneNumber,
    set: (value: string) => {
      user.value.phoneNumber = phoneMask(value)
    },
  })
</script>

<template>
  <v-container class="register-container" fluid>
    <AlertException :message="hasException.message" :show="hasException.show" @update:show="exceptionAlertHandler" />
    <v-row align="center" justify="center">
      <v-col cols="10" md="6" sm="8">
        <v-card-title class="title">
          <h2 class="font-weight-regular text-title">Registro de usuário</h2>
          <v-divider />
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="user.username"
            class="mb-4"
            clearable
            :color="isValidInput(user.username) ? 'success' : 'error'"
            label="Nome"
            required
            :rules="[rules.required]"
            variant="outlined"
          />

          <v-text-field
            v-model="user.email"
            class="mb-4"
            clearable
            :color="isValidInput(user.email, 'email') ? 'success' : 'error'"
            label="Email"
            placeholder="seu.email@gmail.com"
            required
            :rules="[rules.required, rules.email]"
            variant="outlined"
          />

          <v-text-field
            v-model="computedPhone"
            class="mb-4"
            clearable
            :color="isValidInput(user.phoneNumber, 'phone') ? 'success' : 'error'"
            label="Telefone"
            maxlength="15"
            placeholder="(99) 99999-9999"
            required
            :rules="[rules.required, rules.phone]"
            type="text"
            variant="outlined"
          />

          <v-text-field
            v-model="user.password"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            autocomplete="on"
            class="mb-4"
            :color="user.password && isValidInput(user.password, 'password') ? 'success' : 'error'"
            label="Senha"
            required
            :rules="[rules.required, rules.password]"
            :type="showPassword ? 'text' : 'password'"
            variant="outlined"
            @click:append-inner="showPassword = !showPassword"
          />

          <v-row>
            <v-col cols="12">
              <v-checkbox
                v-model="termsAccepted"
                required
              >
                <template #label>
                  <span>Eu aceito os <a href="#">Termos de Uso e a Política de Privacidade.</a></span>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>

          <v-btn
            block
            class="mt-4 btn"
            :color="!valid || !termsAccepted ? 'none' : 'primary'"
            :disabled="!valid || !termsAccepted"
            size="large"
            @click="submit"
          >
            Cadastrar
          </v-btn>
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

  .title {
    margin-bottom: 20px;
  }

  .text-title {
    color: #757575;
    margin-bottom: 12px;
    font-size: clamp(12px, 6vw, 48px);
    text-align: center;
  }

</style>
