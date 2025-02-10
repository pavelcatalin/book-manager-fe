<script setup>
import { onMounted } from "vue";
import { useBookStore } from "../services/bookStore.ts";
import { storeToRefs } from "pinia";

const bookStore = useBookStore();
const { deleteBook, downloadFile, getBooks } = bookStore;
const { books } = storeToRefs(bookStore);

const removeBook = (id) => {
  deleteBook(id);
};

const downloadBook = (id) => {
  downloadFile(id);
};

onMounted(() => {
  getBooks();
});
</script>

<template>
  <section class="books" v-if="books.length">
    <ul>
      <li v-for="book in books" :key="book.id">
        <h3>{{ book.name }} by {{ book.author.name }}</h3>
        <button class="delete" @click="removeBook(book.id)">Delete</button>
        <button class="download" @click="downloadBook(book.id)">
          Download
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.books {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px;
  padding: 10px;
  background-color: white;
  opacity: 0.8;
  border-radius: 10px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    color: black;
  }

  button {
    margin: 0 5px;
  }

  .delete {
    padding: 5px 10px;
    background-color: #f00;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .download {
    padding: 5px 10px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
