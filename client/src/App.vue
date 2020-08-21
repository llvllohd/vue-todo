<template>
  <div id="app">
    <List />
  </div>
</template>

<script>
import List from "./components/List.vue";
// mongodb+srv://admin:<Fatima@1996>@cluster0.ktzpu.mongodb.net/<dbname>?retryWrites=true&w=majority
export default {
  name: "App",
  components: {
    List,
  },
};
</script>

<style>
</style>
