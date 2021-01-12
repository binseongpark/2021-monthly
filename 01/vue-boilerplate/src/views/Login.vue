<template>
  <div>
    <b-container fluid>
      <b-row class="mt-4 mb-4">
        <b-col>
          <h2>Login Page</h2>
        </b-col>
      </b-row>
      <b-form v-if="show">
        <b-form-group label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="text"
            placeholder="아이디"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="비밀번호"
            required
          ></b-form-input>
        </b-form-group>
        <b-row>
          <b-col>
            <b-button class="mr-2" type="submit" variant="outline-primary"
              >Submit</b-button
            >
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: []
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn"
      ],
      show: true
    };
  }
};
</script>

<style>
</style>