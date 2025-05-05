<script setup lang="ts">
import { onMounted, ref } from 'vue';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { useToast } from 'primevue/usetoast';
import { ToastNotificationUseCases } from '@/modules/shared/notification/business/usecases/toast-notification.usecases';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import { TYPES } from '@/infrastructure/bootstrap/types';

const usecase = container.get<ToastNotificationUseCases>(TYPES.ToastNotificationUseCases);

// Состояние для хранения текущего масштаба
const scale = ref(1);

// Функция для обновления масштаба
const updateScale = () => {
  const windowHeight = window.innerHeight;  // Получаем высоту окна
  scale.value = Math.max(0.5, Math.min(1, windowHeight / 800));  // Вычисляем масштаб, ограничиваем от 0.5 до 1
};

onMounted(() => {
  document.documentElement.style.setProperty('--el-color-primary', '#409EFF');
  document.documentElement.style.removeProperty('--el-bg-color');
  
  usecase.setToast(useToast());

  // Обновляем масштаб при монтировании компонента
  updateScale();

  // Добавляем слушатель события resize для динамического изменения масштаба
  window.addEventListener('resize', updateScale);
})
</script>

<template>
  <div class="flex w-full justify-center justify-items" :style="{ transform: `scale(${scale})` }">
    <Toast />
    <RouterView />
  </div>
</template>
