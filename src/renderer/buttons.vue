<template>
    <div>
        <button v-on:click="compareImages">
        비교
        </button>
        <button v-on:click="exportImages">
        추출
        </button>
        <button v-on:click="importImages">
        입력
        </button>
    </div>    
</template>

<script>
export default {
    name: 'buttons',
    data () {
        return {
            message: '',
        }
    },
    methods: {
        compareImages: function () {
            console.log('compareImages');   
            compareImages();
        },
        exportImages: function () {
            console.log('exportImages');   
            exportImages();
        },
        importImages: function () {
            console.log('importImages');   
            importImages();
        },
    }
}
</script>