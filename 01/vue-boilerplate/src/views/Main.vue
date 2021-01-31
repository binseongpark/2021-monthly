<template>
  <div>
    <b-container fluid>
      <b-row class="mt-4 mb-4">
        <b-col>
          <h2>Main Page</h2>
        </b-col>
      </b-row>
      <b-row class="mt-4 mb-4">
        <b-table hover :items="list"></b-table>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { rootComputed, rootMethods } from "@/store/helpers";
export default {
  created() {
    this.getList()
  },
  computed: {
    ...rootComputed
  },
  data() {
    return {
    };
  },
  methods: {
    ...rootMethods
  },
};
</script>

<style>
</style>
