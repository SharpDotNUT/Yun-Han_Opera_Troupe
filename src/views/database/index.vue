
<script setup lang="js">

import Data from '../../data/characters/CHS/10000064.json'
const data = Data
</script>

<template>
    <h1>{{data.Name}}</h1>
    <h2>{{data.FetterInfo.Title}}</h2>
    <p>{{data.Description}}</p>
    <p>
        <span>所属</span>
        <var-chip>{{data.FetterInfo.Native}}</var-chip>
        <span>ming'zhi'zhuomingzhizhuo</span>
    </p>
    <var-table>
        <table>
            <tr>
                <th>中文配音</th>
                <td>{{data.FetterInfo.CvChinese}}</td>
            </tr>
            <tr>
                <th>日文配音</th>
                <td>{{data.FetterInfo.CvJapanese}}</td>
            </tr>
            <tr>
                <th>英文配音</th>
                <td>{{data.FetterInfo.CvEnglish}}</td>
            </tr>
            <tr>
                <th>韩文配音</th>
                <td>{{data.FetterInfo.CvKorean}}</td>
            </tr>
        </table>
    </var-table>
    <div>
        <div v-for="item in data.FetterInfo.Fetters">
            <h3>{{item.Title}}</h3>
            <p>{{item.Context}}</p>
        </div>
    </div>
</template>