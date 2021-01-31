<template>
  <div>
    <b-container fluid>
      <b-row class="mt-4 mb-4">
        <b-col>
          <h2>Login Page</h2>
        </b-col>
      </b-row>
      <b-form v-if="show" @submit.prevent="submit" :novalidate="true">
        <b-form-group label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.id"
            type="text"
            placeholder="아이디"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="비밀번호"
            required
          ></b-form-input>
        </b-form-group>
        <b-row>
          <b-col>
            <b-button class="mr-2" type="submit" variant="outline-primary"
              >Submit</b-button
            >
            <b-button class="mr-2" type="reset" variant="danger"
              >Reset</b-button
            >
            <b-button
              class="mr-2"
              variant="outline-primary"
              @click="$router.push('/')"
              >Cancel</b-button
            >
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { rootComputed, rootMethods } from "@/store/helpers";

export default {
  data() {
    return {
      form: {
        id: "",
        password: ""
      },
      show: true
    };
  },
  computed: {
    ...rootComputed
  },
  methods: {
    submit: function() {
      console.log(this.form.id);
      console.log(this.form.password);

      // validation 처리
    }
  }
};
</script>

<style>
</style>
