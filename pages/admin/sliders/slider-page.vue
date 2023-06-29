<template>
    <div class="admin-settings" id="adminSettings">
        <AdminHeader/>      
        <div class="admin-content-wrapper" v-if="settings">
            <div class="col-12 px-0 py-3">
                <h5>
                    İnteraktif Vitrin 
                </h5>
                <p>
                    Anasayfada header'ın altında bulunan slider alan ayarları
                </p>
            </div>
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Masaüstü" active>
                        <div class="col-12">
                            <div class="row my-2">
                                <div class="col-12">
                                    <b-button class="col-2" type="button" @click="newSlider('desktop')" squared size="sm" variant="primary">+ Slider Ekle</b-button>
                                </div>
                            </div>
                            <div class="row" v-if="slider">
                                <div class="col-12">
                                    <div class="row mb-4" v-for="(S,index) in slider.desktop" :key="`slider${index}`"  >
                                        <div class="col-md-3 mt-2">
                                            <b-form-group label="Slider Başlık" :label-for="`sliderTitle${index}`" description="" required>
                                                <b-form-input class="border-dark" :id="`sliderTitle${index}`" v-model="S.title" type="text" :name="`sliderTitle${index}`" placeholder="Slider başlık.." size="sm"></b-form-input>  
                                            </b-form-group> 
                                            <b-form-group label="Slider URL" :label-for="`sliderUrl${index}`" description="" required>
                                                <b-form-input class="border-dark" :id="`sliderUrl${index}`" v-model="S.url" type="text" :name="`sliderUrl${index}`" placeholder="Slider URL.." size="sm"></b-form-input>  
                                            </b-form-group> 
                                            <b-form-group label="Slider Sıralama" :label-for="`sliderSort${index}`" description="" required>
                                                <b-form-input class="border-dark" :id="`sliderSort${index}`" v-model="S.sort" type="number" :name="`sliderSort${index}`" placeholder="Slider Sıralama.." size="sm"></b-form-input>  
                                            </b-form-group>   
                                            <span class="col-md-12 px-0">
                                                <b-button class="col-3 mt-2" type="button" @click="deleteSlider('desktop' , index)" squared size="sm" variant="danger">- Sil</b-button>
                                            </span>                                        
                                        </div>
                                        <div class="col-md-9 mt-4">
                                            <editor
                                                v-model="S.image"
                                                api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605"
                                                :init="init" required />                   
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </b-tab>
                    <b-tab title="Mobil">
                        <div class="col-12">
                            <div class="row my-2">
                                <div class="col-12">
                                    <b-button class="col-2" type="button" @click="newSlider('mobile')" squared size="sm" variant="primary">+ Slider Ekle</b-button>
                                </div>
                            </div>
                            <div class="row" v-if="slider">
                                <div class="col-12">
                                    <div class="row mb-4" v-for="(S,index) in slider.mobile" :key="`slider${index}`">
                                        <div class="col-md-3 mt-2">
                                            <b-form-group label="Slider Başlık" :label-for="`sliderTitle${index}`" description="" required>
                                                <b-form-input class="border-dark" :id="`sliderTitle${index}`" v-model="S.title" type="text" :name="`sliderTitle${index}`" placeholder="Slider başlık.." size="sm"></b-form-input>  
                                            </b-form-group> 
                                            <b-form-group label="Slider URL" :label-for="`sliderUrl${index}`" description="" required>
                                                <b-form-input class="border-dark" :id="`sliderUrl${index}`" v-model="S.url" type="text" :name="`sliderUrl${index}`" placeholder="Slider URL.." size="sm"></b-form-input>  
                                            </b-form-group> 
                                            <b-form-group label="Slider Sıralama" :label-for="`sliderSort${index}`" description="" required>
                                                <b-form-input class="border-dark" :id="`sliderSort${index}`" v-model="S.sort" type="number" :name="`sliderSort${index}`" placeholder="Slider Sıralama.." size="sm"></b-form-input>  
                                            </b-form-group>   
                                            <span class="col-md-12 px-0">
                                                <b-button class="col-3 mt-2" type="button" @click="deleteSlider('mobile' , index)" squared size="sm" variant="danger">- Sil</b-button>
                                            </span>                                        
                                        </div>
                                        <div class="col-md-9 mt-4">
                                            <editor
                                                v-model="S.image"
                                                api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605"
                                                :init="init" required />                   
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </b-tab>
                </b-tabs>
            </b-card>
            <div class="row mt-2">
                <div class="col-md-4 mx-auto">
                    <button @click="saveSettings" id="saveSettings" class="w-100 btn btn-md btn-outline-primary px-4">
                        Ayarları Kaydet
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue'
    export default 
    {
        name:'AdminSlider',
        layout:'admin',
        middleware: "adminAuthenticated",
        components: {
            'editor': Editor
        },
        head() {
            return {
                title: "İnteraktif Vitrin Sayfası"
            }
        },
        data() {
            return {
                settings:undefined,
                slider:undefined,
                init:{
                   language : 'tr',
                   min_height: 500,
                   preview_styles: 'font-size color',
                   resize: 'both',
                   plugins: 'link image media autolink lists advlist media table fullscreen lists directionality emoticons wordcount preview tabfocus template anchor autoresize code filemanager',
                   menubar: 'file edit insert view format table tools help',
                   toolbar: 'undo redo | styleselect | fullscreen | forecolor  | bold italic underline italic | alignleft aligncenter alignright alignjustify | outdent indent | link image media| code table | numlist bullist | ltr rtl | emoticons | wordcount | anchor | responsivefilemanager | template | preview | grid_insert',
                   external_filemanager_path: '/filemanager/',
                   filemanager_title: 'Responsive Filemanager',
                   external_plugins: {
                        'responsivefilemanager': '/filemanager/plugin.min.js',
                        'filemanager': '/filemanager/plugin.min.js'
                   },
                   filemanager_access_key:"fkod_12345.",
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
                   extended_valid_elements :"script[charset|defer|language|src|type]",
                   templates : [
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
                }
            }
        },
        methods:{
            async saveSettings(){
                var _this = this;
                var token = _this.$cookiz.get("admintoken");                
                _this.$bvModal.msgBoxConfirm('Ayarları kaydetmek istiyor musunuz?',{
                   size: 'sm',
                   buttonSize: 'sm',
                   okVariant: 'success',
                   okTitle: 'Evet',
                   cancelVariant:'danger',
                   cancelTitle: 'Hayır',
                   footerClass: 'py-2 px-4',
                   hideHeaderClose: false
                })
                .then(value => {
                    if(value)
                    {
                        _this.$store.dispatch('postService' , {"data":_this.slider , "urlParameter":"/api/v1/siteSettings/update/home_page_slider" , "token": token})
                        .then(response => {
                            if(response.success == "success")
                            {
                                this.$bvToast.toast('Kayıt başarıyla keydedildi.', {
                                    title: `Başarılı..`,
                                    variant: 'success',
                                    autoHideDelay: 500,
                                    solid: true
                                });
                             
                                setTimeout(() => {                               
                                    _this.getSettings();
                                } , 1000)
                            }
                            else
                            {
                                this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                    title: `Başarısız..`,
                                    variant: 'danger',
                                    autoHideDelay: 500,
                                    solid: true
                                });
                                _this.contentsOverlay = false;
                          }                  
                        });                        
                    }
                })
                .catch(err => {
                   
                }); 
            },
            newSlider(type){
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
                   size: 'sm',
                   buttonSize: 'sm',
                   okVariant: 'success',
                   okTitle: 'Evet',
                   cancelVariant:'danger',
                   cancelTitle: 'Hayır',
                   footerClass: 'py-2 px-4',
                   hideHeaderClose: false
                })
                .then(value => {
                    if(value)
                        _this.slider[type].push({title:"",url:"",sort:0,image:""});
                })
                .catch(err => {
                   
                });                
            },
            deleteSlider(type,index){
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Emin misiniz?',{
                   size: 'sm',
                   buttonSize: 'sm',
                   okVariant: 'success',
                   okTitle: 'Evet',
                   cancelVariant:'danger',
                   cancelTitle: 'Hayır',
                   footerClass: 'py-2 px-4',
                   hideHeaderClose: false
                })
                .then(value => {
                    if(value)
                    {    
                        _this.slider[type].splice(index,1);
                    }
                })
                .catch(err => {
                   
                });
                
            },
            getSettings(){
                var _this = this;
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/siteSettings" , "token": ""})
                .then(response => {
                    if(response)
                    {
                        _this.settings = response[0];
                        if(response[0].home_page_slider)
                            _this.slider = JSON.parse(response[0].home_page_slider);
                        else
                        {
                            _this.slider = {desktop:[],mobile:[]}
                        }
                    }
               
                });
            }
        },
        async created(){
            this.getSettings();             
        }
    }
</script>

<style>
    
</style>
