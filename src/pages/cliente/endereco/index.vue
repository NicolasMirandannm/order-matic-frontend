<script setup lang="ts">
  import AlertException from '@/components/exception/AlertException.vue'
  import Apartamento from '@/components/page-component/endereco/apartamento.vue'
  import { CustomerRestSingleton } from '@/services/api/customer/customer-rest-singleton'
  import { AddressDto, ApartmentDto, CondominiumDto } from '@/services/api/customer/customer-types'
  import HttpException from '@/services/exceptions/http-exception'
  import { computed, ref } from 'vue'

  type EnderecoRulesType = {
    required: (value: string) => boolean | string
    cep: (value: string) => boolean | string
  }

  const hasApartamento = ref(false)
  const hasCondominio = ref(false)
  const endereco = ref<AddressDto>({
    city: '',
    cep: '',
    state: '',
    isCommercialAddress: false,
    neighborhood: '',
    street: '',
    reference: '',
  })

  // form
  const valid = ref(false)
  const form = ref()
  const rules = ref<EnderecoRulesType>({
    required: (value: string) => !!value || 'Campo obrigatório!',
    cep: (value: string) => value.length === 9 || 'CEP inválido!',
  })

  // computed
  const isValidInput = computed(() => {
    return (value: string, field?: keyof EnderecoRulesType) => {
      if (!field) return rules.value.required(value) === true
      const fieldRule = rules.value[field]
      if (fieldRule) {
        return rules.value.required(value) === true && fieldRule(value) === true
      }
      return false
    }
  })
  const computedCep = computed({
    get: () => endereco.value.cep,
    set: (value: string) => {
      endereco.value.cep = cepMask(value)
    },
  })

  // functions
  const extractDigits = (value: string) => {
    return value.replace(/\D/g, '')
  }
  const cepMask = (value: string) => {
    if (!value) return ''
    const digits = extractDigits(value)
    if (digits.length <= 5) return digits
    if (digits.length <= 9) return `${digits.slice(0, 5)}-${digits.slice(5)}`
  }
  const submit = () => {
    if (form.value?.validate()) {
      const customerRestService = CustomerRestSingleton.getInstance()
      customerRestService.createAddress(endereco.value)
        .then(() => {
          alert('Endereço cadastrado com sucesso!')
        })
        .catch((err: HttpException) => {
          exceptionAlertHandler(true, err?.data || 'Ocorreu algum erro ao cadastrar endereço!')
        })
        .then(() => {
          form.value?.reset()
        })
    } else {
      console.error('Form is not valid')
    }
  }
  const hasException = ref({
    show: false,
    message: '',
  })
  const exceptionAlertHandler = (show: boolean, message?: string) => {
    hasException.value.show = show
    hasException.value.message = message ?? ''
  }
</script>

<template>
  <v-container class="register-container" fluid>
    <AlertException :message="hasException.message" :show="hasException.show" @update:show="exceptionAlertHandler" />
    <v-row align="center" justify="center">
      <v-col cols="11" md="8">
        <v-card-title class="title">
          <h2 class="font-weight-regular text-title">Endereço</h2>
          <v-divider />
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" style="padding-bottom: 0">
                  <v-text-field
                    v-model="computedCep"
                    clearable
                    :color="isValidInput(endereco.cep, 'cep') ? 'success' : 'error'"
                    label="CEP"
                    maxlength="9"
                    placeholder="00000-000"
                    :rules="[rules.required, rules.cep]"
                    variant="outlined"
                  />
                  <v-row>
                    <v-col cols="7" style="padding-right: 0">
                      <v-text-field
                        v-model="endereco.city"
                        clearable
                        :color="isValidInput(endereco.city) ? 'success' : 'error'"
                        label="Cidade"
                        :rules="[rules.required]"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        v-model="endereco.state"
                        clearable
                        :color="isValidInput(endereco.state) ? 'success' : 'error'"
                        label="Estado"
                        :rules="[rules.required]"
                        variant="outlined"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-text-field
                    v-model="endereco.neighborhood"
                    clearable
                    :color="isValidInput(endereco.neighborhood) ? 'success' : 'error'"
                    label="Bairro"
                    :rules="[rules.required]"
                    variant="outlined"
                  />
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-row>
                    <v-col cols="7" style="padding-right: 0">
                      <v-text-field
                        v-model="endereco.street"
                        clearable
                        :color="isValidInput(endereco.street) ? 'success' : 'error'"
                        label="Rua"
                        :rules="[rules.required]"
                        variant="outlined"
                      />
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        v-model="endereco.number"
                        clearable
                        :color="isValidInput(endereco.number) ? 'success' : 'error'"
                        label="Número"
                        :rules="[rules.required]"
                        type="number"
                        variant="outlined"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-text-field
                    v-model="endereco.reference"
                    clearable
                    :color="isValidInput(endereco.reference) ? 'success' : 'error'"
                    label="Referência"
                    :rules="[rules.required]"
                    variant="outlined"
                  />
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-checkbox
                    v-model="endereco.isCommercialAddress"
                    color="green"
                    label="Endereço comercial."
                  />
                </v-col>
                <v-col class="field-row" cols="12">
                  <v-row v-if="hasApartamento">
                    <Apartamento
                      :apartment="endereco.apartment"
                      @update:apartment="(val: ApartmentDto) => (endereco.apartment = val)"
                      @update:open="(val: Boolean) => hasApartamento = val"
                    />
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
                    <Condominio
                      :condominium="endereco.condominium"
                      @update:condominium="(val: CondominiumDto) => (endereco.condominium = val)"
                      @update:open="(val: Boolean) => hasCondominio = val"
                    />
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
                :color="!valid ? 'none' : 'primary'"
                dark
                :disabled="!valid"
                width="50%"
                @click="submit"
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
