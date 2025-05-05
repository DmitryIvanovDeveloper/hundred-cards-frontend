<script setup lang="ts">
import RegistrationPresenter from "../../../presenter/registration.presenter";
import { TYPES } from "../../../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import { ref } from "vue";
import UniversalRoundedButton from "@/ui/Buttons/UniversalRoundedButton.vue";
import UniversalInput from "@/ui/UniversalInput.vue";
import CardContent from "@/ui/CardContent.vue";
import UniversalCheckbox from "@/ui/UniversalCheckbox.vue";
import { RouterPaths } from "@/app/router/router-paths";

const presenter = container.get<RegistrationPresenter>(
  TYPES.RegistrationPresenter
);
const router = useRouter();

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
});
</script>

<template>
  <div class="flex h-full w-full flex flex-col gap-[20px]">
    <UniversalInput
      label="Введите название компании"
      :onChange="() => {}"
      required
    />

    <UniversalInput
      label="Имя"
      placeholder="Введите имя"
      :onChange="() => {}"
      required
    />
    <UniversalInput
      label="Фамилия"
      placeholder="Введите имя"
      :onChange="() => {}"
      required
    />

    <UniversalInput
      label="Email (личный)"
      :onChange="() => {}"
      type="email"
      required
    />

    <UniversalInput
      label="Телефон"
      :onChange="() => {}"
      type="phone"
      required
    />

    <UniversalInput
      label="Пароль"
      :onChange="() => {}"
      type="password"
      required
    />

    <UniversalInput
      label="Подтверждения пароля"
      :onChange="() => {}"
      type="password"
      required
    />

    <!-- Terms checkbox -->
    <div class="mb-4 flex items-center">
      <input
        id="terms"
        type="checkbox"
        v-model="form.termsAccepted"
        class="mr-2"
      />
      <label for="terms" class="text-sm text-gray-600">
        Я принимаю
        <a href="#" class="text-purple-500">Условия использования</a> и
        <a href="#" class="text-purple-500">Политику конфиденциальности</a>
      </label>
    </div>

    <UniversalRoundedButton
      :label="'Зарегистрироваться'"
      :handle-press="() => router.push(RouterPaths.login)"
    />

    <p class="text-center text-sm text-gray-600">
      Уже зарегистрированы? <a href="/login" class="text-purple-500">Войти</a>
    </p>
  </div>
</template>
