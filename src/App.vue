<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand"></a>
      <div class="navbar-nav mr-auto">
        <li v-if="currentUser" class="nav-item">
          <router-link to="/" class="nav-link">
            Home
          </router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/profile" class="nav-link">
            Profile
          </router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/products" class="nav-link">
            Products
          </router-link>
        </li>
        <li v-if="currentUser" class="nav-item">
          <router-link to="/cart" class="nav-link">
            Cart
            <span class="badge badge-light" v-if="this.$store.state.cart.addedProducts.length == 0"></span>
            <span class="badge badge-light" v-if="this.$store.state.cart.addedProducts.length > 0">{{ this.$store.state.cart.addedProducts.length }}</span>
          </router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut" style="cursor: pointer;">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
