<script setup>

import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { ref } from 'vue'

const calendar_options = ref({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [

    ]
})

let date = new Date();
for (let y = 2020; y <= 2024; y++) {
    date.setFullYear(y);
    for (let m = 1; m <= 12; m++) {
        date.setMonth(m - 1);
        date.setDate(1);
        calendar_options.value.events.push({
            title: '原神深渊更新',
            date: date.toISOString().slice(0, 10)
        })
        calendar_options.value.events.push({
            title: '原神商店刷新',
            date: date.toISOString().slice(0, 10)
        })
        date.setDate(16);
        calendar_options.value.events.push({
            title: '原神深渊更新',
            date: date.toISOString().slice(0, 10)
        })
    }
}

// console.clear()
// fetch('http://localhost:62801/genshin')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         for (let event of data.data.recommended_posts) {
//             console.log(new Date(event.post.created_at*1000).toISOString().slice(0, 10))
//             calendar_options.value.events.push({
//                 title: event.post.subject,
//                 date: new Date(event.post.created_at*1000).toISOString().slice(0, 10)
//             })
//         }
//     })

</script>

<template>

    <FullCalendar :options="calendar_options" />
</template>