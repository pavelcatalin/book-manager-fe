import { defineStore } from "pinia";
import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const useAuthorStore = defineStore("author", {
  state: () => ({
    authors: [],
    error: "",
    status: null,
  }),
  actions: {
    async getAuthors() {
      this.error = "";
      try {
        const response = await axios.get(`${apiUrl}/author`);
        this.authors = await response.data;
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    },
    async addAuthor(formData: FormData) {
      this.error = "";
      try {
        const response = await axios.post(`${apiUrl}/author`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        this.status = response.status;
        console.log(this.status);

        if (this.status === 201) {
          this.authors = [...this.authors, response.data];
        }
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    },
  },
});
