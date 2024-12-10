<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: '',
    },
    collection: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['close']);
const dialog = ref();
const showSlot = ref(props.show);

watch(() => props.show, () => {
    if (props.show) {
        document.body.style.overflow = 'hidden';
        showSlot.value = true;
        dialog.value?.showModal();
    } else {
        document.body.style.overflow = null;
        setTimeout(() => {
            dialog.value?.close();
            showSlot.value = false;
        }, 200);
    }
});

const close = () => {
    if (props.closeable) {
        emit('close');
    }
};

const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
        e.preventDefault();

        if (props.show) {
            close();
        }
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
});

const maxWidthClass = computed(() => {
    return {
        'sm': 'sm:max-w-sm',
        'md': 'sm:max-w-md',
        'lg': 'sm:max-w-lg',
        'xl': 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[props.maxWidth];
});
</script>

<template>
    <dialog class="z-50 m-0 min-h-full min-w-full overflow-y-auto bg-transparent backdrop:bg-transparent" ref="dialog">
        <div class="fixed flex justify-center items-center inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50"
            scroll-region>
            <transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="ease-in duration-200" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <div v-show="show" class="fixed inset-0 transform transition-all">
                    <div class="absolute inset-0 bg-gray-500 opacity-75" @click.stop="close" />
                </div>
            </transition>

            <!-- <transition enter-active-class="ease-out duration-300"
                enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"> -->
            <div v-show="show"
                class="mb-6 bg-white rounded-lg shadow-xl transform transition-all sm:w-full sm:mx-auto max-h-screen overflow-hidden"
                :class="maxWidthClass">
                <slot v-if="showSlot" />
                <div class="p-2 bg-white bg-opacity-75 text-black text-xl flex items-center justify-between absolute bottom-0 z-50 gap-8 left-1/2 transform -translate-x-1/2 w-full">
                    <div class="flex gap-2">
                        <h1 class="font-bold">Título:</h1>
                        <span class="">{{ title }}</span>
                    </div>
                    <div class="flex gap-2">
                        <h1 class="font-bold">Coleção:</h1>
                        <span class="">{{ collection }}</span>
                    </div>
                </div>
            </div>
            <!-- </transition> -->

        </div>
    </dialog>
</template>