<script lang="ts" setup>

const path = 'https://yunhan-oss.oss-cn-hongkong.aliyuncs.com/TextMapCHS.json'

// caches.open("dictionary").then((cache) => {
//     cache.add(path).then(() => {
//         console.log('add success')
//     })
// })

caches.open("dictionary").then((cache) => {
  cache.match(path).then((response) => {
      response?.json().then((data) => {
          console.log(data[5532])
      })
  })
});

</script>

<template>


</template>