import { ref, computed } from 'vue'

export interface CostBreakdown {
  documentCount: number
  enrichmentTypes: string[]
  platformFee: number
  enrichmentCosts: { type: string; cost: number; perMillionCost: number }[]
  totalEnrichmentCost: number
  totalCost: number
  hasValidSelection: boolean
}

export function useCostCalculator() {
  const documentCount = ref<number>(100000)
  const selectedEnrichments = ref<string[]>([])

  // Platform fee: $201 per million documents for re-enrichment
  const PLATFORM_FEE_PER_MILLION = 201

  // Enrichment costs per million documents
  const enrichmentOptions = [
    { id: 'rubix', label: 'Rubix', costPerMillion: 151 },
    { id: 'lera', label: 'LERA', costPerMillion: 249 },
    { id: 'wdc', label: 'WDC', costPerMillion: 1986 },
    { id: 'ned', label: 'NED', costPerMillion: 1 },
  ]

  const costBreakdown = computed<CostBreakdown>(() => {
    const millions = documentCount.value / 1000000
    const platformFee = PLATFORM_FEE_PER_MILLION * millions
    
    const enrichmentCosts = selectedEnrichments.value.map((id: string) => {
      const option = enrichmentOptions.find((opt) => opt.id === id)
      const perMillionCost = option?.costPerMillion || 0
      return {
        type: option?.label || id,
        perMillionCost: perMillionCost,
        cost: perMillionCost * millions,
      }
    })

    const totalEnrichmentCost = enrichmentCosts.reduce(
      (sum: number, item: { type: string; cost: number; perMillionCost: number }) => sum + item.cost,
      0
    )
    
    const totalCost = platformFee + totalEnrichmentCost
    const hasValidSelection = selectedEnrichments.value.length > 0

    return {
      documentCount: documentCount.value,
      enrichmentTypes: selectedEnrichments.value,
      platformFee,
      enrichmentCosts,
      totalEnrichmentCost,
      totalCost,
      hasValidSelection,
    }
  })

  const formattedTotalCost = computed(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(costBreakdown.value.totalCost)
  })

  const clearCalculation = () => {
    documentCount.value = 100000
    selectedEnrichments.value = []
  }

  return {
    documentCount,
    selectedEnrichments,
    enrichmentOptions,
    costBreakdown,
    formattedTotalCost,
    clearCalculation,
  }
}
