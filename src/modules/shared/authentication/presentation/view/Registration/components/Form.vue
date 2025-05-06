<script setup lang="ts">
import RegistrationPresenter from "../../../presenter/registration.presenter";
import { TYPES } from "../../../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import { ref } from "vue";
import UniversalRoundedButton from "@/ui/Buttons/UniversalRoundedButton.vue";
import UniversalInput from "@/ui/UniversalInput.vue";
import { RouterPaths } from "@/app/router/router-paths";
import RegistrationController from "../../../controller/registration.controller";
import { RegistrationType } from "../../../../business/dtos/registration-type";

const presenter = container.get<RegistrationPresenter>(
  TYPES.RegistrationPresenter
);

const controller = container.get<RegistrationController>(
  TYPES.RegistrationController
);

const router = useRouter();

</script>

<template>
  <div class="flex w-full flex flex-col gap-[10px] pt-[20px]">
    <UniversalInput
        v-if="controller.form.value.type === RegistrationType.Business"
        :label="presenter.labels.company.label"
        :onChange="() => {}"
        :required="presenter.labels.company.required"
        :placeholder="presenter.labels.company.placeholder"
    />

    <UniversalInput
        :label="presenter.labels.name.label"
        :onChange="() => {}"
        :required="presenter.labels.name.required"
        :placeholder="presenter.labels.name.placeholder"
    />
    <UniversalInput
        :label="presenter.labels.lastName.label"
        :onChange="() => {}"
        :required="presenter.labels.lastName.required"
        :placeholder="presenter.labels.lastName.placeholder"
    />

    <UniversalInput
        :label="presenter.labels.email.label"
        :onChange="() => {}"
        :required="presenter.labels.email.required"
        :placeholder="presenter.labels.email.placeholder"
    />

    <UniversalInput
        :label="presenter.labels.phone.label"
        :onChange="() => {}"
        :required="presenter.labels.phone.required"
        :placeholder="presenter.labels.phone.placeholder"
    />

    <UniversalInput
        :label="presenter.labels.password.label"
        :onChange="() => {}"
        :required="presenter.labels.password.required"
        :placeholder="presenter.labels.password.placeholder"
    />

    <UniversalInput
        :label="presenter.labels.confirmPassword.label"
        :onChange="() => {}"
        :required="presenter.labels.confirmPassword.required"
        :placeholder="presenter.labels.confirmPassword.placeholder"
    />

    <!-- Terms checkbox -->
    <div class="mb-4 flex items-center">
      <input
        id="terms"
        type="checkbox"
        class="mr-2"
      />
      <label for="terms" class="text-sm text-gray-600">
        Я принимаю
        <a href="#" class="text-purple-500">Условия использования</a> и
        <a href="#" class="text-purple-500">Политику конфиденциальности</a>
      </label>
    </div>

    <UniversalRoundedButton
        :loading="controller.isLoading.value"
        :label="'Зарегистрироваться'"
        :handle-press="controller.trySignUp"
    />

    <p class="text-center text-sm text-gray-600 text-left">
      {{presenter.labels.registeredAlready.title}} <a href="/login" class="text-purple-500">{{presenter.labels.registeredAlready.goto}}</a>
    </p>
  </div>
</template>
