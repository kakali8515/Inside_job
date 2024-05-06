<template>    
    <div class="list-content">
        <slot name="employ-contract-heading"> </slot>        
        <div class="info">
            <slot name="employ-contract-contant"> </slot>    
        </div>
    </div>
 </template>
 
 <script>
 export default {
     name: 'EmploymentContractCard',
 }
 </script>