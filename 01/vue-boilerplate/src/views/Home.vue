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
    </b-container>
    <!--  -->
    <b-container fluid class="mt-4 status-bar">
      <b-row>
        <b-col class="text-right">
          <b-button
            type="submit"
            variant="success"
            @click="$router.push('login')"
            >Login</b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.status-bar {
  /* background-color: pink; */
  position: fixed;
  top: 0;
}
</style>