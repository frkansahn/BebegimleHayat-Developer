<template>
    <div class="admin-add-image" id="adminAddImage">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 mb-4">
                    <h3>
                        Resim/ler Yükleme Sayfası
                    </h3>

                    <div class="row mt-4">
                        <div class="col-12">
                            <b-overlay :show="overlay" no-wrap></b-overlay>
                            <div class="row">
                                <div class="col-12">
                                    <button type="button" class="btn btn-dark float-right" @click="againUpload">
                                        Yeniden Yükle
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <b-form-group class="col-12" id="image_group" label="Görseli" label-for="image_input" label-size="lg" description="">
                                    <b-form-file @input="changeImageInput" multiple v-model="images" browse-text="Resim Seç" placeholder="Dosyalarınızı seçin veya buraya sürükleyip bırakın..." size="lg" id="imageFile" drop-placeholder="Dosyayı buraya bırakın..."></b-form-file>
                                </b-form-group> 
                                
                                <div class="col-12 mb-3" v-if="imageList.length > 0">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Resim</th>
                                                <th>Adı</th>
                                                <th>Boyutu</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(image, index) in imageList">
                                                <td>
                                                    <img :src="image.srcElement.result" style="max-width: 50px;">
                                                </td>
                                                <td>
                                                    {{ image.name }}
                                                </td>
                                                <td>
                                                    {{ image.loaded }}
                                                </td>
                                                <td>
                                                    <b-icon role="button" variant="success" icon="plus-circle" class="mr-2" font-scale="1.4"
                                                        @click="saveImage(index)"></b-icon>
                                                    <b-icon role="button" variant="danger" icon="trash" font-scale="1.4"
                                                        @click="deleteImage(index)"></b-icon>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-4" v-if="imageList.length > 0">
                                    <b-button @click="saveAllImage" class="w-100" variant="success" size="md">Tümünü Yükle</b-button>                                            
                                </div>
                                <div class="col-12">
                                    <div class="col-12 mb-3" v-if="resultImages && resultImages.length > 0">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Küçük Resim</th>
                                                    <th>Orta Resim</th>
                                                    <th>Büyük Resim</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(image, index) in resultImages">
                                                    <td>
                                                        <ElementImage v-if="image" :src="`/Data/image/small/${image}`"/>
                                                        <button :id="`imageCopyBtn${index}S`" class="btn btn-sm btn-light ml-1" v-b-tooltip.click.top="'Kopyalandı'" @click="copyLink($event,`${urlOrigin}/Data/image/small/${image}.jpeg`,`imageCopyBtn${index}S`)">
                                                            <b-icon-files variant="secondary" scale=".7"></b-icon-files>
                                                            Küçük Resim Kopyala
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <ElementImage v-if="image" :src="`/Data/image/medium/${image}`"/>
                                                        <button :id="`imageCopyBtn${index}M`" class="btn btn-sm btn-light ml-1" v-b-tooltip.click.top="'Kopyalandı'" @click="copyLink($event,`${urlOrigin}/Data/image/medium/${image}.jpeg`,`imageCopyBtn${index}M`)">
                                                            <b-icon-files variant="secondary" scale=".7"></b-icon-files>
                                                            Orta Resim Kopyala
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <ElementImage v-if="image" :src="`/Data/image/big/${image}`"/>
                                                        <button :id="`imageCopyBtn${index}B`" class="btn btn-sm btn-light ml-1" v-b-tooltip.click.top="'Kopyalandı'" @click="copyLink($event,`${urlOrigin}/Data/image/big/${image}.jpeg`,`imageCopyBtn${index}B`)">
                                                            <b-icon-files variant="secondary" scale=".7"></b-icon-files>
                                                            Büyük Resim Kopyala
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
export default
    {
    name: "AdminAddImage",
    middleware: "adminAuthenticated",
    layout: "admin",
    head() {
        return {
            title: "Admin Resim Yükleme Sayfası"
        };
    },
    data() {
        return {
            overlay: false,
            resultImages:[],
            images:null,
            imageList:[]
        }
    },
    props: {},
    computed: {
        urlOrigin() {
            return process?.env?.baseUrl || "https://api.bebegimlehayat.com"
        }
    },
    methods: {
        copyLink(e,link,btn) {
            navigator.clipboard.writeText(link);
            setTimeout(() => {                
                this.$root.$emit('bv::hide::tooltip', btn);
            },1500)
        },
        async saveAllImage() {
            var _this = this;
            if(_this.imageList)
            {
                for (let index = 0; index < _this.imageList.length; index++) {
                    let formData = new FormData();
                    const image = _this.imageList[index].image;
                    formData.append('files', image);
                   
                    await _this.$repositories.image.uploads(formData)
                    .then(res => {
                        _this.resultImages.push(...res.data.images);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
            }
            
        },
        async deleteImage(filename){
            var _this = this;
            _this.$repositories.image.delete({"filename": filename})
            .then(res => {
                if(res && res.data)
                {
                }
                else
                {
                }                  
            });
        },

        changeImageInput() {
            var _this = this;
            let imageFile = document.querySelector("#imageFile");
            let files = imageFile.files;
            for (let index = 0; index < files.length; index++) {
                const reader = new FileReader();
                reader.readAsDataURL(files[index]);
                reader.addEventListener('load', (res) => {
                    if(res.loaded > 2000000) {
                        _this.$bvToast.toast("Görsel 2mb'ın üzerinde.", {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 1500,
                            solid: true
                        });
                    }
                    else {
                        res["name"] = files[index].name;
                        res["image"] = files[index];
    
                        var img = new Image;
                        img.onload = function () { // image is loaded; sizes are available
                            _this.imageList.push(res);
                        };
    
                        img.src = res.srcElement.result;
                    }
                });
            }
        },
        deleteImage(index) {
            this.imageList.splice(index, 1);
        },
        againUpload() {
            this.images = null;
            this.imageList = [];
            this.resultImages = undefined;
        }
    },
    async created() {
    }
}
</script>
 
<style>
    #adminAddImage .custom-file {
        height: 150px;
    }

    #adminAddImage .custom-file label {
        height: 150px;
        line-height: 140px;
        padding: 0 2em;
    }

    #adminAddImage .custom-file label:after {
        height: 100%;
        line-height: 140px;
    }
</style>
 