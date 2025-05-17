<script setup lang="ts">
// Props, emits, and logic for the game content will go here
</script>

<template>
  <main class="container mx-auto px-4 py-6">
    <!-- This is where the giraff elements will go -->
    <div class="min-h-[400px] flex items-center justify-center">
      <div class="text-center">
        <p class="text-lg text-brand-gray-dark">Drag and drop the giraffes to arrange them by height</p>
        <!-- Placeholder for giraff elements -->
        <div class="mt-8 flex flex-col gap-4">
          <div class="bg-brand-gray-light rounded-lg p-4">Giraff Element 1</div>
          <div class="bg-brand-gray-light rounded-lg p-4">Giraff Element 2</div>
          <div class="bg-brand-gray-light rounded-lg p-4">Giraff Element 3</div>
        </div>
      </div>
    </div>
  </main>
</template> 