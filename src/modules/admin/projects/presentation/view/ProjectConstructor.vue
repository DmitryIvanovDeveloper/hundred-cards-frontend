<script setup>
import { ref } from "vue";
import { Bold, Italic, Check, X, GripVertical } from "lucide-vue-next";
import LevelEditor from "@/modules/admin/levels/presentation/view/LevelEditor.vue";
import QuestionEditor from "@/modules/admin/questions/presentation/view/QuestionEditor.vue";

const category = ref("Category 1");
const question = ref("Раз два три");
const answers = ref([
  { text: "Раз два три", isCorrect: true },
  { text: "Раз два три четыре пять", isCorrect: false },
  { text: "", isCorrect: false },
]);
</script>

<template>
  <div
    class="flex w-full items-center justify-center min-h-screen bg-gray-100 bg-opacity-80"
    style="background-image: url(&quot;path-to-wavy-background.png&quot;)"
  >
    <div class="flex  flex-col w-full max-w-[500px]">
      <LevelEditor />
      <QuestionEditor />
    </div>
  </div>
</template>
