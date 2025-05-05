<script setup lang="ts">
import { TYPES } from "../../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import CardContent from "@/ui/CardContent.vue";
import ButtonsSwitcher from "@/ui/Buttons/ButtonsSwitcher.vue";
import LoginPresenter from "../../presenter/login.presenter";
import LoginController from "../../controller/login.controller";
import { RouterPaths } from "@/app/router/router-paths";
import Form from "./components/Form.vue";

const presenter = container.get<LoginPresenter>(TYPES.LoginPresenter);
const controller = container.get<LoginController>(TYPES.LoginController);

const router = useRouter();

</script>

<template>
    <CardContent :title="'Авторизация'">
        <template #right>
          <div class="flex w-[260px]">
            <ButtonsSwitcher
              :options="[
                {
                  label: 'Phone',
                  value: 'phone',
                },
                {
                  label: 'Email',
                  value: 'email',
                },
              ]"
              :handle-press="() => {}"
            />
          </div>
        </template>
        <Form />
      </CardContent>
  
</template>
