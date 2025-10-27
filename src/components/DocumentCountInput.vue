<template>
  <div>
    <label for="document-count" class="block text-sm font-medium text-gray-700 mb-2">
      Number of Documents
    </label>
    <div class="relative">
      <input
        id="document-count"
        type="text"
        :value="formattedValue"
        @input="handleInput"
        class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
        :class="{ 'border-red-500 focus:ring-red-500 focus:border-red-500': modelValue === 0 }"
        placeholder="100,000"
      />
      <FileText :size="20" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
    <p v-if="modelValue === 0" class="mt-1 text-sm text-red-600">
      Number of documents must be greater than 0
    </p>
    <div class="mt-2 flex gap-2">
      <button
        @click="adjustValue(-100000)"
        type="button"
        class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
      >
        -100K
      </button>
      <button
        @click="adjustValue(100000)"
        type="button"
        class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
      >
        +100K
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FileText } from 'lucide-vue-next'

interface Props {
  modelValue: number
}

interface Emits {
  (e: 'update:modelValue', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formattedValue = computed(() => {
  if (props.modelValue === 0) return '0'
  return props.modelValue.toLocaleString('en-US')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  // Remove all non-digit characters
  const numericValue = target.value.replace(/\D/g, '')
  const value = parseInt(numericValue) || 0
  
  emit('update:modelValue', value)
}

const adjustValue = (amount: number) => {
  const newValue = Math.max(0, props.modelValue + amount)
  emit('update:modelValue', newValue)
}
</script>
