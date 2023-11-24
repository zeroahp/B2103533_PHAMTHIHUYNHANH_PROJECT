<template>
  <Form
    class="bg-form"
    @submit="submitProduct"
    :validation-schema="productFormSchema"
  >
    <div class="container create">
      <form class="create-page" action="">
        <div class="form-group">
          <label for="title"> Tên sản phẩm </label>
          <Field
            name="title"
            type="text"
            class="form-control"
            v-model="productLocal.title"
          />
          <ErrorMessage name="title" class="error-feedback" />
        </div>

        <!-- category -->
        <div class="title-radio">Danh mục</div>
        <div class="form-radio">
          <div class="form-group form-check form-check-inline">
            <input
              type="radio"
              class="form-check-input"
              id="flower"
              name="category"
              value="Hoa Tươi"
              :checked="productLocal.category === 'flower'"
              v-model="productLocal.category"
            />
            <label for="flower" class="form-check-label"> Hoa Tươi </label>
          </div>
          <div class="form-group form-check form-check-inline">
            <input
              type="radio"
              class="form-check-input"
              id="gift"
              name="category"
              value="Set Quà"
              :checked="productLocal.category === 'gift'"
              v-model="productLocal.category"
            />
            <label for="gift" class="form-check-label"> Set Quà </label>
          </div>

          <div class="form-group form-check form-check-inline">
            <input
              type="radio"
              class="form-check-input"
              id="handmade"
              name="category"
              value="Đồ Handmade"
              :checked="productLocal.category === 'handmade'"
              v-model="productLocal.category"
            />
            <label for="handmade" class="form-check-label"> Đồ Handmade </label>
          </div>
          <div class="form-group form-check form-check-inline">
            <input
              type="radio"
              class="form-check-input"
              id="noen"
              name="category"
              value="Noen"
              :checked="productLocal.category === 'noen'"
              v-model="productLocal.category"
            />
            <label for="noen" class="form-check-label"> Noen </label>
          </div>
        </div>

        <!--End  category -->
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

        
        <div class="title-radio">Trạng thái</div>
        <div class="form-radio">
          <div class="form-group form-check form-check-inline">
            <input
              type="radio"
              class="form-check-input"
              id="statusActive"
              name="status"
              value="Hoạt động"
              :checked="productLocal.status === 'active'"
              v-model="productLocal.status"
            />
            <label for="statusActive" class="form-check-label">
              Hoạt động
            </label>
          </div>
          <div class="form-group form-check form-check-inline">
            <input
              type="radio"
              class="form-check-input"
              id="statusInactive"
              name="status"
              value="Ngừng hoạt động"
              :checked="productLocal.status === 'inactive'"
              v-model="productLocal.status"
            />
            <label for="statusInactive" class="form-check-label">
              Ngừng hoạt động
            </label>
          </div>
        </div>

        <!-- feature -->
        <div class="title-radio">Nổi bật</div>
        <div class="form-radio">
          <div class="form-group form-check form-check-inline">
            <input
              type="radio"
              class="form-check-input"
              id="featureTrue"
              name="feature"
              value="true"
              :checked="productLocal.feature === 'true'"
              v-model="productLocal.feature"
            />
            <label for="featureTrue" class="form-check-label">
              Nổi bật
            </label>
          </div>
          <div class="form-group form-check form-check-inline">
            <input
              type="radio"
              class="form-check-input"
              id="featureTrue"
              name="feature"
              value="false"
              :checked="productLocal.feature === 'false'"
              v-model="productLocal.feature"
            />
            <label for="statusInactive" class="form-check-label">
              Không
            </label>
          </div>
        </div>

        <div class="form-btn">
          <button @click="submitProduct" type="submit" class="btn btn-primary">
            Cập nhật
          </button>
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
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  emits: ["submit:product"],
  data() {
    const productFormSchema = yup.object().shape({
      title: yup
        .string()
        .required("Tiêu đề phải có giá trị.")
        .min(2, "Tiêu đề phải ít nhất 2 ký tự.")
        .max(50, "Tiêu đề có nhiều nhất 50 ký tự."),
      price: yup
        .number()
        .positive("Giá tiền phải là lớn hơn 0.")
        .required("Giá tiền phải có giá trị."),
      discountPercentage: yup.number().required("Giảm giá ít nhất là 0."),
    });

    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      productLocal: this.product,
      productFormSchema,
      image: this.product.thumbnail,
    };
  },

  methods: {
    submitProduct(event) {
      event.preventDefault();
      this.$emit("submit:product", this.productLocal);
    },
    setDefaultValueIfEmpty() {
      if (this.productLocal.discountPercentage === "") {
        this.productLocal.discountPercentage = 0;
      }
    },
  },
};
</script>

<style>
.admin-create a {
  background-color: #e5bc37;
  padding: 6px;
  border-radius: 5px;
  color: white;
  box-shadow: 1px 2px 2px #9e9e9e;
}

.form-radio {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.title-radio {
  font-weight: 600;
  margin-bottom: 10px;
}

.form-btn {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-btn button {
  background-color: #515151;
  border: 2px solid #515151;
}

.form-btn button:hover {
  background-color: white;
  color: #515151;
  border-color: #515151;
}
</style>