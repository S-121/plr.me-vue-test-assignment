<template>
  <div class="container">
    <header class="jumbotron row" v-if="!isProductDetail">
      <div class="col-2">
        <Sidebar />
      </div>
      <div class="col-10">
        <div class="filter input-group mb-3"> 
          <input class="form-control" type="text" placeholder="Seaerch Product Title" v-model="search_product"/>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Title</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in filteredRows.slice(pageStart, pageStart + countOfPage)" :key="index">
              <td>{{ (currPage - 1) * countOfPage + index + 1 }}</td>
              <td>{{product.title}}</td>
              <td>{{product.brand}}</td>
              <td>{{product.category}}</td>
              <td>{{product.description}}</td>
              <td>
                <router-link :to="'/products/' + product.id">
                  <button class="btn btn-outline-info" @click="viewProductDetail(product.id)">View</button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currPage === 1 }" @click.prevent="setPage(currPage - 1)"><a class="page-link" href="">Prev</a></li>
            <li class="page-item" v-for="n in totalPage" :class="{ active: currPage === n }" @click.prevent="setPage(n)" :key="n"><a class="page-link" href="">{{ n }}</a></li>
            <li class="page-item" :class="{ disabled: currPage === totalPage }" @click.prevent="setPage(currPage + 1)"><a class="page-link" href="">Next</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <header class="jumbotron" v-if="isProductDetail">
      <p>ID : {{detailContent.id}}</p>
      <p>Title : {{detailContent.title}}</p>
      <p>Price : {{detailContent.price}}</p>
      <p>Rating : {{detailContent.rating}}</p>
      <p>Stock : {{detailContent.stock}}</p>
      <p>Brand : {{detailContent.brand}}</p>
      <p>Category : {{detailContent.category}}</p>
      <p>Description : {{detailContent.description}}</p>
      <p>DiscountPercentage : {{detailContent.discountPercentage}}</p>
      <p>Images : <span v-for="image in detailContent.images" :key="image" style="padding-right: 15px;"><img :src=image alt="" width="100"></span></p>
      <p>Thumbnail : {{detailContent.thumbnail}}</p>
      <button class="btn btn-primary" style="margin-right: 15px;" @click="addCart(detailContent)">Add to Cart</button>
      <button class="btn btn-dark" @click="back()">Back</button>
    </header>
  </div>
</template>

<script>
import ProductService from "../services/product.service";
import Sidebar from "./Sidebar.vue";

export default {
  name: "Product",
  components: {
    Sidebar,
  },
  data() {
    return {
      content: [],
      detailContent: "",
      countOfPage: 5,
      currPage: 1,
      search_product: "",
      isProductDetail: false,
    };
  },
  mounted() {
    this.$store.dispatch('product/getProduct');
  },
  computed: {
    filteredRows() {
      var search_product = this.search_product.toLowerCase();
      return ( this.search_product.trim() !== '' ) ? this.$store.state.product.products.filter(function(d){ return d.title.toLowerCase().indexOf(search_product) > -1; }) : this.$store.state.product.products;
    },
    pageStart() {
      return (this.currPage - 1) * this.countOfPage;
    },
    totalPage() {
      return Math.ceil(this.filteredRows.length / this.countOfPage);
    }
  },
  methods: {
    setPage(idx) {
      if( idx <= 0 || idx > this.totalPage ){
        return;
      }
      this.currPage = idx;
    },
    viewProductDetail(productId) {
      this.isProductDetail = true;
      ProductService.getProductDetail(productId).then(
        (response) => {
          if(response.data) {
            this.detailContent = response.data;
          }
        },
        (error) => {
          this.detailContent = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        }
      );
    },
    back() {
      this.isProductDetail = false;
      this.$router.go(-1);
    },
    addCart(data) {
      this.$store.dispatch('cart/addProduct', data);
    }
  },
};
</script>
