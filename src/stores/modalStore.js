import { defineStore } from 'pinia';

export const useModalStore = defineStore('modalStore', {
  state: () => ({
    showModal: false,
    selectedImage: '',
    selectedTitle: '', // Adiciona título
    selectedCollection: '', // Adiciona coleção
  }),
  actions: {
    openModal(image, title, collection) {
      this.selectedImage = image;
      this.selectedTitle = title;
      this.selectedCollection = collection;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedImage = '';
      this.selectedTitle = '';
      this.selectedCollection = '';
    },
  },
});
