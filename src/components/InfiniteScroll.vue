<template>
  <v-container class="bg-surface-variant">
    <v-card
      v-for="user in users"
      :key="user.id"
      width="auto"
      height="80"
      :title="user.login"
      :subtitle="user.html_url"
      class="mb-5"
    />
    <div ref="scrollObserver" />
  </v-container>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
  const instance = getCurrentInstance();
  const users = ref([]); // 存放所有的使用者資料
  const displayedUsers = ref([]); // 顯示的使用者資料
  const usersPerPage = 10; // 每次載入的使用者數
  const currentPage = ref(1); // 目前頁碼
  const loading = ref(false); // 加載狀態標誌位

  const fetchUsers = async () => {
    if (loading.value) return; // 如果正在加載，則不執行
    loading.value = true; // 設置為正在加載
    try {
      const response = await fetch(
        `https://api.github.com/users?per_page=${usersPerPage}&since=${currentPage.value}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      users.value = [...users.value, ...data];
      currentPage.value++;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false; // 加載完成後重置為false
    }
  };

  const handleScroll = () => {
    const observer = instance.refs.scrollObserver;
    const scrollPos = window.scrollY + window.innerHeight;
    const observerTop = observer.offsetTop;
    const observerHeight = observer.offsetHeight;

    if (scrollPos >= observerTop + observerHeight * 0.9) {
      if (displayedUsers.value.length < users.value.length) {
        fetchUsers();
      }
    }
  };

  onMounted(() => {
    fetchUsers();

    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>
