<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useAuthorStore } from "../services/authorStore.ts";
import { useBookStore } from "../services/bookStore.ts";

const authorStore = useAuthorStore();
const bookStore = useBookStore();

const { addBook, getBooks } = bookStore;
const { getAuthors } = authorStore;

const { authors } = storeToRefs(authorStore);
const { status } = storeToRefs(bookStore);

const fileInput = ref(null);

const book = reactive({
  name: "",
  authorId: "",
  file: null,
});

const handleBookForm = async () => {
  const formValue = new FormData();

  formValue.append("name", book.name);
  formValue.append("author.id", book.authorId);
  formValue.append("file", book.file);

  await addBook(formValue);

  if (status.value === 201) {
    getBooks();
    book.name = "";
    book.authorId = "";
    fileInput.value.value = "";
  }
};

const handleFileChange = (event) => {
  book.file = event.target.files[0];
};

onMounted(() => {
  getAuthors();
});
</script>

<template>
  <section>
    <form @submit.prevent="handleBookForm" id="book-form">
      <div class="form-item">
        <label for="book">Add book</label>
        <input type="text" name="book" id="book" v-model="book.name" />
      </div>

      <div class="form-item">
        <label for="book">Select Author</label>
        <select v-model="book.authorId" name="author-select" id="author-select">
          <option v-if="authors.length === 0" disabled>
            No authors available
          </option>
          <option v-for="author in authors" :key="author.id" :value="author.id">
            {{ author.name }}
          </option>
        </select>
      </div>

      <div class="form-item">
        <label for="myfile">Select a file:</label>
        <input
          type="file"
          id="myfile"
          name="myfile"
          ref="fileInput"
          @change="handleFileChange"
        />
      </div>

      <button>Add book</button>
    </form>
  </section>
</template>
