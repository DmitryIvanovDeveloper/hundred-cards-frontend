<script setup lang="ts">
import RegistrationPresenter from "../../presenter/registration.presenter";
import { TYPES } from "../../../types";
import { container } from "@/infrastructure/bootstrap/inversify.config";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Form from "./components/Form.vue";
import Advantages from "./components/Advantages.vue";
import Verefication from "./components/Verefication.vue";
import Help from "./components/Help.vue";
import CardContent from "@/ui/CardContent.vue";
import ButtonsSwitcher from "@/ui/Buttons/ButtonsSwitcher.vue";

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
  <div
    class="flex gap-[30px] scale-100 scale-100"
  >
    <CardContent :title="'Регистрация'">
      <template #right>
        <div class="flex w-[260px] ">
          <ButtonsSwitcher
            :options="[
              {
                label: 'Для бизнеса',
                value: 'business',
              },
              {
                label: 'Для себя',
                value: 'own',
              },
            ]"
            :handlePress="(type) => {}"
          />
        </div>
      </template>
      <Form />
    </CardContent>

    <div class="grid flex-col gap-[30px]">
      <Advantages />
      <Verefication />
      <Help />
    </div>
  </div>
</template>
