<template>
    <div class="admin-settings" id="adminSettings">
        <AdminHeader/>      
        <div class="admin-content-wrapper" v-if="settings">
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-footer>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Footer Menü</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-footer" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div class="row">
                                <ul class="col-12">
                                    <li class="row mb-2">
                                        <div class="col-12">
                                            <b-button class="col-2" type="button" @click="newMainFooterMenu" squared size="sm" variant="primary">+ Ana Menü Ekle</b-button>
                                        </div>                                
                                    </li>
                                    <li class="row mb-2" v-for="(F,index) in footerMenu" :key="`key${index}`">
                                        <span class="col-md-3 pr-2">
                                            <b-form-input class="border-dark" :id="`footerName${index}`" v-model="F.title" type="text" :name="`footerName${index}`" placeholder="Başlık yazın.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-3 pr-0">
                                            <b-form-input class="border-dark" :id="`footerSort${index}`" v-model="F.sort" type="number" :name="`footerSort${index}`" placeholder="Sıralama.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-2 pr-0">
                                            <b-button class="col-12" type="button" @click="newSubFooterMenu(index)" squared size="sm" variant="primary">+ Alt Menü Ekle</b-button>
                                        </span>
                                        <span class="col-md-1">
                                            <b-button class="col-12" type="button" @click="deleteMainFooterMenu(index)" squared size="sm" variant="danger">- Sil</b-button>
                                        </span>
                                        <div class="col-md-12 pl-5 pr-4" v-if="F.sub_category">
                                            <div class="row mt-3">
                                                <ul class="col-12">
                                                    <li class="row mb-2" v-for="(SubF,indexSub) in F.sub_category" :key="`keySub${indexSub}`">
                                                        <span class="col-md-3 pr-0">
                                                            <b-form-input class="border-dark" :id="`footerSubName${indexSub}`" v-model="SubF.name" type="text" :name="`footerSubName${indexSub}`" placeholder="Alt Menüyü yazın.." size="sm"></b-form-input>
                                                        </span>
                                                        <span class="col-md-3 pr-0" v-if="SubF.sort">
                                                            <b-form-input class="border-dark" :id="`footerSubSort${indexSub}`" v-model="SubF.sort" type="number" :name="`footerSubSort${indexSub}`" placeholder="Sıralama.." size="sm"></b-form-input>
                                                        </span>
                                                        <span class="col-md-3 pr-0">
                                                            <b-form-input class="border-dark" :id="`footerSubUrl${indexSub}`" v-model="SubF.url" type="text" :name="`footerSubUrl${indexSub}`" placeholder="URL giriniz.." size="sm"></b-form-input>
                                                        </span>
                                                        <span class="col-md-1">
                                                            <b-button class="col-12" type="button" @click="deleteSubFooterMenu(index,indexSub)" squared size="sm" variant="danger">- Sil</b-button>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>                    
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-logo>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Site Logo</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-logo" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <editor
                                v-model="settings.logo"
                                api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605"
                                :init="init" required />                   
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-contact>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>İletişim Bilgileri</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-contact" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div class="row">
                                <ul class="col-12">
                                    <li class="row mb-2" v-for="(C,index) in contact" :key="`key${index}`">
                                        <span class="col-md-3 pr-2">
                                            <b-form-input class="border-dark" :id="`contactName${index}`" v-model="C.name" type="text" :name="`contactName${index}`" placeholder="Ana Menüyü yazın.." size="sm" disabled></b-form-input>
                                        </span>
                                        <span class="col-md-6 pr-0">
                                            <b-form-input class="border-dark" :id="`contactValue${index}`" v-model="C.value" type="text" :name="`contactValue${index}`" :placeholder="`${C.name} giriniz..`" size="sm"></b-form-input>
                                        </span>
                                    </li>
                                </ul>
                            </div>                    
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-maps>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Google Maps</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-maps" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <editor
                                v-model="settings.maps"
                                api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605"
                                :init="init" required />                   
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-social>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Sosyal Medya</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-social" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div class="row">
                                <ul class="col-12">
                                    <li class="row mb-2">
                                        <div class="col-12">
                                            <b-button class="col-2" type="button" @click="newSocialMedia" squared size="sm" variant="primary">+ Sosyal Medya Ekle</b-button>
                                        </div>                                
                                    </li>
                                    <li class="row mb-2" v-for="(S,index) in social" :key="`key${index}`">
                                        <span class="col-md-2 pr-2">
                                            <b-form-input class="border-dark" :id="`socialName${index}`" v-model="S.name" type="text" :name="`socialName${index}`" placeholder="Sosyal Media İsim.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-2 pr-0">
                                            <b-form-input class="border-dark" :id="`socialLink${index}`" v-model="S.link" type="text" :name="`socialLink${index}`" placeholder="Link giriniz.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-2 pr-0">
                                            <b-form-input class="border-dark" :id="`socialSort${index}`" v-model="S.sort" type="number" :name="`socialSort${index}`" placeholder="Sıralama.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-2 pr-0">
                                            <b-form-input class="border-dark" :id="`socialIcon${index}`" v-model="S.icon" type="text" :name="`socialIcon${index}`" placeholder="İkon adını giriniz.." size="sm"></b-form-input>
                                        </span>
                                        <span class="col-md-2 pr-0">
                                            <b-form-select class="border-dark" v-model="S.is_active" name="socialActive" size="sm">
                                                <b-form-select-option value="1">Aktif</b-form-select-option>
                                                <b-form-select-option value="0">Pasif</b-form-select-option>
                                            </b-form-select>
                                        </span> 
                                        <span class="col-md-1">
                                            <b-button class="col-12" type="button" @click="deleteSocialMedia(index)" squared size="sm" variant="danger">- Sil</b-button>
                                        </span>                                      
                                    </li>
                                </ul>
                            </div>                    
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-site-loaded-html>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Sayfa Açıldığında Gösterilen Popup</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-site-loaded-html" class="col-12" v-if="site_loaded_html">
                    <div class="row">
                        <div class="col-12 p-4">
                            <p>
                                Bu ayar site yüklendiğinde sayfa üzerinde Popup olarak gösterilecek HTML dökümanıdır.
                                <small>
                                    Bu ayarı son haberi , son duyuruyu , önemli bilgileri kullanıcıya sayfa yüklendiğinde göstermek için kullanabilirsiniz.
                                </small>
                            </p>
                            <p class="mt-3">
                                <b-form-group label="Aktiflik :">
                                    <b-form-checkbox v-model="site_loaded_html.active" switch size="lg"></b-form-checkbox>
                                </b-form-group>
                            </p>
                        </div>
                    </div>
                    <div class="row" v-if="site_loaded_html.active">
                        <div class="col-12 px-4 mt-2">
                            <editor
                                v-model="site_loaded_html.html"
                                api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605"
                                :init="init" required />                   
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-additional-field-1>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Sık Sorulan Sorular (Soru Cevap)</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-additional-field-1" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div class="row">
                                <ul class="col-12 px-5 py-4">
                                    <li class="row mb-4">
                                        <div class="col-12">
                                            <b-button class="col-2" type="button" @click="newAdditionalField1" squared size="sm" variant="primary">+ Yeni Soru Ekle</b-button>
                                        </div>                                
                                    </li>
                                    <li class="row mb-2" v-for="(AF1,index) in additional_field_1" :key="`af1Key${index}`">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-2">
                                                    <button class="btn btn-success btn-sm w-100" v-b-toggle="`additional_field_1_${index}`">
                                                        Cevap Yaz
                                                    </button>
                                                </div>                                                
                                                <div class="col-8">
                                                    <b-form-input class="border-dark" :id="`af1Ask${index}`" v-model="AF1.ask" type="text" :name="`af1Ask${index}`" placeholder="Soru.." size="sm" @keyup="inputReplace" @paste="inputReplace"></b-form-input>
                                                </div>
                                                <div class="col-1">
                                                    <b-form-input class="border-dark" :id="`af1Sort${index}`" v-model="AF1.sort" type="number" :name="`af1Sort${index}`" placeholder="Sıralama.." size="sm"></b-form-input>
                                                </div>
                                                <div class="col-1">
                                                    <b-button class="col-12" type="button" @click="deleteAdditionalField1(index)" squared size="sm" variant="danger">- Sil</b-button>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <b-collapse :id="`additional_field_1_${index}`" class="col-12">
                                            <div class="row">
                                                <div class="col-12 mt-2">
                                                    <editor
                                                        v-model="AF1.question"
                                                        api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605"
                                                        :init="init" required /> 
                                                </div>
                                            </div>
                                        </b-collapse>
                                    </li>
                                </ul>
                            </div>                    
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
            <div class="row mt-2">
                <div class="col-12" v-b-toggle.collapse-additional-field-4>
                    <h5 class="border border-dark px-2 py-2 rounded d-flex align-items-center justify-content-between">
                        <small>Anasayfa Tanıtım Blok'u</small>
                        <b-icon-chevron-double-down variant="secondary" font-scale="0.6"></b-icon-chevron-double-down>
                    </h5>
                </div>
                <b-collapse id="collapse-additional-field-4" class="col-12">
                    <div class="row">
                        <div class="col-12 mt-2">
                            <div class="row">
                                <ul class="col-12 px-5 py-4">
                                    <li class="row mb-4">
                                        <div class="col-12">
                                            <b-button class="col-2" type="button" @click="newAdditionalField4" squared size="sm" variant="primary">+ Yeni Soru Ekle</b-button>
                                        </div>                                
                                    </li>
                                    <li class="row mb-2" v-for="(AF4,index) in additional_field_4" :key="`af4Key${index}`">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-2">
                                                    <button class="btn btn-success btn-sm w-100" v-b-toggle="`additional_field_4_${index}`">
                                                        İçerik Yaz
                                                    </button>
                                                </div>                                                
                                                <div class="col-4">
                                                    <b-form-input class="border-dark" :id="`af4Ask${index}`" v-model="AF4.title" type="text" :name="`af4Title${index}`" placeholder="Başlık.." size="sm" @keyup="inputReplace" @paste="inputReplace"></b-form-input>
                                                </div>
                                                <div class="col-4">
                                                    <b-form-group class="float-left w-100" :id="`image_group_${index}`" label="" label-for="image_input" description="Button ikonu için bu alana küçük görsel yükleyiniz.." v-if="AF4.icon == ''">
                                                        <b-form-file :id="`file_${index}`" @change="additionalField4File(index)" placeholder="Bir dosya seçin veya buraya bırakın..." drop-placeholder="Dosyayı buraya bırakın..." browse-text="Ekle" size="sm"></b-form-file>
                                                    </b-form-group>
                                                    <div v-else>
                                                        <small @click="deleteAdditionalField4Image(index)">
                                                            Resim sil
                                                        </small>
                                                        <img :src="AF4.icon" :alt="AF4.title">
                                                    </div>                                      
                                                </div>
                                                <div class="col-1">
                                                    <b-form-input class="border-dark" :id="`af4Sort${index}`" v-model="AF4.sort" type="number" :name="`af4Sort${index}`" placeholder="Sıralama.." size="sm"></b-form-input>
                                                </div>
                                                <div class="col-1">
                                                    <b-button class="col-12" type="button" @click="deleteAdditionalField4(index)" squared size="sm" variant="danger">- Sil</b-button>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <b-collapse :id="`additional_field_4_${index}`" class="col-12">
                                            <div class="row">
                                                <div class="col-12 mt-2">
                                                    <editor
                                                        v-model="AF4.content"
                                                        api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605"
                                                        :init="init" required /> 
                                                </div>
                                            </div>
                                        </b-collapse>
                                    </li>
                                </ul>
                            </div>                    
                        </div>
                    </div>
                </b-collapse>
                <hr>
            </div>
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
        name:'AdminSettings',
        layout:'admin',
        components: {
            'editor': Editor
        },
        head() {
            return {
                title: "Admin Ayarlar Sayfası"
            }
        },
        data() {
            return {
                settings:{},
                footerMenu:undefined,
                contact:undefined,
                social:undefined,
                additional_field_1:undefined,
                additional_field_2:undefined,
                additional_field_3:undefined,
                additional_field_4:undefined,
                additional_field_5:undefined,
                site_loaded_html:undefined,
                init:{
                   language : 'tr',
                   min_height: 500,
                   preview_styles: 'font-size color',
                   resize: 'both',
                   plugins: 'link image media autolink lists advlist media table fullscreen lists directionality emoticons wordcount preview tabfocus template anchor autoresize code filemanager',
                   menubar: 'file edit insert view format table tools help',
                   toolbar: 'undo redo | styleselect | fullscreen | forecolor  | bold italic underline italic | alignleft aligncenter alignright alignjustify | outdent indent | link image media| code table | numlist bullist | ltr rtl | emoticons | wordcount | anchor | responsivefilemanager | template | preview | grid_insert',
                   file_picker_callback: (cb, v, m) => {
                        window.tinymce.activeEditor.windowManager.openUrl({
                            url: process.env.baseUrl + '/elfinder/',
                            title: "File Manager",
                            onMessage: (api, message) => {
                                console.log(message);
                                api.close();
                                cb(message.data.customField);
                            },
                        });
                    },
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
        props:{

        },
        methods:{
            inputReplace(e){
                e.target.value = e.target.value.replaceAll("'","`");
            },
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
                        _this.settings.footer_menu = _this.footerMenu;
                        _this.settings.contact = _this.contact;
                        _this.settings.social_media = _this.social;  
                        
                        if(_this.settings.home_page_slider)
                            _this.settings.home_page_slider = JSON.parse(_this.settings.home_page_slider); 
                            
                        if(_this.settings.home_page_slider_1)
                            _this.settings.home_page_slider_1 = JSON.parse(_this.settings.home_page_slider_1);       
                            
                        if(_this.settings.home_page_slider_2)
                            _this.settings.home_page_slider_2 = JSON.parse(_this.settings.home_page_slider_2);                        
                        
                        if(_this.settings.home_page_slider_3)
                            _this.settings.home_page_slider_3 = JSON.parse(_this.settings.home_page_slider_3);    
                            
                        if(_this.settings.site_loaded_html)
                            _this.settings.site_loaded_html = JSON.parse(_this.settings.site_loaded_html);    
                        
                        _this.settings.additional_field_1 = _this.additional_field_1;
                        _this.settings.additional_field_2 = _this.additional_field_2;
                        _this.settings.additional_field_3 = _this.additional_field_3;
                        _this.settings.additional_field_4 = _this.additional_field_4;
                        _this.settings.additional_field_5 = _this.additional_field_5;

                        _this.$store.dispatch('postService' , {"data":_this.settings , "urlParameter":"/api/v1/siteSettings/update/all" , "token": token})
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
            newMainFooterMenu(){
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
                        _this.footerMenu.push({title:"",sort:0,sub_category:[]});
                    }
                })
                .catch(err => {
                   
                });                 
            },
            newSubFooterMenu(index){
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
                        if(_this.footerMenu[index].sub_category)
                            _this.footerMenu[index].sub_category.push({name:"",url:"",sort:0});
                        else
                        {
                            _this.footerMenu[index].sub_category = [];
                            _this.footerMenu[index].sub_category.push({name:"",url:"",sort:0});
                        }
                    }
                })
                .catch(err => {
                   
                });                
            },
            deleteMainFooterMenu(index){
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
                       _this.footerMenu.splice(index,1);  
                    }
                })
                .catch(err => {
                   
                });
                
            },
            deleteSubFooterMenu(mainIndex,subIndex){
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
                       _this.footerMenu[mainIndex].sub_category.splice(subIndex,1);           
                    }
                })
                .catch(err => {
                   
                });
                
            },
            newSocialMedia(){
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
                        _this.social.push({name:"",link:"",sort:0 , icon:"", is_active:1});
                    }
                })
                .catch(err => {
                   
                });
            },
            deleteSocialMedia(index){
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
                        _this.social.splice(index,1);                    
                    }
                })
                .catch(err => {
                   
                });
            },
            newAdditionalField1(){
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
                        if(!_this.additional_field_1)
                            _this.additional_field_1 = [];

                        _this.additional_field_1.push({ask:"",question:"",sort:0});
                    }
                })
                .catch(err => {
                   
                });
            },
            deleteAdditionalField1(index)
            {
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
                       _this.additional_field_1.splice(index,1);  
                    }
                })
                .catch(err => {
                   
                });
            },
            newAdditionalField4(){
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
                        if(!_this.additional_field_4)
                            _this.additional_field_4 = [];

                        _this.additional_field_4.push({title:"",icon:"",content:"",sort:0});
                    }
                })
                .catch(err => {
                   
                });
            },
            deleteAdditionalField4(index)
            {
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
                       _this.additional_field_4.splice(index,1);  
                    }
                })
                .catch(err => {
                   
                });
            },
            saveImage(file) {
                var _this = this;
                return new Promise(async (resolve, reject) => {
                    try
                    {
                        let formData = new FormData();
                        formData.append('file', file);

                        if(file)
                        {
                           _this.$store.dispatch('uploadImage' , {"data":formData})
                           .then(response => {
                              resolve(response.location);                 
                           })
                           .catch(err => {
                                resolve(false);
                           });
                        }
                        else
                            resolve(false);
                    }
                    catch(err){
                        reject(err);
                    }
                });                
            },
            async deleteImage(filename){
                var _this = this;
                return new Promise(async (resolve, reject) => {
                    try
                    {
                        var token = _this.$cookiz.get("admintoken");
                        if(token)
                        {
                            _this.$store.dispatch('postService' , {"data":{"filename":filename} , "urlParameter":"/api/v1/image/removeFile" , "token": token})
                            .then(response => {
                                if(response)
                                    resolve(true);
                                else
                                {
                                    resolve(false);
                                    _this.$bvToast.toast('Dosya bulunamadı fakat sistemden silindi. Lütfen güncellemeyi tamamlayınız', {
                                        title: `Başarısız..`,
                                        variant: 'danger',
                                        autoHideDelay: 500,
                                        solid: true
                                    });
                                }                  
                            });
                        }
                    }
                    catch(err){
                        reject(err);
                    }
                });
                
            },

            additionalField4File(index)
            {
                var _this = this;
                var file = document.getElementById("file_" + index).files[0];
                _this.saveImage(file).then((response) => {
                    _this.additional_field_4[index].icon = response;
                });
            },
            async deleteAdditionalField4Image(index){
                var _this = this;
                var filename = _this.additional_field_4[index].icon
                if(filename)
                {
                    _this.deleteImage(filename).then((response) => {
                        response == true ? _this.additional_field_4[index].icon = "" : false;
                    });
                }
            },
            getSettings(){
                var _this = this;
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/siteSettings" , "token": ""})
                .then(response => {
                    if(response)
                    {
                        _this.settings = response[0];
                        _this.footerMenu = JSON.parse(response[0].footer_menu);
                        _this.contact = JSON.parse(response[0].contact);
                        _this.social = JSON.parse(response[0].social_media);

                        _this.additional_field_1 = JSON.parse(response[0].additional_field_1);                        
                        _this.additional_field_2 = JSON.parse(response[0].additional_field_2);
                        _this.additional_field_3 = JSON.parse(response[0].additional_field_3);
                        _this.additional_field_4 = JSON.parse(response[0].additional_field_4);
                        _this.additional_field_5 = JSON.parse(response[0].additional_field_5);
                        _this.site_loaded_html = JSON.parse(response[0].site_loaded_html);

                    }
                });
            }
        },
        async created(){
            var _this = this;
            var token = _this.$cookiz.get("admintoken");
            var userId = _this.$cookiz.get("_userId");
            if(token && userId)
            {  
                _this.getSettings();
            }
            else
            {
                _this.$bvToast.toast('Admin bulunamadı tekrar giriş yapınız.', {
                    title: `Başarısız..`,
                    variant: 'danger',
                    autoHideDelay: 500,
                    solid: true
                });
                setTimeout(() => {
                    _this.$router.push("/admin/login");
                },1500)           
            }               
        },
        computed:{
        }
    }
</script>

<style>
    
</style>
