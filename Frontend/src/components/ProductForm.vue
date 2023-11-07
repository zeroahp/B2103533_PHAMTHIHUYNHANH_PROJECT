<template>
  <Form 
   class="bg-form"
    @submit="submitProduct"
    :validation-schema="productFormSchema"
  >
    <div class="container create">
      <form class="create-page" action="">
        <div class="form-group">
          <label for=""> Tiêu đề </label>
          <Field
            name="title"
            type="text" 
            class="form-control"
            v-model="productLocal.title"
          />
          <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="desc"> Mô tả </label>
          <textarea
            type="text"
            class="form-control"
            id="desc"
            name="description"
            row="5"
            v-model="productLocal.description"
          />
        </div>
        <div class="form-group">
          <label for="price"> Giá bán </label>
          <Field 
            type="number" 
            class="form-control" 
            id="price" 
            name="price" 
            v-model="productLocal.price"
          />
          <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="discountPercentage"> Giảm giá</label>
          <Field 
            type="number" 
            class="form-control" 
            id="discountPercentage" 
            name="discountPercentage" 
            v-model="productLocal.discountPercentage"
            @input="setDefaultValueIfEmpty"
          />
          <ErrorMessage name="discountPercentage" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="stock"> Số lượng </label>
          <input
            type="number"
            class="form-control"
            id="stock"
            name="stock"
            min="0"
            v-model="productLocal.stock"
          />
        </div>
        <div class="form-group">
          <label for="thumbnail"> Ảnh </label>
          <input
            type="text"
            class="form-control"
            id="thumbnail"
            name="thumbnail"
            v-model="productLocal.thumbnail"
          />
        </div>
        <div class="form-group">
          <label for="position"> Vị trí </label>
          <input
            type="number"
            class="form-control"
            id="position"
            name="position"
            v-model="productLocal.position"
          />
        </div>
        <div class="form-group form-check form-check-inline">
          <input
            type="radio"
            class="form-check-input"
            id="statusActive"
            name="status"
            value="Active"
            checked
            v-model="productLocal.status"            
          />
          <label for="statusActive" class="form-check-label"> Hoạt động </label>
        </div>
        <div class="form-group form-check form-check-inline">
          <input
            type="radio"
            class="form-check-input"
            id="statusInactive"
            name="status"
            value="Inactive"
            checked
            v-model="productLocal.status"
          />
          <label for="statusInactive" class="form-check-label">
            Ngừng hoạt động
          </label>
        </div>
        <div class="form-group">
          <button @click="submitProduct" type="submit" class="btn btn-primary" >Cập nhật</button>
        </div>
      </form>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
    Form,
    Field,
    ErrorMessage,
  },
  props :{
    product : {
        type : Object,
        required : true
    }
  }, 
  emits :[
    "submit:product"
  ],
  data() {
    const productFormSchema = yup.object().shape({
      title: yup.string()
        .required("Tiêu đề phải có giá trị.")
        .min(2, "Tiêu đề phải ít nhất 2 ký tự.")
        .max(50, "Tiêu đề có nhiều nhất 50 ký tự."),
      price: yup.number()
        .positive("Giá tiền phải là lớn hơn 0.")
        .required("Giá tiền phải có giá trị."),
      discountPercentage: yup.number()
        .required("Giảm giá ít nhất là 0."),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      productLocal: this.product,
      productFormSchema,
    };
  },

  methods :{
    submitProduct(){
      event.preventDefault();
      this.$emit("submit:product", this.productLocal);
    },
    setDefaultValueIfEmpty() {
      if (this.productLocal.discountPercentage === "") {
        this.productLocal.discountPercentage = 0;
      }
  },

  }
};
</script>