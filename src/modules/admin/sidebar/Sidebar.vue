<script setup lang="ts">
import { RouterPaths } from "@/app/router/router-paths";
import Logo from "@/ui/Logo.vue";
import { UserIcon, FolderIcon, ChartBarIcon, CogIcon, QuestionMarkCircleIcon,  } from '@heroicons/vue/24/solid';
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const handlePress = (type: 'projects' | 'account' | 'analitics' | 'settings' | 'help') => {
    if (type === 'projects') {
        const newPath = `${RouterPaths.admin}/${RouterPaths.projects}/${RouterPaths.list}`;
        router.push(newPath);
    }
}
</script>

<template>
  <div class="flex flex-col w-[200px] h-full bg-[#B6CAD1] p-[20px] gap-[80px]">
    <Logo />

    <div class="flex flex-col gap-[20px] justify-left items-start">
        <button class="icon-container flex gap-[10px] cursor-pointer" :onclick="() => handlePress('account')">
            <UserIcon class="icon" />
            <span class="text-[#FFFFFF] font-rubik-700 text-[16px]">{{ "Мой аккаунт" }}</span>
        </button>
        <button class="icon-container flex gap-[10px] cursor-pointer" :onclick="() => handlePress('projects')">
            <FolderIcon class="icon" />
            <span class="text-[#FFFFFF] font-rubik-700 text-[16px]">{{ "Проекты" }}</span>
        </button>
        <button class="icon-container flex gap-[10px] cursor-pointer":onclick="() => handlePress('analitics')">
            <ChartBarIcon class="icon" />
            <span class="text-[#FFFFFF] font-rubik-700 text-[16px]">{{ "Аналитика" }}</span>
        </button>
        <button class="icon-container flex gap-[10px] cursor-pointer" :onclick="() => handlePress('settings')">
            <CogIcon class="icon" />
            <span class="text-[#FFFFFF] font-rubik-700 text-[16px]">{{ "Настройки" }}</span>
        </button>
        <button class="icon-container flex gap-[10px] cursor-pointer" :onclick="() => handlePress('help')">
            <QuestionMarkCircleIcon class="icon" />
            <span class="text-[#FFFFFF] font-rubik-700 text-[16px]">{{ "Помощь" }}</span>
        </button>
    </div>
  </div>
</template>

<style scoped>
.icon-container {
  margin-bottom: 20px;
}

.icon {
  width: 24px;
  height: 24px;
  color: #fff;
}
</style>
