<template>
  <div class="min-h-screen bg-gray-50">
    <PageHeader />
    
    <main class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="space-y-6">
          <DocumentCountInput v-model="documentCount" />
          
          <EnrichmentSelector 
            v-model="selectedEnrichments" 
            :options="enrichmentOptions"
            :has-valid-selection="costBreakdown.hasValidSelection"
          />
          
          <button
            @click="clearCalculation"
            class="w-full py-3 px-4 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw :size="18" />
            Clear Calculation
          </button>
        </div>
      </div>
      
      <div v-if="costBreakdown.hasValidSelection" class="mt-6">
        <CostBreakdown 
          :breakdown="costBreakdown" 
          :formatted-total="formattedTotalCost"
        />
      </div>
      
      <p class="text-center text-sm text-gray-500 mt-6">
        Prices are per million documents. Final costs may vary based on actual usage.
      </p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RotateCcw } from 'lucide-vue-next'
import PageHeader from './components/PageHeader.vue'
import DocumentCountInput from './components/DocumentCountInput.vue'
import EnrichmentSelector from './components/EnrichmentSelector.vue'
import CostBreakdown from './components/CostBreakdown.vue'
import { useCostCalculator } from './composables/useCostCalculator'

const {
  documentCount,
  selectedEnrichments,
  enrichmentOptions,
  costBreakdown,
  formattedTotalCost,
  clearCalculation,
} = useCostCalculator()
</script>

