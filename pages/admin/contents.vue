<template>
    <div class="admin-contents" id="adminContents">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row mt-4">
                <div class="col-12 mb-4">
                    <div class="row justify-content-between">
                        <h3 class="col-md-3">
                            İçerikler
                            <NuxtLink :to="`/admin/add-contents`" id="addContents"
                                class="float-right text-secondary ml-3">
                                <small>+ Ekle</small>
                            </NuxtLink>
                        </h3>
                        <b-form-group class="col-md-3" id="category_group" label="" label-for="category_input"
                            description="">
                            <b-form-select v-model="selectedCategory" name="contentsCategory"
                                @change="getContentsByAdmin">
                                <b-form-select-option value="all" selected>Tümü</b-form-select-option>
                                <b-form-select-option v-for="(CC, index) in contents_categories"
                                    :key="`contents_categories${index}`" :value="CC.id">{{ CC.category_name }}
                                </b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </div>

                    <table class="table table-sm" id="adminContentsTable">
                        <thead class="table-secondary">
                            <tr>
                                <th>Başlık</th>
                                <th>Kısa Açıklama</th>
                                <th>Kategori</th>
                                <th>Tarih</th>
                                <th>Ekleyen</th>
                                <th>Seo Title</th>
                                <th>Seo Link</th>
                                <th>Durum</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(C, index) in contents" :key="`bodyContents${index}`">
                                <td>{{ C.subject }}</td>
                                <td>{{ C.short_description }}</td>
                                <td>{{ C.category_name }}</td>
                                <td>{{ C.saved_date | dateFormat }}</td>
                                <td>{{ C.saved_by }}</td>
                                <td>{{ C.seo_title }}</td>
                                <td>{{ C.seo_link }}</td>
                                <td>
                                    <span class="switch" :class="[C.is_active == 1 ? 'active' : 'passive']"
                                        @click="changeContentsStatus(C)"></span>
                                </td>
                                <td>
                                    <NuxtLink :to="`/admin/contents-detail/${C.id}`" id="contentsEdit"
                                        class="btn btn-sm btn-outline-primary px-4">
                                        Düzenle
                                    </NuxtLink>
                                </td>
                                <td>
                                    <a :href="`/${C.seo_link}`" target="_blank"
                                        class="btn btn-sm btn-outline-secondary px-4">
                                        Git
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default
    {
        name: 'AdminIcerik',
        layout: 'admin',
        middleware: 'adminAuthenticated',
        head() {
            return {
                title: "Admin İçerik Sayfası"
            }
        },
        data() {
            return {
                pageLoading: false,
                contents: [],
                contents_categories: [],
                selectedCategory: 'all'
            }
        },
        props: {

        },
        methods: {
            async changeContentsStatus(contents) {
                var _this = this;
                var token = _this.$cookiz.get("admintoken");
                _this.$store.dispatch('postService', { "data": { id: contents.id, is_active: !contents.is_active }, "urlParameter": "/api/v1/contents/updateStatus", "token": token })
                    .then(response => {
                        contents.is_active = !contents.is_active;
                    });
            },
            async getContentsByAdmin() {
                var _this = this;
                _this.$repositories.content.getAllContent(_this.selectedCategory)
                .then(res => {
                    _this.contents = res.data.response
                })
                .catch(err => {
                });
            },
            async getContentCategoriesByAdmin() {
                var _this = this;
                _this.$repositories.content.getAllContentCategory()
                .then(res => {
                    _this.contents_categories = res.data.response
                })
                .catch(err => {
                });
            }
        },
        async created() {
            this.getContentsByAdmin();
            this.getContentCategoriesByAdmin();
        }
    }
</script>

<style>
</style>
