<script setup>

let d

fFetch('https://bbs-api.miyoushe.com/post/wapi/userPost?uid=306863519').then((res) => {
    d = JSON.parse(res.response);
    console.log(d)
});


</script>

<template>



</template>