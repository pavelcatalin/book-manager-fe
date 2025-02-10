<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";

// Define a ref to track the download state (optional, for feedback)
const isDownloading = ref(false);

const downloadFile = async () => {
  try {
    // Fetch the file from the server (for example, as a Blob)
    const response = await fetch("http://localhost:8080/upload/252");

    // Get the filename from the Content-Disposition header
    const contentDisposition = response.headers.get("Content-Disposition");
    const filenameMatch =
      contentDisposition && contentDisposition.match(/filename="(.+)"/);
    let filename = filenameMatch ? filenameMatch[1] : "default-file";

    // Fetch the file content as a Blob
    const blob = await response.blob();

    // Create a URL for the Blob and trigger the download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // Set the filename with extension
    document.body.appendChild(link); // Append the link to the DOM
    link.click(); // Programmatically click the link to start the download

    // Clean up the URL object after the download
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};
</script>

<template>
  <div class="app-wrapper">
    <!-- <RouterLink to="/gridview">Grid view</RouterLink> -->
    <RouterView />
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 40px 80px;
}
</style>
