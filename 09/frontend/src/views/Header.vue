<template>
  <!--  -->
  <b-container
    fluid
    class="pt-3 pb-3 status-bar"
    :class="{ 'status-bar-fill': isScroll }"
  >
    <b-row>
      <b-col class="text-right">
        <template v-if="loggedIn">
          <b-button
            v-if="$route.path === '/main'"
            type="submit"
            variant="success"
            @click="$router.push({ path: 'yesno' }).catch(() => {})"
            >YesNo</b-button
          >
          <b-button
            v-if="$route.path === '/yesno'"
            type="submit"
            variant="success"
            @click="$router.push({ path: 'main' }).catch(() => {})"
            >Main</b-button
          >
        </template>
        <template v-else>
          <b-button
            class="ml-2"
            type="submit"
            variant="success"
            @click="$helloWorld()"
            >Test</b-button
          >
          <b-button
            class="ml-2"
            type="submit"
            variant="success"
            @click="$router.push({ path: 'login' }).catch(() => {})"
            >Login</b-button
          >
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { rootComputed } from "@/store/helpers";
export default {
  created: function() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      isScroll: false
    };
  },
  computed: {
    ...rootComputed
  },
  methods: {
    handleScroll: function() {
      if (window.scrollY > 0) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    }
  }
};
</script>

<style>
.status-bar {
  /* background-color: pink; */
  position: fixed;
  top: 0;
  animation-name: hide;
  animation-duration: 0.3s;
  z-index: 1000;
}
.status-bar-fill {
  background-color: rgb(33, 33, 33);
  animation-name: show;
  animation-duration: 0.3s;
}

@keyframes show {
  from {
    background-color: transparent;
  }
  to {
    background-color: rgb(33, 33, 33);
  }
}
@keyframes hide {
  from {
    background-color: rgb(33, 33, 33);
  }
  to {
    background-color: transparent;
  }
}
</style>
