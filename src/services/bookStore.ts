import axios from "axios";
import { defineStore } from "pinia";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const useBookStore = defineStore("book", {
  state: () => ({ books: [], error: "", status: null }),
  actions: {
    async getBooks() {
      this.error = "";
      try {
        const response = await axios.get(`${apiUrl}/books`);
        this.books = await response.data;
      } catch (error) {
        this.error = error;
      }
    },
    async addBook(formData: FormData) {
      this.status = null;
      try {
        const response = await axios.post(`${apiUrl}/books`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.status = response.status;
      } catch (error) {
        console.error("Error uploading the file:", error);
        alert("File upload failed.");
      }
    },
    async deleteBook(id: number) {
      this.status = null;
      try {
        const response = await axios.delete(`${apiUrl}/books/${id}`);
        if (response.status === 200) {
          this.books = this.books.filter((book) => book.id !== id);
        }
      } catch (error) {
        console.error("Error deleting the book:", error);
        alert("Book deletion failed.");
      }
    },

    async downloadFile(id: number) {
      this.status = null;
      try {
        const response = await axios.get(`${apiUrl}/books/${id}/download`);

        const contentType = response.headers["content-type"];
        const contentDisposition = response.headers["content-disposition"];

        let filename = "downloaded-file";
        if (contentDisposition) {
          const match = contentDisposition.match(/filename="?([^"]+)"?/);
          if (match) filename = match[1];
        }

        const blob = new Blob([response.data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading the book:", error);
        alert("Book download failed.");
      }
    },
  },
});
