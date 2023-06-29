<template>
   <div class="blog-edit" id="editBlog">
      <AdminHeader />
      <div class="admin-content-wrapper">
         <div class="row my-5">
            <div class="col-12">
               <b-overlay :show="blogOverlay" no-wrap></b-overlay>
               <h2 class="text-center mb-4">
                  Yeni Makale Ekle
               </h2>
               <b-form class="row">
                  <div class="col-12 mt-4">
                     <div class="row mb-4">
                        <div class="col-12 col-md-6 col-lg-4 ml-auto">
                           <b-button class="col-12" type="button" @click="updateBlog" squared size="lg"
                              variant="primary">Kaydet</b-button>
                        </div>
                     </div>
                  </div>

                  <div class="col-md-3 mb-4">
                     <ul v-if="blog_categories.length > 0"
                        class="float-left w-100 border border-secondary p-2 rounded list-unstyled">
                        <li v-for="(category, index) in blog_categories" :key="`blog_categories_${index}`">
                           <ul class="list-unstyled">
                              <treeBlogCategory class="item" :item="category" @selectCategory="selectCategory"
                                 :isAddButton="false" :isRadio="true" />
                           </ul>
                        </li>
                     </ul>
                  </div>
                  <div class="col-md-9 mb-4">
                     <div class="row">
                        <b-form-group class="col-md-12" id="subject_group" label="Başlık" label-for="subject_input"
                           description="" required>
                           <b-form-input :class="[blogError.subject ? 'border-danger' : 'border-dark']" id="subject_input"
                              v-model="blog.subject" type="text" name="subject" placeholder="Başlık"
                              @click="blogError.subject = false" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-md-7 mb-2" id="image_group" label="Blog Görseli" label-for="image_input"
                           description="">
                           <b-form-file @input="saveImage" v-model="newImage" :state="Boolean(newImage)"
                              placeholder="Bir dosya seçin veya buraya bırakın..."
                              drop-placeholder="Dosyayı buraya bırakın..."></b-form-file>
                        </b-form-group>

                        <div class="col-md-2 mt-3 mb-2">
                           <div class="row">
                              <b-button @click="saveImage" class="w-100" variant="success" size="md"
                                 v-if="!blog.image">Resim Ekle</b-button>
                              <b-button @click="deleteImage" class="w-100" variant="danger" size="md" v-else>Sil</b-button>
                           </div>
                        </div>
                        <div class="col-md-3 mb-2 px-4">
                           <ElementImage v-if="blog.image" :src="`/Data/image/small/${blog.image}`" :alt="blog.subject" />
                           <span class="row mt-3" v-else>
                              <b-alert show variant="warning" class="px-3 py-2">
                                 <small>Eklenmiş resim bulunmamaktadır.</small>
                              </b-alert>
                           </span>
                        </div>
                     </div>
                  </div>

                  <b-form-group class="col-md-4" id="is_active_group" label="Aktif/Pasif" label-for="is_active_input"
                     description="">
                     <b-form-select class="border-dark" v-model="blog.is_active" name="isActiveCategory">
                        <b-form-select-option value="1" selected>Aktif</b-form-select-option>
                        <b-form-select-option value="0" selected>Pasif</b-form-select-option>
                     </b-form-select>
                  </b-form-group>

                  <b-form-group class="col-md-4" id="seo_title_group" label="Seo Başlık" label-for="seo_title_input"
                     description="">
                     <b-form-input class="border-dark" id="seo_title_input" v-model="blog.seo_title" type="text"
                        name="seo_title" placeholder="Seo başlığını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-4" id="seo_keyword_group" label="Seo Anahtarları"
                     label-for="seo_keyword_input"
                     description="Birden fazla kullanımlarda kelimeleri virgün ile ayırınız. ">
                     <b-form-input class="border-dark" id="seo_keyword_input" v-model="blog.seo_keyword" type="text"
                        name="seo_keyword" placeholder="Seo anahtarlarını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-4" id="seo_link_group" label="Seo Link" label-for="seo_link_input"
                     description="">
                     <div class="d-flex align-items-center justify-content-center">
                        <b-form-input class="float-left w-75" :state="seoLinkSuccess"
                           :class="[seoLinkSuccess == undefined ? 'border-dark' : '']" id="seo_link_input"
                           v-model="blog.seo_link" type="text" name="seo_link" placeholder="Seo linkini giriniz"
                           @click="blogError.seo_link = false" @blur="controlSeoLink" @keypress="keypressSeoLink($event)"
                           required></b-form-input>
                        <b-button class="float-left w-25 ml-2 seo-link-control" type="button" @click="controlSeoLink"
                           squared size="sm" variant="info">
                           <small>Kontrol Et</small>
                        </b-button>
                     </div>
                     <span class="link-no-use text-danger" v-if="seoLinkSuccess == false">
                        <small>Link kullanılamaz</small>
                     </span>
                  </b-form-group>

                  <b-form-group class="col-md-5" id="seo_description_group" label="Seo Açıklama"
                     label-for="seo_description_input" description="">
                     <b-form-input class="border-dark" id="seo_description_input" v-model="blog.seo_description"
                        type="text" name="seo_description" placeholder="Seo açıklamasını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-3" id="sort_group" label="Sıralama" label-for="sort_input" description="">
                     <b-form-input class="border-dark" id="sort_input" v-model="blog.sort" type="number" name="sort"
                        placeholder="Sıralamasını giriniz"></b-form-input>
                  </b-form-group>

                  <b-form-group class="col-md-12" id="short_description_group" label="Kısa Açıklama"
                     label-for="short_description_input"
                     description="Bu alana yazılan yazılar makale kartlarında görülecektir.">
                     <b-form-textarea class="border-dark" id="short_description_input" v-model="blog.short_description"
                        type="text" name="short_description" placeholder="Kısa Açıklama"></b-form-textarea>
                  </b-form-group>

                  <div class="col-md-12 my-3">
                     <h3>
                        Makale Alanları

                        <button type="button" class="btn btn-sm btn-info success ml-2" @click="previewBlog">
                           Blogu Detaylı Gör
                        </button>
                        <button type="button" class="btn btn-sm btn-success ml-2" @click="addNewSection">
                           + Yeni Bölüm Ekle
                        </button>
                     </h3>
                  </div>

                  <div class="col-md-3 border-right">
                     <draggable :list="blog.sections">
                        <div class="col-12 border rounded mb-3 py-3 bg-secondary" role="button"
                           v-for="(section, index) in blog.sections">
                           <div class="row">
                              <div class="col-12">
                                 <span class="float-right">
                                    <b-icon icon="trash" variant="danger" font-scale="1" class="mr-2" role="button"
                                       @click="deleteSection(index)"></b-icon>
                                 </span>
                              </div>
                              <div class="col-12 mb-2">
                                 <b-form-group class="text-white" id="section_name_group" label="Bölüm adı"
                                    label-for="section_name_input" description="">
                                    <b-form-input class="border-dark" id="section_name_input" v-model="section.name"
                                       type="text" :name="`section_name_${index}`"
                                       placeholder="Bölüm adı giriniz"></b-form-input>
                                 </b-form-group>
                              </div>
                              <div class="col-12">
                                 <button type="button" class="btn btn-sm mr-2 py-1 px-2"
                                    :class="section.type == 'content' ? 'btn-success' : 'btn-light'"
                                    @click="section.type = 'content'">
                                    içerik
                                 </button>
                                 <button type="button" class="btn btn-sm py-1 px-2"
                                    :class="section.type == 'product' ? 'btn-success' : 'btn-light'"
                                    @click="section.type = 'product'">
                                    Ürün
                                 </button>
                              </div>
                           </div>
                        </div>
                     </draggable>
                  </div>
                  <div class="col-md-9">
                     <div class="row">
                        <div class="col-12 mb-3 pb-3 border-bottom" v-for="(section, index) in blog.sections">
                           <div v-if="section.type == 'content'">
                              <h4 class="mb-2">
                                 {{ section.name }}
                              </h4>
                              <editor v-model="section.value" :name="`editor_${index}`"
                                 api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605" :init="init" required />
                           </div>
                           <div v-if="section.type == 'product'">
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="col-12 mt-4">
                     <div class="row mb-4">
                        <div class="col-12 col-md-6 m-auto">
                           <b-button class="col-12" type="button" @click="updateBlog" squared size="lg"
                              variant="primary">Kaydet</b-button>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-12 col-md-3 m-auto">
                           <h5 role="button" class="col-12 text-danger font-weight-normal border-bottom text-center pb-2"
                              @click="deleteBlog">Sil</h5>
                        </div>
                     </div>
                  </div>
               </b-form>
            </div>
         </div>
      </div>
      <b-modal id="blog-detail" title="Blog Detay" dialog-class="w-100 mw-100">
         <div class="container">
            <div class="row">
               <div class="col-12">
                  <BlogDetailContent :blog="blog" />
               </div>
            </div>
         </div>
         <template #modal-footer>
            <div class="w-100">
               <b-button variant="outline-danger" size="sm" class="float-right mx-2" @click="$bvModal.hide('blog-detail')">
                  Kapat
               </b-button>
            </div>
         </template>
      </b-modal>
   </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default
   {
      name: 'EditBlog',
      middleware: 'adminAuthenticated',
      layout: 'admin',
      components: {
         'editor': Editor
      },
      data() {
         return {
            blog: {
               id: null,
               subject: null,
               description: null,
               sections: [],
               short_description: null,
               image: null,
               showcase_image: null,
               category_id: null,
               seo_title: null,
               seo_link: null,
               seo_description: null,
               seo_keyword: null,
               is_container: 1,
               user_id: null,
               sort: 0,
               is_active: 1,
               gallery: []
            },
            blogError: {
               subject: false,
               description: false,
               category_id: false
            },
            blogOverlay: false,
            token: undefined,
            blog_categories: [],
            formData: undefined,
            newImage: undefined,
            newShowcaseImage: undefined,
            galleryImage: undefined,
            seoLinkSuccess: undefined,
            init: {
               language: 'tr',
               min_height: 500,
               preview_styles: 'font-size color',
               resize: 'both',
               plugins: 'link image media autolink lists advlist media table fullscreen lists directionality emoticons wordcount preview tabfocus template anchor autoresize code filemanager codesample ',
               menubar: 'file edit insert view format table tools help',
               toolbar: 'undo redo | styleselect | fullscreen | forecolor  | bold italic underline italic | alignleft aligncenter alignright alignjustify | outdent indent | link image media| code table | numlist bullist | ltr rtl | emoticons | wordcount | anchor | responsivefilemanager | template | preview | grid_insert | codesample',
               external_filemanager_path: '/filemanager/',
               filemanager_title: 'Responsive Filemanager',
               external_plugins: {
                  'responsivefilemanager': '/filemanager/plugin.min.js',
                  'filemanager': '/filemanager/plugin.min.js'
               },
               filemanager_access_key: "fkod_12345.",
               grid_preset: 'Bootstrap3',
               toolbar_mode: 'wrap',
               image_title: true,
               automatic_uploads: true,
               images_upload_url: this.$nuxt.context.env.baseUrl + '/api/v1/image/uploadEditor',
               file_picker_types: 'image',
               tinycomments_mode: 'embedded',
               tinycomments_author: 'Furkan ŞAHİN',
               relative_urls: false,
               remove_script_host: false,
               convert_urls: false,
               extended_valid_elements: "script[charset|defer|language|src|type]",
               templates: [
                  {
                     title: '2 li Görünüm',
                     description: 'Bu şablonun görünümü masaüstünde yanyana , mobilde ise alt alta olacak şekilde kullanılıyor.',
                     content: '<div class="row"><div class="col-12"><div class="row"><div class="col-12 col-md-6">Birince alan buraya gelecek.</div><div class="col-12 col-md-6">İkinci alan buraya gelecek.</div></div></div></div>'
                  },
                  {
                     title: '3 li Görünüm',
                     description: 'Bu şablonun görünümü masaüstünde yan yana , mobilde ise alt alta olacak şekilde kullanılıyor.',
                     content: '<div class="row"><div class="col-12"><div class="row"><div class="col-12 col-md-4">Birince alan buraya gelecek.</div><div class="col-12 col-md-4">İkinci alan buraya gelecek.</div><div class="col-12 col-md-4">Üçüncü alan buraya gelecek.</div></div></div></div>'
                  },
                  {
                     title: 'container',
                     description: 'Bu şablon içeriği genişliği sayfanın tamamını değilde , 1200px genişlik içerisine almak için kullanılıyor.',
                     content: '<div class="container"><div class="row"><div class="col-12">İçeriği bu alana giriniz.</div></div></div>'
                  }
               ],
            },
         }
      },
      props: {

      },
      methods: {
         convertTurkishCharacter() {
            const _this = this;
            let text = _this.blog.subject
            if (text) {
               var trMap = {
                  'çÇ': 'c',
                  'ğĞ': 'g',
                  'şŞ': 's',
                  'üÜ': 'u',
                  'ıİ': 'i',
                  'öÖ': 'o'
               };
               for (var key in trMap) {
                  text = text?.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
               }
               _this.blog.seo_link = text?.replace(/[^-a-zA-Z0-9\s]+/ig, '')
                  .replace(/\s/gi, "-")
                  .replace(/[-]+/gi, "-")
                  .toLowerCase();
            }
         },
         async controlSeoLink() {
            return new Promise((resolve, reject) => {
               var _this = this;
               if (_this.$checkIsNullOrEmpty(_this.blog.seo_link)) {
                  _this.$repositories.blog.controlLink(_this.blog.seo_link, _this.blog.id)
                     .then(res => {
                        if (res.data.use)
                           _this.seoLinkSuccess = true;
                        else
                           _this.seoLinkSuccess = false;

                        resolve(true);
                     })
                     .catch(err => {
                        resolve(true);
                        _this.seoLinkSuccess = false;
                     })
               }
               else {
                  resolve(true);
                  _this.seoLinkSuccess = false;
                  _this.$bvToast.toast('Seo link boş olamaz.', {
                     title: `Başarısız..`,
                     variant: 'danger',
                     autoHideDelay: 1500,
                     solid: true
                  });
               }
            })
         },
         keypressSeoLink(e) {
            var a = new RegExp('^[A-Za-z0-9_-]+$');
            if (!a.test(e.key)) {
               e.preventDefault();
            }
         },
         previewBlog() {
            this.$bvModal.show('blog-detail');
         },
         deleteSection(index) {
            this.blog.sections.splice(index, 1);
         },
         selectCategory(data) {
            this.blog.category_id = data.id;
         },
         addNewSection() {
            this.blog.sections.push({
               name: null,
               type: 'content',
               value: null
            })
         },
         deleteBlog() {
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
                     _this.$repositories.blog.delete(this.blog.id)
                        .then(res => {
                           if (res.data.success == "success") {
                              _this.$bvToast.toast('Blog başarıyla silindi.', {
                                 title: `Başarılı..`,
                                 variant: 'success',
                                 autoHideDelay: 500,
                                 solid: true
                              });
                              _this.$router.push("/admin");
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
         async updateBlog() {
            var _this = this;
            await _this.controlSeoLink();
            if (_this.seoLinkSuccess && _this.$checkIsNullOrEmpty(_this.blog.subject) && _this.$checkIsNullOrEmpty(_this.blog.category_id)) {
               _this.blogOverlay = true;
               _this.$repositories.blog.update(_this.blog.id, _this.blog)
                  .then(res => {
                     if (res.data.success == "success") {
                        _this.$bvToast.toast('Kayıt başarıyla keydedildi.', {
                           title: `Başarılı..`,
                           variant: 'success',
                           autoHideDelay: 500,
                           solid: true
                        });
                     }
                     else {
                        this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                           title: `Başarısız..`,
                           variant: 'danger',
                           autoHideDelay: 500,
                           solid: true
                        });
                     }
                     _this.blogOverlay = false;
                  })
                  .catch(err => {
                     _this.blogOverlay = false;
                  });
            }
            else {
               if (!_this.$checkIsNullOrEmpty(_this.blog.subject))
                  _this.blogError.subject = true;

               if (!_this.$checkIsNullOrEmpty(_this.blog.category_id))
                  _this.blogError.category_id = true;

               if (!_this.seoLinkSuccess)
                  _this.$bvToast.toast('Seo link hatalı.', {
                     title: `Başarısız..`,
                     variant: 'danger',
                     autoHideDelay: 1500,
                     solid: true
                  });

            }
         },
         saveGalleryImage() {
            var _this = this;
            for (var i = 0; i < _this.galleryImage.length; i++) {
               let formData = new FormData();
               formData.append('file', _this.galleryImage[i]);

               if (_this.galleryImage) {
                  _this.$store.dispatch('uploadImage', { "data": formData })
                     .then(response => {
                        if (typeof _this.blog.gallery != 'object' || _this.blog.gallery == null || _this.blog.gallery == "" || _this.blog.gallery == undefined)
                           _this.blog.gallery = [];

                        _this.blog.gallery.push(response.location);
                     })
                     .catch(err => {
                        console.log(err);
                     });
               }
            }

         },
         async deleteGalleryImage(filename) {
            var _this = this;
            if (_this.token) {
               _this.$store.dispatch('postService', { "data": { "filename": filename }, "urlParameter": "/api/v1/image/removeFile", "token": _this.token })
                  .then(response => {
                     if (response) {
                        var index = _this.blog.gallery.indexOf(filename);
                        _this.blog.gallery.splice(index, 1);
                        _this.galleryImage = undefined;
                     }
                     else {
                        var index = _this.blog.gallery.indexOf(filename);
                        _this.blog.gallery.splice(index, 1);
                        _this.galleryImage = undefined;
                        this.$bvToast.toast('Dosya bulunamadı fakat sistemden silindi. Lütfen güncellemeyi tamamlayınız', {
                           title: `Başarısız..`,
                           variant: 'danger',
                           autoHideDelay: 500,
                           solid: true
                        });
                     }
                  });
            }
         },
         saveImage() {
            var _this = this;
            let formData = new FormData();
            formData.append('file', _this.newImage);

            if (_this.newImage) {
               _this.$store.dispatch('uploadImage', { "data": formData })
                  .then(response => {
                     _this.blog.image = response.location;
                     this.updateBlog();
                  })
                  .catch(err => {
                     console.log(err);
                  });
            }

         },
         async deleteImage() {
            var _this = this;
            _this.$repositories.image.delete({ "filename": _this.blog.image })
               .then(res => {
                  if (res && res.data) {
                     _this.blog.image = null;
                     _this.newImage = undefined;
                     _this.updateBlog();
                  }
                  else {
                     _this.blog.image = null;
                     _this.newImage = undefined;
                     this.$bvToast.toast('Dosya bulunamadı fakat sistemden silindi. Lütfen güncellemeyi tamamlayınız', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                  }
               });
         },
         async getBlogCategories() {
            var _this = this;
            _this.$repositories.blog_category.get().then(res => {
               var map = {}, node, roots = [], i, results = res.data.response;
               for (i = 0; i < results.length; i += 1) {
                  map[results[i].id] = i;
                  results[i]["children"] = [];
               }
               for (i = 0; i < results.length; i += 1) {
                  node = results[i];
                  if (results[i].id == this.blog.category_id)
                     results[i]["isSelect"] = '1';
                  else
                     results[i]["isSelect"] = '0';

                  if (node.parent_id !== null) {
                     results[map[node.parent_id]].children.push(node);
                     results[i]["isFolder"] = true;
                  }
                  else {
                     roots.push(node);
                     results[i]["isFolder"] = false;
                  }


               }
               _this.blog_categories = roots;
            });
         }
      },
      async created() {
         this.$repositories.blog.getByIdForAdmin(this.$route.params.id)
            .then(res => {
               this.blog = res.data.response;
               this.getBlogCategories();
            });
      }
   }
</script>

<style></style>
