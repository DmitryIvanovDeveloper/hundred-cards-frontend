<script setup lang="ts">
import { TYPES } from "../../../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import UniversalRoundedButton from "@/ui/Buttons/UniversalRoundedButton.vue";
import UniversalInput from "@/ui/UniversalInput.vue";
import LoginPresenter from "../../../presenter/login.presenter";
import LoginController from "../../../controller/login.controller";
import { LoginType } from "@/modules/shared/authentication/business/dtos/login.type";
import { RouterPaths } from "@/app/router/router-paths";

const presenter = container.get<LoginPresenter>(TYPES.LoginPresenter);

const controller = container.get<LoginController>(TYPES.LoginController);

const router = useRouter();

const signIn = async () => {
    const result = await controller.tryLogin();
    if (!result.isSuccess) {
        return;
    }
    console.log(RouterPaths.admin)

    router.push(RouterPaths.admin);
}
</script>

<template>
  <div class="flex w-full flex flex-col gap-[10px] pt-[20px]">
    <UniversalInput
      v-if="controller.form.value.type === LoginType.Email"
      :label="presenter.labels.email.label"
      :onChange="controller.updateEmail"
      type="email"
    />

    <UniversalInput
      v-if="controller.form.value.type === LoginType.Phone"
      :label="presenter.labels.phone.label"
      :onChange="controller.updatePhone"
      type="phone"
    />

    <UniversalInput
      :label="presenter.labels.password.label"
      :onChange="controller.updatePassword"
      type="password"
    />

    <UniversalRoundedButton
        :loading="controller.isLoading.value"
        :label="presenter.labels.confirm"
        :handle-press="signIn"
    />

    <p class="text-center text-sm text-gray-600 text-left">
      {{ presenter.labels.notRegistered.title }}
      <a href="/registration" class="text-purple-500">{{
        presenter.labels.notRegistered.goto
      }}</a>
    </p>
  </div>
</template>
