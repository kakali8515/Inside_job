<template>
    <HeaderSearch />


    <half-circle-spinner v-if="loading" :animation-duration="700" :size="30" color="#E50023" />

    <button @click="openSheet">
        Open Sheet
    </button>

    <Sheet maxWidth="768px" height="100%" v-slot="{ closeSelf }" v-model:visible="isOpen">
        <button @click="closeSelf()">Close</button>
    </Sheet>
    <div class="common-sec back-wh">
        <div class="container p-0">
            <div class="home-slider-wrap">
                <pull-refresh v-model="loading" @refresh="onRefresh" pulling-text="pulling..."
                    loosing-text="loosing text.." loading-text="Loading.." success-text="Success">
                    <p>refresh Count: {{ count }}</p>
                    <ul>
                        <li v-for="i in 20" :key="i">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                            quibusdam, quod illo blanditiis repudiandae quia quis fugit? Blanditiis, eius ut laborum
                            illo,
                            consectetur, reprehenderit molestias veritatis officia quod accusantium quam?</li>
                    </ul>
                </pull-refresh>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import HeaderSearch from '@/components/HeaderSearch.vue';
import { Sheet } from 'bottom-sheet-vue3';
export default {
    name: "HomeWithsheet",
    components: { HeaderSearch, Sheet },
    setup() {
        const count = ref(0);
        const loading = ref(false);
        const onRefresh = () => {
            console.log('refresh');
            setTimeout(() => {
                loading.value = false;
                count.value++;
            }, 1000);
        };

        return {
            count,
            loading,
            onRefresh
        };
    },
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        openSheet() {
            this.isOpen = true;
        }
    },
};
</script>

<style lang="scss" scoped>
.half-circle-spinner,
.half-circle-spinner * {
    box-sizing: border-box;
}

.half-circle-spinner {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    position: relative;
}

.half-circle-spinner .circle {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: calc(60px / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
    border-top-color: #ff1d5e;
    animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
    border-bottom-color: #ff1d5e;
    animation: half-circle-spinner-animation 1s infinite alternate;
}

@keyframes half-circle-spinner-animation {
    0% {
        transform: rotate(0deg);

    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
