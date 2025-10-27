<template>
  <div>
    <h2 class="text-sm font-medium text-gray-700 mb-3">
      Select Enrichment Types
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label
        v-for="option in options"
        :key="option.id"
        class="flex items-start gap-3 p-4 border border-gray-200 rounded-md hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
        :class="{ 'border-blue-500 bg-blue-50': modelValue.includes(option.id) }"
      >
        <input
          type="checkbox"
          :value="option.id"
          :checked="modelValue.includes(option.id)"
          @change="handleChange(option.id)"
          class="mt-0.5 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <div class="flex-1">
          <div class="font-medium text-gray-900">{{ option.label }}</div>
          <div class="text-sm text-gray-600">
            ${{ option.costPerMillion.toLocaleString() }} per million documents
          </div>
        </div>
      </label>
    </div>
    <div v-if="!hasValidSelection" class="mt-3 text-sm text-red-600">
      Please select at least one enrichment type
    </div>
  </div>
</template>

<script setup lang="ts">
interface EnrichmentOption {
  id: string
  label: string
  costPerMillion: number
}

interface Props {
  modelValue: string[]
  options: EnrichmentOption[]
  hasValidSelection: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleChange = (id: string) => {
  const newValue = props.modelValue.includes(id)
    ? props.modelValue.filter((item: string) => item !== id)
    : [...props.modelValue, id]
  emit('update:modelValue', newValue)
}
</script>
