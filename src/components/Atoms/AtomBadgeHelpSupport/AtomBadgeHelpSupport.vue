<!-- eslint-disable max-len -->
<template>
  <div>
    <!-- Desktop View -->
    <div class="hidden sm:flex flex-col justify-center items-center fixed top-1/2 right-0 -translate-y-1/2 bg-[#abcfe2] text-white px-8 py-2 rounded-l-full shadow-lg cursor-pointer transition text-center">
      <v-icon
        name="fa-regular-envelope"
        scale="1.5"
        class="text-[#4b88ae]"
      />
      <p class="text-[#4b88ae] font-semibold">
        Need Help?
      </p>
      <p class="text-[#4b88ae] font-semibold">
        Contact Us
      </p>
    </div>

    <!-- Mobile View -->
    <div class="sm:hidden fixed bottom-6 right-6 bg-[#abcfe2] text-white p-4 rounded-full shadow-lg cursor-pointer transition flex flex-col items-center justify-center">
      <v-icon
        name="fa-regular-envelope"
        scale="1.5"
        class="text-[#4b88ae]"
      />
      <p class="text-[#4b88ae] text-xs font-semibold">
        Need Help?
      </p>
      <p class="text-[#4b88ae] text-xs font-semibold">
        Contact Us
      </p>
    </div>
  </div>
</template>