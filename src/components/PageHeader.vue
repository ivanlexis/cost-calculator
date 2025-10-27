<template>
  <header class="bg-white py-12">
    <div class="container mx-auto px-4 text-center">
      <div class="flex items-center justify-center gap-3 mb-3">
        <Calculator :size="48" class="text-blue-600" />
      </div>
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Re-Enrichment Cost Calculator</h1>
      <p class="text-gray-600 text-lg">
        Estimate your re-enrichment costs instantly
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Calculator } from 'lucide-vue-next'
</script>
