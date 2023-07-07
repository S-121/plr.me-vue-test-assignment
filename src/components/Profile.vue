<template>
  <div class="container">
    <div class="jumbotron" v-if="currentUser">
      <div v-if="!isEdit">
        <img :src=currentUser.image alt="" width="200"><br /><br />
        <p>First Name: {{ currentUser.firstName }}</p>
        <p>Last Name: {{ currentUser.lastName }}</p>
        <p>Email: {{ currentUser.email }}</p>
        <p>Username: {{ currentUser.username }}</p>
        <p>Gender: {{ currentUser.gender }}</p>
        <button class="btn btn-primary" @click="edit()">Edit</button>
      </div>
      <div v-if="isEdit">
        <!-- <img :src=currentUser.image alt="" width="200"> -->
        <Form @submit="handleProfile" :validation-schema="schema">
          <div class="form-group">
            <Field name="id" type="hidden" :value=currentUser.id class="form-control" />
          </div>
          <div class="form-group">
            <Field name="token" type="hidden" :value=currentUser.token class="form-control" />
          </div>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <Field name="firstName" type="text" :value=currentUser.firstName class="form-control" />
            <ErrorMessage name="firstName" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <Field name="lastName" type="text" :value=currentUser.lastName class="form-control" />
            <ErrorMessage name="lastName" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" :value=currentUser.email class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <Field name="username" type="text" :value=currentUser.username class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="gender">Gender</label>
            <Field name="gender" type="text" :value=currentUser.gender class="form-control" />
            <ErrorMessage name="gender" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Save</span>
            </button>
          </div>

          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UserService from "../services/user.service";

export default {
  name: 'Profile',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      firstName: yup.string().required("First Name is required!"),
      lastName: yup.string().required("Last Name is required!"),
      email: yup.string().required("Email is required!"),
      username: yup.string().required("Username is required!"),
      gender: yup.string().required("Gender is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
      isEdit: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    handleProfile(user) {
      this.loading = true;

      UserService.updateProfile(user).then(
        (response) => {
          if (response) {
            this.$store.state.auth.user = response;
            this.loading = false;
            this.isEdit = false;
          }
        },
        (error) => {
          this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        }
      );
    },
    edit() {
      this.isEdit = true;
    }
  },
};
</script>

<style>
.error-feedback {
  color: red;
}
</style>