<template>
  <div class="container">
    <header class="jumbotron text-center">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: "Error",
  data() {
    return {
      content: "404 Error",
    };
  },
};
</script>
