<template>
	<div class="row my-4 my-md-5" id="popularTools">
		<div class="col-12">
            <h2 class="text-center font-weight-semibold mb-4 block-title">
                Popüler Araçlar
            </h2>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 py-2 tool" v-for="(tool,index) in tools">
                    <NuxtLink class="d-flex flex-column align-items-center justify-content-center" :to="tool.url" :id="`slider${index}`" :title="tool.name">
                        <span v-if="tool.image" class="d-flex align-items-center justify-content-center image">
                            <img :src="tool.image" width="140" height="140"/>
                        </span>
                        <h6 class="font-weight-normal mt-3 text-center">
                            {{ tool.name }}
                        </h6>
                    </NuxtLink>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
export default {
	name: 'PopularTools',
    data() {
        return {
            tools : [
                {
                    "name":"Yumurtlama Günü Hesaplama",
                    "url":"/yumurtlama-gunu-hesaplama",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/yumurtagunuhesaplama-1684180646598.jpeg"
                },
                {
                    "name":"Doğum Tarihi Hesaplama",
                    "url":"/dogum-tarihi-hesaplama",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/dogum_tarihi_hesaplama-1684180646598.jpeg"
                },
                {
                    "name":"Çin Takvimiyle Cinsiyet Hesaplama",
                    "url":"/cin-takvimiyle-cinsiyet-hesaplama",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/cin_takvimiyle_cinsiyet_hesaplama-1684180646596.jpeg"
                },
                {
                    "name":"Bebek İsim Bulucu",
                    "url":"/bebek-isim-bulucu",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/bebekisim_bulucu-1684180646597.jpeg"
                },
                {
                    "name":"Hamilelik Kilo Hesaplama",
                    "url":"/hamilelik-kilo-hesaplama",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/hamilelik_kilo_hesaplama-1684180646595.jpeg"
                },
                {
                    "name":"Doğum Planlayıcısı",
                    "url":"/dogum-planlayici",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/dogum_planlayicisi-1684180646596.jpeg"
                },
                {
                    "name":"Bebek Masraf Hesaplama",
                    "url":"#",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/bebek_maliyeti_hesaplama-1684180646596.jpeg"
                },
                {
                    "name":"Çocuk Gelişimi Tablosu",
                    "url":"/cocuk-gelisimi-tablosu",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/cocuk_gelisimi_tablosu-1684180646597.jpeg"
                },
                {
                    "name":"Çocuk Boyu Hesaplama",
                    "url":"/cocuk-boyu-hesaplama",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/cocuk_boyu_hesaplama-1684180646598.jpeg"
                },
                {
                    "name":"Göz Rengi Tahmin Edici",
                    "url":"/goz-rengi-tahmini",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/goz_rengi_tahmin_edici-1684180646597.jpeg"
                },
                {
                    "name":"Saç Rengi Tahmin Edici",
                    "url":"/sac-rengi-tahmini",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/sac_rengi_tahmin_edici-1684180646557.jpeg"
                },
                {
                    "name":"Bebek Aşı Takvimi Hesaplama",
                    "url":"/bebek-asi-takvimi-hesaplama",
                    "image":"https://api.bebegimlehayat.com/Data/image/extra_small/bebek_asi_takvimi_hesaplama-1684180646597.jpeg"
                }
            ] 
        }
    }
}
</script>

<style lang="scss">
    #popularTools {
        .image {
            height: 140px;
            width: 100%;
            
            picture, img{
                width: auto;
                height: 100%;
            }
        }

        .tool {
            border:1px solid transparent;

            &:hover {
                border:1px solid #000;
            }
        }

        .block-title {
            font-size: 2rem;
            font-weight: 500;
    
            @media screen and (max-width:768px) {
                font-size:1.6rem;
            }
    
            @media screen and (max-width:540px) {
                font-size:1.3rem;
            }
        }
    }

</style>
