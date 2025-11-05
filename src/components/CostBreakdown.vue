<template>
  <div v-if="breakdown.hasValidSelection" class="bg-white border border-gray-200 rounded-lg p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">
      Cost Breakdown
    </h2>
    
    <div class="space-y-3">
      <div v-if="breakdown.enrichmentCosts.length > 0" class="space-y-2">
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-600">Platform Fee (Re-enrichment):</span>
          <span class="font-medium text-gray-900">
            ${{ breakdown.platformFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </span>
        </div>
        <div
          v-for="enrichment in breakdown.enrichmentCosts"
          :key="enrichment.type"
          class="flex justify-between items-center text-sm"
        >
          <span class="text-gray-600">{{ enrichment.type }}:</span>
          <span class="font-medium text-gray-900">
            ${{ enrichment.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </span>
        </div>
      </div>
      
      <div class="pt-4 border-t border-gray-300">
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold text-gray-900">Total Cost:</span>
          <span class="text-2xl font-bold text-gray-900">
            {{ formattedTotal }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CostBreakdown } from '../composables/useCostCalculator'

interface Props {
  breakdown: CostBreakdown
  formattedTotal: string
}

defineProps<Props>()
</script>
