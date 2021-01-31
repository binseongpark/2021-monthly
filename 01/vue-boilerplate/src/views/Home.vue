<template>
  <div>
    <b-container fluid>
      <b-row class="mt-4 mb-4">
        <b-col>
          <h2>Home Page</h2>
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
              type="submit"
              variant="success"
              @click="$router.push('yesno')"
              >YesNo</b-button
            >
          </template>
          <template v-else>
            <b-button
              class="ml-2"
              type="submit"
              variant="success"
              @click="$router.push('login')"
              >Login</b-button
            >
          </template>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { rootComputed, rootMethods } from "@/store/helpers";
export default {
  created: function() {
    console.log("@@@@ created");
    console.log(this.$vm);
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted: function() {
    console.log("@@@@ mounted");
    console.log(this.store);
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
