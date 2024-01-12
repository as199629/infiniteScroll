<template>
  <v-container class="bg-surface-variant">
    <div class="center">此專案使用{{ gitAcc }}為拉取對象</div>
    <v-card
      v-for="repo in repositories"
      :key="repo.id"
      width="auto"
      height="80"
      :title="repo.name"
      :subtitle="repo.html_url"
      :href="repo.html_url"
      class="mb-5"
      target="_blank"
    />
    <div ref="scrollObserver" />
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import _ from 'lodash'; // 引入 Lodash
const instance = getCurrentInstance();
const repositories = ref([]); // 存放所有的存储库信息
const displayedRepositories = ref([]); // 顯示的存儲庫信息
const repositoriesPerPage = 10; // 每次載入的存儲庫數
const currentPage = ref(1); // 目前頁碼
const loading = ref(false); // 加載狀態標誌位
const gitAcc = 'schacon'; //git使用者帳號
const fetchRepositories = async () => {
  if (loading.value) return; // 如果正在加載，則不執行
  loading.value = true; // 設置為正在加載
  try {
    const response = await fetch(
      `https://api.github.com/users/${gitAcc}/repos?per_page=${repositoriesPerPage}&page=${currentPage.value}`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    repositories.value = [...repositories.value, ...data];
    currentPage.value++;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false; // 加載完成後重置為false
  }
};

// 使用 Lodash 的節流函數，限制频率
const handleThrottledScroll = _.throttle(() => {
  const observer = instance.refs.scrollObserver;
  const scrollPos = window.scrollY + window.innerHeight;
  const observerTop = observer.offsetTop;
  const observerHeight = observer.offsetHeight;

  if (scrollPos >= observerTop + observerHeight * 0.9) {
    fetchRepositories();
  }
}, 200); // 設置時間間隔

onMounted(() => {
  fetchRepositories();
  window.addEventListener('scroll', handleThrottledScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleThrottledScroll);
});
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
</style>
