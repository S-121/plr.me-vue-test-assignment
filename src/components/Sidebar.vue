<template>
  <button type="button" class="btn btn-light" @click="sort()">sort</button>
  <ul class="navbar-nav" id="navAccordion">
    <li class="nav-item">
      <router-link to="/products" class="nav-link">
        <a class="nav-link" href="#" @click="selectCategory('all')">All</a>
      </router-link>
    </li>
    <li class="nav-item" v-for="item in this.$store.state.product.categoryNames" :key="item">
      <router-link :to="'/products/' + item" class="nav-link">
        <a class="nav-link" href="#" @click="selectCategory(item)">{{item}}</a>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  dadta() {
    return {
      issort: "asc"
    }
  },
  methods: {
    sort() {
      this.$store.state.product.categoryNames.sort();
      if (this.issort == "asc") {
        this.issort = "desc";
      } else {
        this.$store.state.product.categoryNames.reverse();
        this.issort = "asc";
      }
    },
    selectCategory(data) {
      this.$store.dispatch('product/selectedCategory', data);
    }
  }
};
</script>
