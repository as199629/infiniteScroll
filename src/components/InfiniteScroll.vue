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
    console.log(response);
    console.log(data);
    repositories.value = [...repositories.value, ...data];
    currentPage.value++;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false; // 加載完成後重置為false
  }
};

const fetchTopUserWithMostRepos = async () => {
  try {
    const response = await fetch(
      'https://api.github.com/search/users?q=type:user&sort=repositories&order=desc&page=1&per_page=1',
    );
    if (!response.ok) {
      throw new Error('Failed to fetch top user');
    }
    const { items } = await response.json();
    const topUser = items[0];
    if (topUser) {
      await fetchRepositories(topUser.login);
    }
  } catch (error) {
    console.error(error);
  }
};

const handleScroll = () => {
  const observer = instance.refs.scrollObserver;
  const scrollPos = window.scrollY + window.innerHeight; //停留卷軸長度
  const observerTop = observer.offsetTop; //總卷軸長度
  if (scrollPos >= observerTop) fetchRepositories();
};

onMounted(() => {
  fetchRepositories();

  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
</style>
