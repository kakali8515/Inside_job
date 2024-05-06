<template>    
    <div class="no-data-content">
        <slot name="no-data-image"> </slot>        
        <slot name="no-data-content"> </slot> 
    </div>
 </template>
 
 <script>
 export default {
     name: 'NoData',
 }
 </script>