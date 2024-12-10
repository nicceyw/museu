<script setup>
import { ref } from 'vue';

const isPlaying = ref(false);
const currentMusicName = ref('Numb to the Feeling'); // Nome inicial da música
const audio = ref(new Audio('sounds/numb_to_the_feeling.mp3')); // Caminho inicial da música
audio.value.loop = true;

const togglePlay = () => {
    if (isPlaying.value) {
        audio.value.pause();
    } else {
        audio.value.play();
    }
    isPlaying.value = !isPlaying.value;
};

const adjustVolume = (event) => {
    audio.value.volume = event.target.value / 100;
};

// Modal para alterar música
const showModal = ref(false);
const musicList = [
    { name: 'I Like The Way You Kiss Me', path: 'sounds/i_like_the_way_you_kiss_me.mp3' },
    { name: 'Nights Like This', path: 'sounds/nights_like_this.mp3' },
    { name: 'Numb to the Feeling', path: 'sounds/numb_to_the_feeling.mp3' },
];
const selectMusic = (music) => {
    audio.value.src = music.path; // Altera a fonte do áudio
    audio.value.play();
    isPlaying.value = true; // Garante que a música comece a tocar
    currentMusicName.value = music.name; // Atualiza o nome da música
    showModal.value = false; // Fecha o modal
};
</script>

<template>
    <div class="fixed bottom-4 left-4 bg-white bg-opacity-75 p-3 rounded shadow-lg flex items-center gap-4">
        <!-- Exibir o nome da música que está tocando -->
        <div class="flex flex-col gap-2 items-center">
            <span class="font-bold">{{ currentMusicName }} &#xf001;</span>
            <div class="flex items-center gap-6">
                <button @click="showModal = true" class="p-2 bg-gray-500 text-white rounded shadow">Alterar</button>
                <input type="range" min="0" max="100" value="50" @input="adjustVolume" class="w-32" title="Volume" />
                <button @click="togglePlay" class="p-2 bg-purple-500 text-white rounded shadow">
                    {{ isPlaying ? 'Pause' : 'Play' }}
                </button>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-lg p-4 w-96" @click.stop>
            <h2 class="text-lg font-bold mb-4">Escolha uma música</h2>
            <ul class="space-y-3">
                <li v-for="music in musicList" :key="music.name" class="flex justify-between items-center">
                    <span class="font-bold">{{ music.name }}</span>
                    <button class="font-bold bg-purple-500 text-white py-1 px-2 rounded"
                        @click.stop="selectMusic(music)">Selecionar</button>
                </li>
            </ul>
            <button @click="showModal = false" class="mt-4 bg-red-500 text-white rounded p-2 w-full">Fechar</button>
        </div>
    </div>
</template>

<style scoped>
button {
    cursor: pointer;
}
</style>
