<template>
  <Dropdown
    v-model="country"
    :options="countries"
    placeholder="Select a Country"
    optionLabel="name"
    optionValue="code"
  >
    <template #value="option">
      <div v-if="option.value" class="flex items-center">
        <span :class="`fi fi-${option.value.toLowerCase()}`" class="me-3 text-sm flex-none"></span> 
        <span>{{ countryNames.of(option.value) }}</span>
      </div>
      <div v-else>{{ option.placeholder }}</div>
    </template>
    <template #option="{ option }">
      <div class="w-[200px]">
        <span :class="`fi fi-${option.code.toLowerCase()}`" class="me-3"></span>
        <span class="text-sm">{{ option.name }}</span>
      </div>
    </template>
  </Dropdown>
</template>

<script setup>
import { countries } from '@/data/countries.json';

let countryNames = new Intl.DisplayNames(['en'], {type: 'region'});

const country = defineModel()
</script>