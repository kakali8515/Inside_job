<template>
    <div class="pr-box-innr">
        <slot name="cr-date"></slot>
        <slot name="cr-title"></slot>
        <slot name="cr-link"></slot>
        <slot name="edit"></slot>
    </div>   
</template> 


<script>
    export default {
        name: "CareerCard",
    };
</script>