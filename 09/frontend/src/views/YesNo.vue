<template>
  <div>
    <b-container fluid style="height: 100vh; positoin: relative;" class="p-0">
      <img :src="yesno.image" alt="" class="full-img" />
      <div class="text-div">
        <h1 class="text-style">{{ yesno.answer | toUpperCase }}</h1>
      </div>
    </b-container>
  </div>
</template>

<script>
import { rootComputed, rootMethods } from "@/store/helpers";
export default {
  created: function() {
    this.getYesNo().then(() => {
      console.log("view success");
    });
  },
  computed: {
    ...rootComputed
  },
  methods: {
    ...rootMethods
  },
  filters: {
    toUpperCase: function (value) {
      return value.toUpperCase()
    }
  }
};
</script>

<style>
.full-img {
  width: 100%;
  height: 100%;
}
.text-div {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-style {
  color: white;
}
</style>
