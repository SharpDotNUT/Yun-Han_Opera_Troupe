<script setup>
import { ref } from "vue";
import WordsPath from "./words.json?url";
import { Dialog } from "@varlet/ui";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let Words = []
caches.open("dictionary").then((cache) => {
  cache.match(WordsPath).then(async (res) => {
    if (res) {
      res.json().then((data) => {
        Words = data;
        Words_loaded = true;
        load()
        search();
      });
    } else {
      const res = await fetch(WordsPath);
      cache.put(WordsPath, res.clone());
      res.json().then((data) => {
        Words = data;
        Words_loaded = true;
        load()
  search();
      })
    }
  });
});

let Words_loaded = false;
let searchString = ref("");
let pre_words = ref([]);
let words = ref([]);
let ref_words = ref({});
const load = () => {
  words.value = pre_words.value.slice(0, words.value.length + 100);
};

const search = () => {
  if (!Words_loaded) {
    return;
  }
  console.log(Words.length);
  pre_words.value = Words.filter((word) => {
    let _ = false;
    if (word.zhCN) {
      _ = word.zhCN.includes(searchString.value);
    }
    if (word.en) {
      _ = _ || word.en.includes(searchString.value);
    }
    if (word.ja) {
      _ = _ || word.ja.includes(searchString.value);
    }
    return _;
  });
  load();
};

function showInfo(word) {
  Dialog({
    title:t('dictionary.more-info'),
    message: JSON.stringify(word),
    cancelButton:false
  })
}

</script>

<template>
  <var-input
    variant="outlined"
    v-model="searchString"
    :placeholder="$t('dictionary.search-text')" />
    <br/>
  <var-button @click="search" type="default" block>{{$t('dictionary.search')}}</var-button>
  <var-list @load="load">
    <div
      v-for="word in words"
      :key="word.id"
      style="padding: 10px; display: flex; flex-direction: column; gap: 10px">
      <div class="word" :ref="(el) => (ref_words[word.id] = el)">
        <h5>{{ $t('dictionary.zh-cn') }}</h5>
        <p class="lang-zh">{{ word.zhCN }}</p>
        <h5>{{ $t('dictionary.en') }}</h5>
        <p class="lang-en">{{ word.en }}</p>
        <h5 class="lang-ja">{{ $t('dictionary.ja') }}</h5>
        <p class="lang-ja">
          <ruby
            >{{ word.ja }}<rt>{{ word.pronunciationJa }}</rt>
          </ruby>
        </p>
        <var-button @click="showInfo(word)">{{ $t('dictionary.view-more-info') }}</var-button>
      </div>
      <hr />
    </div>
  </var-list>
</template>

<style scoped>
.word {
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
