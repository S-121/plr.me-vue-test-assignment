<template>
  <div class="container">
    <header class="jumbotron">      
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Rating</th>
            <th scope="col">Stock</th>
            <th scope="col">Category</th>
            <th scope="col">Brand</th>
          </tr>
        </thead>
        <tbody v-for="cart in this.$store.state.cart.addedProducts" :key="cart">
          <tr>
            <td>{{ cart.title }}</td>
            <td>{{ cart.price }}</td>
            <td>{{ cart.rating }}</td>
            <td>{{ cart.stock }}</td>
            <td>{{ cart.category }}</td>
            <td>{{ cart.brand }}</td>
          </tr>
        </tbody>
      </table>
    </header>
  </div>
</template>

<script>
export default {
  name: "Cart",
};
</script>
