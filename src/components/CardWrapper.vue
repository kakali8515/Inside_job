<template>
    <a href="javascript:void(0);" class="slider-wrap">
        <slot name="image"> </slot>
        <div class="slider-content">
            <slot name="content"> </slot>
            <div class="btm-content">
                <slot name="btn"> </slot>
            </div>
            <slot name="bookmark"> </slot>
        </div>
    </a>
</template>


<script>
    export default {
        name: 'CardWrapper',
    }
</script>
