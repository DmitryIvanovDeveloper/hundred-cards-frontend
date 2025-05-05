<script setup lang="ts">
import RegistrationPresenter from "../../../presenter/registration.presenter";
import { TYPES } from "../../../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import { ref } from "vue";
import UniversalRoundedButton from "@/ui/Buttons/UniversalRoundedButton.vue";
import UniversalInput from "@/ui/UniversalInput.vue";
import LoginPresenter from "../../../presenter/login.presenter";
import { RouterPaths } from "@/app/router/router-paths";

const presenter = container.get<LoginPresenter>(
  TYPES.LoginPresenter
);
const router = useRouter();

const form = ref({
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
});
</script>

<template>
  <div class="flex h-full w-full flex flex-col gap-[20px]">
    <UniversalInput label="Email (личный)" :onChange="() => {}" type="email" />

    <UniversalInput label="Телефон" :onChange="() => {}" type="phone" />

    <UniversalInput label="Пароль" :onChange="() => {}" type="password" />

    <UniversalRoundedButton
      :label="'Войти'"
      :handle-press="() => router.push(RouterPaths.registration)"
    />

    <p class="text-center text-sm text-gray-600">
      Не зарегистрировваны? <a href="/registration" class="text-purple-500">Зарегистрироваться</a>
    </p>
  </div>
</template>
