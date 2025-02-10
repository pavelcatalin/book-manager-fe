<script setup lang="ts">
import { ref } from "vue";
import { useAuthorStore } from "../services/authorStore.ts";
import { storeToRefs } from "pinia";

const authorStore = useAuthorStore();
const { addAuthor } = authorStore;

const { status } = storeToRefs(authorStore);
const author = ref("");

const handleAuthorForm = async () => {
  const form = new FormData();
  form.append("name", author.value);
  await addAuthor(form);

  if (status.value === 201) {
    author.value = "";
  }
};
</script>

<template>
  <section>
    <form @submit.prevent="handleAuthorForm">
      <div class="form-item">
        <label for="author">Add author</label>
        <input type="text" name="author" id="author" v-model="author" />
      </div>

      <button>Add author</button>
    </form>
  </section>
</template>
