<script setup lang="ts">
import BookForm from "../components/BookForm.vue";
import AuthorForm from "../components/AuthorForm.vue";
import Books from "../components/Books.vue";
</script>

<template>
  <main>
    <AuthorForm />
    <BookForm />
    <Books />
  </main>
</template>

<style lang="scss">
main {
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 300px;
  width: 300px;
  padding: 10px;
  background-color: white;
  opacity: 0.8;
  border-radius: 10px;
  margin: 20px;

  .form-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: black;
  }
}
</style>
