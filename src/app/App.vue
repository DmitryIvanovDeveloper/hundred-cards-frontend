<script setup lang="ts">
import { onMounted, ref } from 'vue';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { useToast } from 'primevue/usetoast';
import { ToastNotificationUseCases } from '@/modules/shared/notification/business/usecases/toast-notification.usecases';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import { TYPES } from '@/infrastructure/bootstrap/types';

const usecase = container.get<ToastNotificationUseCases>(TYPES.ToastNotificationUseCases);


</script>

<template>
  <div class="flex w-full max-w-[1440px] sm:justify-center items-center">
    <Toast />
    <RouterView />
  </div>
</template>
