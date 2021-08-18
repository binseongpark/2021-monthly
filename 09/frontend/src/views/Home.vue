<template>
  <div>
    <b-container fluid>
      <b-row class="mt-4 mb-4">
        <b-col>
          <h2>Home Page {{ `- test is ${$test}` }}</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-embed
            type="iframe"
            aspect="16by9"
            src="https://www.youtube.com/embed/8keho4P3EeQ"
            allowfullscreen
          ></b-embed>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-embed
            type="iframe"
            aspect="16by9"
            src="https://www.youtube.com/embed/3DsynJMycAA"
            allowfullscreen
          ></b-embed>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-embed
            type="iframe"
            aspect="16by9"
            src="https://www.youtube.com/embed/UV5JOVcclIg"
            allowfullscreen
          ></b-embed>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-embed
            type="iframe"
            aspect="16by9"
            src="https://www.youtube.com/embed/HwzAFEJx-oA"
            allowfullscreen
          ></b-embed>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { rootComputed, rootMethods } from "@/store/helpers";
export default {
  computed: {
    ...rootComputed
  },
  methods: {}
};
</script>

<style>
</style>
