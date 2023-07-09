<template>
    <div class="admin-blog" id="adminBlog">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row mt-4">
                <div class="col-12 mb-4">
                    <h3 class="mb-4">
                        Makaleler
                        <NuxtLink :to="`/admin/add-blog`" id="addBlog" class="float-right text-secondary">
                            <small>+ Ekle</small>
                        </NuxtLink>
                    </h3>
                    <div class="row">
                        <b-form-group class="col-3 mb-3" id="categories_group" label="Kategori"
                            label-for="categories_input" description="">
                            <v-select v-model="search.categories" placeholder="Kategori seç" multiple :options="categories" label="category_name" :reduce="c => c.id"></v-select>
                        </b-form-group>

                        <b-form-group class="col-3 mb-3" id="search_text_group" label="Konu veya İçerik"
                            label-for="search_text_input" description="">
                            <b-form-input class="border-dark"
                                id="search_text_input" v-model="search.text" type="text" name="text" placeholder="Konu veya içerik içinde ara"></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-2 mb-3" id="status_group" label="Durum"
                            label-for="status_input" description="">
                            <v-select v-model="search.status" placeholder="Aktif/Pasif seç" :options="statusData" label="name" :reduce="s => s.value"></v-select>
                        </b-form-group>

                        <b-form-group class="col-1 mb-3" id="search_group" label="Ara"
                            label-for="search_input" description="">
                            <button class="w-100 btn btn-success btn-sm py-1 d-flex align-items-center justify-content-center" @click="getBlogByAdmin">
                                <b-icon icon="search" variant="white" class="mr-1" scale=".8"></b-icon>
                                Ara
                            </button>
                        </b-form-group>
                    </div>
                    <table class="table table-sm" id="adminBlogsTable">
                        <thead>
                            <tr>
                                <th>Başlık</th>
                                <th>Kısa Açıklama</th>
                                <th>Tarih</th>
                                <th>Ekleyen</th>
                                <th>Seo Title</th>
                                <th>Seo Açıklama</th>
                                <th>Durum</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(B, index) in blogs" :key="`bodyBlog${index}`">
                                <td>{{ B.subject }}</td>
                                <td>{{ B.short_description }}</td>
                                <td>{{ B.createdAt | dateFormat }}</td>
                                <td>{{ B.created_user_name }}</td>
                                <td>{{ B.seo_title }}</td>
                                <td>{{ B.seo_description }}</td>
                                <td>
                                    <span class="switch" :class="[B.is_active == 1 ? 'active' : 'passive']"
                                        @click="changeBlogStatus(B)"></span>
                                </td>
                                <td>
                                    <NuxtLink :to="`/admin/blog-detail/${B.id}`" id="blogsEdit"
                                        class="btn btn-sm btn-outline-primary px-4">
                                        Düzenle
                                    </NuxtLink>
                                </td>
                                <td>
                                    <div id="blogDelete" class="btn btn-sm btn-danger px-4" @click="deleteBlog(B.id)">
                                        Sil
                                    </div>
                                </td>
                                <td>
                                    <NuxtLink :to="`/${B.seo_link}`" id="blogDetail"
                                        class="btn btn-sm btn-outline-secondary px-4" v-if="B.is_active == 1">
                                        Git
                                    </NuxtLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="col-12 d-flex align-items-center justify-content-center">
                        <b-pagination v-model="paging.currentPage" :total-rows="paging.total" :per-page="20"
                            :first-text="'İlk'" :prev-text="'Geri'" :next-text="'İleri'"
                            :last-text="'Son'" pills>
                        </b-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default
    {
        name: 'AdminBlog',
        middleware: "adminAuthenticated",
        layout: 'admin',
        head() {
            return {
                title: "Admin Blog Sayfası"
            }
        },
        data() {
            return {
                search : {
                    categories:null,
                    text:null,
                    status:null
                },
                categories: [],
                statusData: [
                    {
                        name:'Aktif',
                        value:1
                    }, 
                    {
                        name:'Pasif',
                        value:0
                    },
                    {
                        name:'Tümü',
                        value:null
                    },
                ],
                pageLoading: false,
                blogs: [],
                paging: {
                    currentPage: 1,
                    total: undefined,
                    length: 20
                },
            }
        },
        watch: {
            'paging.currentPage'() {
                this.getBlogByAdmin();
            }
        },
        methods: {
            async changeBlogStatus(blogs) {
                var _this = this;
                _this.$repositories.blog.updateStatus({ id: blogs.id, is_active: !blogs.is_active })
                    .then(res => {
                        if(res.data.success == 'success') {
                            blogs.is_active = !blogs.is_active;
                        }
                    });
            },
            deleteBlog(id) {
                const _this = this;
                _this.$bvModal.msgBoxConfirm('Blogi silmek istediğinize emin misiniz?', {
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    okTitle: 'Evet',
                    cancelVariant: 'danger',
                    cancelTitle: 'Hayır',
                    footerClass: 'py-2 px-4',
                    hideHeaderClose: false
                })
                    .then(value => {
                        if (value) {
                            _this.$repositories.blog.delete(id)
                                .then(res => {
                                    if (res.data.success == "success") {
                                        _this.$bvToast.toast('Blog başarıyla silindi.', {
                                            title: `Başarılı..`,
                                            variant: 'success',
                                            autoHideDelay: 500,
                                            solid: true
                                        });
                                        _this.getBlogByAdmin();
                                    }
                                    else {
                                        _this.$bvToast.toast('Blog silinemedi.Sayfayı yenileyip tekrar deneyiniz.', {
                                            title: `Başarısız..`,
                                            variant: 'danger',
                                            autoHideDelay: 500,
                                            solid: true
                                        });
                                    }

                                });
                        }
                    })
                    .catch(err => {

                    });
            },
            async getBlogByAdmin() {
                var _this = this;
                let reqData = {
                    paging: {
                        start: (_this.paging.currentPage - 1) * _this.paging.length,
                        end: _this.paging.length
                    },
                    filter : {
                        categories : this.search.categories ,
                        text : this.search.text ,
                        status : this.search.status 
                    }
                }
                _this.$repositories.blog.getAllForAdmin(reqData)
                    .then(res => {
                        if (res) {
                            _this.blogs = res.data.response.blogs;
                            _this.paging.total = res.data.response.total;
                        }

                    });
            },
            async getBlogCategories() {
                var _this = this;
                _this.$repositories.blog_category.get().then(res => {
                    this.categories = res.data.response;
                });
            }
        },
        async created() {
            this.getBlogByAdmin();
            this.getBlogCategories();
        },
    }
</script>

<style></style>
