<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-5">
            <div class="col-12 col-lg-8">
                <div class="row">
                    <div class="col-12 mb-5">
                        <h1 class="font-weight-normal">
                            Bebek Masraf Hesaplama
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="col-12 no-result" id="bebekMasrafHesaplamaForm">
                            <div class="row">
                                <div class="col-12 mb-4 px-0">
                                    <div class="h4">
                                        Bebek Masrafı Ne Kadar Tutar?
                                    </div>
                                    <br>
                                    <p class="h6 line-height-normal font-weight-normal">
                                        Bebek yetiştirmek bir insanın hayatındaki en karmaşık eylemlerden birisi olabilir.
                                        Birçok açıdan çeşitli ihtiyaçlara sahip olan bebeklerin masrafları da oldukça
                                        çeşitlidir. Bebeğinizin ihtiyaçları genellikle aynı olsa da her ay yeni masraflar
                                        bir anda ortaya çıkabilir. Bebeğinizin giyiminden bebek arabasına, bezinden
                                        beslenmesine kadar çeşitli masrafları ortaya çıkacak. Ne tarz ve ne kadar ürün
                                        aldığınıza göre de aylık harcadığınız miktar değişecektir. Devamlı güncellenen
                                        fiyatlar ile ortalama bir miktar verilmesi ise imkansızdır. Bu yüzden alacağınız
                                        ürünlere dair plan yapıp hesaplayıcımızı kullanarak kendi bütçe planlamanızı
                                        çıkarabilirsiniz.
                                    </p>
                                </div>
                            </div>
                            <b-form class="row">
                                <div class="col-12 px-0 h6 font-weight-normal mb-5">
                                    <p class="mb-2">
                                        Bebeğinizin ilk yılı yaklaşık olarak aşağıdakilere mal olabilir:
                                    </p>
                                    <div class="h5 font-weight-bold" v-if="total > 0">
                                        Toplam :
                                        <strong class="h4">
                                            ₺ {{ total | currencyFormat }}
                                        </strong>
                                    </div>
                                </div>

                                <div class="col-12 px-0 mb-5 border-bottom">
                                    <div class="row">
                                        <div class="col-12 mb-4">
                                            <div class="h3">
                                                Devamlı Masraflar
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Çocuk Bakıcısı
                                            </div>
                                        </div>
                                        <b-form-group class="col-12 mb-5" id="bakici_group" label=""
                                            label-for="bakici_input" description="">
                                            <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                id="checkbox-bakici" v-model="devamliMasraflar.isBakici"
                                                name="checkbox-bakici" :value="true" :unchecked-value="false">
                                                Her ay çocuk bakıcısı tutacağım
                                            </b-form-checkbox>
                                            <div class="d-flex align-items-center">
                                                <b-form-input size="lg" class="mw-150 w-auto border-dark rounded-0 px-2"
                                                    id="bakici_input" v-model="devamliMasraflar.bakiciFiyat" placeholder="0"
                                                    @keypress="isNumber($event)" type="number" required></b-form-input>
                                                <div class="ml-3 h5">
                                                    x 12 ay
                                                </div>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Bez
                                            </div>
                                        </div>
                                        <b-form-group class="col-12 mb-4" id="bez_group" label="" label-for="bez_input"
                                            description="">
                                            <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg" id="checkbox-bez"
                                                v-model="devamliMasraflar.isBez" name="checkbox-bez" :value="true"
                                                :unchecked-value="false">
                                                Bez kullanacağım
                                            </b-form-checkbox>
                                            <div class="d-flex align-items-center">
                                                <b-form-input size="lg" class="mw-150 w-auto border-dark rounded-0 px-2"
                                                    id="bez_input" v-model="devamliMasraflar.bezFiyat" placeholder="0"
                                                    @keypress="isNumber($event)" type="number" required></b-form-input>
                                                <div class="ml-3 h5">
                                                    x 12 ay
                                                </div>
                                            </div>
                                        </b-form-group>
                                        <b-form-group class="col-12 mb-5" id="islak_mendil_group" label=""
                                            label-for="islak_mendil_input" description="">
                                            <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                id="checkbox-islak-mendil" v-model="devamliMasraflar.isIslakMendil"
                                                name="checkbox-islak-mendik" :value="true" :unchecked-value="false">
                                                Islak mendil kullanacağım
                                            </b-form-checkbox>
                                            <div class="d-flex align-items-center">
                                                <b-form-input size="lg" class="mw-150 w-auto border-dark rounded-0 px-2"
                                                    id="islak_mendil_input" v-model="devamliMasraflar.islakMendilFiyat"
                                                    placeholder="0" @keypress="isNumber($event)" type="number"
                                                    required></b-form-input>
                                                <div class="ml-3 h5">
                                                    x 12 ay
                                                </div>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Beslenme
                                            </div>
                                        </div>
                                        <b-form-group class="col-12 mb-4" id="bez_group" label=""
                                            label-for="formul_mama_input" description="">
                                            <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                id="checkbox-formul-mama" v-model="devamliMasraflar.isFormulMama"
                                                name="checkbox-formul-mama" :value="true" :unchecked-value="false">
                                                Formül mama kullanacağım
                                            </b-form-checkbox>
                                            <div class="d-flex align-items-center">
                                                <b-form-input size="lg" class="mw-150 w-auto border-dark rounded-0 px-2"
                                                    id="formul_mama_input" v-model="devamliMasraflar.formulMamaFiyat"
                                                    placeholder="0" @keypress="isNumber($event)" type="number"
                                                    required></b-form-input>
                                                <div class="ml-3 h5">
                                                    x 9 ay
                                                </div>
                                            </div>
                                        </b-form-group>
                                        <b-form-group class="col-12 mb-5" id="kati_gida_group" label=""
                                            label-for="kati_gida_input" description="">
                                            <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                id="checkbox-kati-gida" v-model="devamliMasraflar.isKatiGida"
                                                name="checkbox-kati-gida" :value="true" :unchecked-value="false">
                                                Katı gıda kullanacağım
                                            </b-form-checkbox>
                                            <div class="d-flex align-items-center">
                                                <b-form-input size="lg" class="mw-150 w-auto border-dark rounded-0 px-2"
                                                    id="kati_gida_input" v-model="devamliMasraflar.katiGidaFiyat"
                                                    placeholder="0" @keypress="isNumber($event)" type="number"
                                                    required></b-form-input>
                                                <div class="ml-3 h5">
                                                    x 6 ay
                                                </div>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Kıyafet
                                            </div>
                                        </div>
                                        <b-form-group class="col-12 mb-5" id="kiyafet_fiyat_group" label=""
                                            label-for="kiyafet_fiyat_input" description="">
                                            <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                id="checkbox-kiyafet-fiyat" v-model="devamliMasraflar.isKiyafet"
                                                name="checkbox-kiyafet-fiyat" :value="true" :unchecked-value="false">
                                                Aylık şu kadar para harcayacağım
                                            </b-form-checkbox>
                                            <div class="d-flex align-items-center">
                                                <b-form-input size="lg" class="mw-150 w-auto border-dark rounded-0 px-2"
                                                    id="kiyafet_fiyat_input" v-model="devamliMasraflar.kiyafetFiyat"
                                                    placeholder="0" @keypress="isNumber($event)" type="number"
                                                    required></b-form-input>
                                                <div class="ml-3 h5">
                                                    x 12 ay
                                                </div>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Birikim
                                            </div>
                                        </div>
                                        <b-form-group class="col-12 mb-5" id="birikim_fiyat_group" label=""
                                            label-for="birikim_fiyat_input" description="">
                                            <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                id="checkbox-birikim-fiyat" v-model="devamliMasraflar.isBirikim"
                                                name="checkbox-kiyafet-birikim" :value="true" :unchecked-value="false">
                                                Çocuğumun geleceği için aylık birikim yapacağım
                                            </b-form-checkbox>
                                            <div class="d-flex align-items-center">
                                                <b-form-input size="lg" class="mw-150 w-auto border-dark rounded-0 px-2"
                                                    id="birikim_fiyat_input" v-model="devamliMasraflar.birikimFiyat"
                                                    placeholder="0" @keypress="isNumber($event)" type="number"
                                                    required></b-form-input>
                                                <div class="ml-3 h5">
                                                    x 12 ay
                                                </div>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Sağlık masrafları
                                            </div>
                                        </div>
                                        <b-form-group class="col-12 mb-5" id="saglik_masraf_group" label=""
                                            label-for="saglik_masraf_input" description="">
                                            <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                id="checkbox-saglik-masraf" v-model="devamliMasraflar.isSaglikMasraf"
                                                name="checkbox-saglik-masraf" :value="true" :unchecked-value="false">
                                                Aylık şu kadar harcayacağım
                                            </b-form-checkbox>
                                            <div class="d-flex align-items-center">
                                                <b-form-input size="lg" class="mw-150 w-auto border-dark rounded-0 px-2"
                                                    id="saglik_masraf_input" v-model="devamliMasraflar.saglikMasrafFiyat"
                                                    placeholder="0" @keypress="isNumber($event)" type="number"
                                                    required></b-form-input>
                                                <div class="ml-3 h5">
                                                    x 12 ay
                                                </div>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Oyuncak, kitap
                                            </div>
                                        </div>
                                        <b-form-group class="col-12 mb-5" id="oyuncak_kitap_group" label=""
                                            label-for="oyuncak_kitap_input" description="">
                                            <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                id="checkbox-oyuncak-kitap" v-model="devamliMasraflar.isOyuncakKitap"
                                                name="checkbox-oyuncak-kitap" :value="true" :unchecked-value="false">
                                                Aylık şu kadar harcayacağım
                                            </b-form-checkbox>
                                            <div class="d-flex align-items-center">
                                                <b-form-input size="lg" class="mw-150 w-auto border-dark rounded-0 px-2"
                                                    id="oyuncak_kitap_input" v-model="devamliMasraflar.oyuncakKitapFiyat"
                                                    placeholder="0" @keypress="isNumber($event)" type="number"
                                                    required></b-form-input>
                                                <div class="ml-3 h5">
                                                    x 12 ay
                                                </div>
                                            </div>
                                        </b-form-group>
                                    </div>
                                </div>
                                <div class="col-12 px-0">
                                    <div class="row">
                                        <div class="col-12 mb-4">
                                            <div class="h3">
                                                Tek Seferlik Masraflar
                                            </div>
                                            <p class="h6 font-weight-normal">
                                                Her ay düzenli masraf oluşsa da tek seferlik alıp kurtulabileceğiniz
                                                masraflar da bulunmaktadır. Aşağıdaki listeden tek seferlik ihtiyaçları
                                                keşfedebilirsiniz.
                                            </p>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Araba
                                            </div>
                                        </div>
                                        <b-form-group class="col-12 mb-3" id="oto_koltugu_group" label=""
                                            label-for="oto_koltugu_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-oto-koltugu"
                                                        v-model="tekSeferlikMasraflar.isOtoKoltugu"
                                                        name="checkbox-oto-koltugu" :value="true" :unchecked-value="false">
                                                        Oto koltuğu
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isOtoKoltugu">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="oto_koltugu_input"
                                                        v-model="tekSeferlikMasraflar.otoKoltuguFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="bebek_arabasi_group" label=""
                                            label-for="bebek_arabasi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek-arabasi"
                                                        v-model="tekSeferlikMasraflar.isBebekArabasi"
                                                        name="checkbox-bebek-arabasi" :value="true"
                                                        :unchecked-value="false">
                                                        Bebek arabası
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekArabasi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_arabasi_input"
                                                        v-model="tekSeferlikMasraflar.bebekArabasiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="oyun_alani_group" label=""
                                            label-for="oyun_alani_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-oyun-alani" v-model="tekSeferlikMasraflar.isOyunAlani"
                                                        name="checkbox-oyun-alani" :value="true" :unchecked-value="false">
                                                        Oyun alanı
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isOyunAlani">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="oyun_alani_input" v-model="tekSeferlikMasraflar.oyunAlaniFiyat"
                                                        placeholder="0" @keypress="isNumber($event)" type="number"
                                                        required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-5" id="bez_cantasi_group" label=""
                                            label-for="bez_cantasi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bez-cantasi"
                                                        v-model="tekSeferlikMasraflar.isBezCantasi"
                                                        name="checkbox-bez-cantasi" :value="true" :unchecked-value="false">
                                                        Bez Çantası
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBezCantasi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bez_cantasi_input"
                                                        v-model="tekSeferlikMasraflar.bezCantasiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Aktivite aletleri
                                            </div>
                                        </div>

                                        <b-form-group class="col-12 mb-3" id="bebek_salincagi_group" label=""
                                            label-for="bebek_salincagi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek-salincagi"
                                                        v-model="tekSeferlikMasraflar.isBebekSalincagi"
                                                        name="checkbox-bebek-salincagi" :value="true"
                                                        :unchecked-value="false">
                                                        Bebek salıncağı
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekSalincagi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_salincagi_input"
                                                        v-model="tekSeferlikMasraflar.bebekSalincagiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="bebek_oyun_masasi_group" label=""
                                            label-for="bebek_oyun_masasi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek_oyun_masasi"
                                                        v-model="tekSeferlikMasraflar.isBebekOyunMasasi"
                                                        name="checkbox-bebek_oyun_masasi" :value="true"
                                                        :unchecked-value="false">
                                                        Bebek oyun masası
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekOyunMasasi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_oyun_masasi_input"
                                                        v-model="tekSeferlikMasraflar.bebekOyunMasasiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-5" id="bebek_oyun_halisi_group" label=""
                                            label-for="bebek_oyun_halisi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek_oyun_halisi"
                                                        v-model="tekSeferlikMasraflar.isBebekOyunHalisi"
                                                        name="checkbox-bebek_oyun_halisi" :value="true"
                                                        :unchecked-value="false">
                                                        Bebek oyun halısı
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekOyunHalisi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_oyun_halisi_input"
                                                        v-model="tekSeferlikMasraflar.bebekOyunHalisiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Uyku
                                            </div>
                                        </div>

                                        <b-form-group class="col-12 mb-3" id="besik_group" label="" label-for="besik_input"
                                            description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-besik" v-model="tekSeferlikMasraflar.isBesik"
                                                        name="checkbox-besik" :value="true" :unchecked-value="false">
                                                        Beşik
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBesik">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2" id="besik_input"
                                                        v-model="tekSeferlikMasraflar.besikFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="besik_yatagi_group" label=""
                                            label-for="besik_yatagi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-besik_yatagi"
                                                        v-model="tekSeferlikMasraflar.isBesikYatagi"
                                                        name="checkbox-besik_yatagi" :value="true" :unchecked-value="false">
                                                        Beşik yatağı
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBesikYatagi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="besik_yatagi_input"
                                                        v-model="tekSeferlikMasraflar.besikYatagiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="besik_carsafi_group" label=""
                                            label-for="besik_carsafi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-besik_carsafi"
                                                        v-model="tekSeferlikMasraflar.isBesikCarsafi"
                                                        name="checkbox-besik_carsafi" :value="true"
                                                        :unchecked-value="false">
                                                        Beşik çarşafı
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBesikCarsafi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="besik_carsafi_input"
                                                        v-model="tekSeferlikMasraflar.besikCarsafiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="alt_degistirme_masasi_group" label=""
                                            label-for="alt_degistirme_masasi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-alt_degistirme_masasi"
                                                        v-model="tekSeferlikMasraflar.isAltDegistirmeMasasi"
                                                        name="checkbox-alt_degistirme_masasi" :value="true"
                                                        :unchecked-value="false">
                                                        Alt değiştirme masası
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isAltDegistirmeMasasi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="alt_degistirme_masasi_input"
                                                        v-model="tekSeferlikMasraflar.altDegistirmeMasasiFiyat"
                                                        placeholder="0" @keypress="isNumber($event)" type="number"
                                                        required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="bebek_telsizi_group" label=""
                                            label-for="bebek_telsizi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek_telsizi"
                                                        v-model="tekSeferlikMasraflar.isBebekTelsizi"
                                                        name="checkbox-bebek_telsizi" :value="true"
                                                        :unchecked-value="false">
                                                        Bebek telsizi
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekTelsizi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_telsizi_input"
                                                        v-model="tekSeferlikMasraflar.bebekTelsiziFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-5" id="bebek_kamerasi_group" label=""
                                            label-for="bebek_kamerasi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek_kamerasi"
                                                        v-model="tekSeferlikMasraflar.isBebekKamerasi"
                                                        name="checkbox-bebek_kamerasi" :value="true"
                                                        :unchecked-value="false">
                                                        Bebek kamerası
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekKamerasi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_kamerasi_input"
                                                        v-model="tekSeferlikMasraflar.bebekKamerasiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Beslenme
                                            </div>
                                        </div>

                                        <b-form-group class="col-12 mb-3" id="emzik_group" label="" label-for="emzik_input"
                                            description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-besik" v-model="tekSeferlikMasraflar.isEmzik"
                                                        name="checkbox-emzik" :value="true" :unchecked-value="false">
                                                        Emzik
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isEmzik">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2" id="emzik_input"
                                                        v-model="tekSeferlikMasraflar.emzikFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="biberon_group" label=""
                                            label-for="biberon_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-biberon" v-model="tekSeferlikMasraflar.isBiberon"
                                                        name="checkbox-biberon" :value="true" :unchecked-value="false">
                                                        Biberon
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBiberon">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="biberon_input" v-model="tekSeferlikMasraflar.biberonFiyat"
                                                        placeholder="0" @keypress="isNumber($event)" type="number"
                                                        required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="catal_kasik_group" label=""
                                            label-for="catal_kasik_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-catal_kasik"
                                                        v-model="tekSeferlikMasraflar.isCatalKasik"
                                                        name="checkbox-catal_kasik" :value="true" :unchecked-value="false">
                                                        Çatal-Kaşık
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isCatalKasik">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="catal_kasik_input"
                                                        v-model="tekSeferlikMasraflar.catalKasikFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="tabak_group" label="" label-for="tabak_input"
                                            description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-tabak" v-model="tekSeferlikMasraflar.isTabak"
                                                        name="checkbox-tabak" :value="true" :unchecked-value="false">
                                                        Tabak
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isTabak">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2" id="tabak_input"
                                                        v-model="tekSeferlikMasraflar.tabakFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="suluk_group" label="" label-for="suluk_input"
                                            description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-suluk" v-model="tekSeferlikMasraflar.isSuluk"
                                                        name="checkbox-suluk" :value="true" :unchecked-value="false">
                                                        Suluk
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isSuluk">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2" id="suluk_input"
                                                        v-model="tekSeferlikMasraflar.sulukFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-5" id="onluk_group" label="" label-for="onluk_input"
                                            description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-onluk" v-model="tekSeferlikMasraflar.isOnluk"
                                                        name="checkbox-onluk" :value="true" :unchecked-value="false">
                                                        Önlük
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isOnluk">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2" id="onluk_input"
                                                        v-model="tekSeferlikMasraflar.onlukFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Emzirme
                                            </div>
                                        </div>

                                        <b-form-group class="col-12 mb-3" id="gogus_pompasi_group" label=""
                                            label-for="gogus_pompasi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-gogus_pompasi"
                                                        v-model="tekSeferlikMasraflar.isGogusPompasi"
                                                        name="checkbox-gogus_pompasi" :value="true"
                                                        :unchecked-value="false">
                                                        Göğüs Pompası
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isGogusPompasiisEmzik">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="gogus_pompasi_input"
                                                        v-model="tekSeferlikMasraflar.gogusPompasiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="emzirme_sutyeni_group" label=""
                                            label-for="emzirme_sutyeni_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-emzirme_sutyeni"
                                                        v-model="tekSeferlikMasraflar.isEmzirmeSutyeni"
                                                        name="checkbox-emzirme_sutyeni" :value="true"
                                                        :unchecked-value="false">
                                                        Emzirme sütyeni
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isEmzirmeSutyeni">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="emzirme_sutyeni_input"
                                                        v-model="tekSeferlikMasraflar.emzirmeSutyeniFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-5" id="emzirme_yastigi_group" label=""
                                            label-for="emzirme_yastigi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-emzirme_yastigi"
                                                        v-model="tekSeferlikMasraflar.isEmzirmeYastigiisEmzirmeSutyeni"
                                                        name="checkbox-emzirme_yastigi" :value="true"
                                                        :unchecked-value="false">
                                                        Emzirme yastğı
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isEmzirmeYastigi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="emzirme_yastigi_input"
                                                        v-model="tekSeferlikMasraflar.emzirmeYastigiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Banyo
                                            </div>
                                        </div>

                                        <b-form-group class="col-12 mb-3" id="bebek_havlusu_group" label=""
                                            label-for="bebek_havlusu_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek_havlusu"
                                                        v-model="tekSeferlikMasraflar.isBebekHavlusu"
                                                        name="checkbox-bebek_havlusu" :value="true"
                                                        :unchecked-value="false">
                                                        Bebek havlusu
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekHavlusu">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_havlusu_input"
                                                        v-model="tekSeferlikMasraflar.bebekHavlusuFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="bebek_kuveti_group" label=""
                                            label-for="bebek_kuveti_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek_kuveti"
                                                        v-model="tekSeferlikMasraflar.isBebekKuveti"
                                                        name="checkbox-bebek_kuveti" :value="true" :unchecked-value="false">
                                                        Bebek küveti
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekKuveti">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_kuveti_input"
                                                        v-model="tekSeferlikMasraflar.bebekKuvetiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="bebek_şampuani_group" label=""
                                            label-for="bebek_şampuani_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek_şampuani"
                                                        v-model="tekSeferlikMasraflar.isBebekSampuani"
                                                        name="checkbox-bebek_şampuani" :value="true"
                                                        :unchecked-value="false">
                                                        Bebek şampuanı
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekSampuani">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_şampuani_input"
                                                        v-model="tekSeferlikMasraflar.bebekSampuaniFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="bebek_sabunu_group" label=""
                                            label-for="bebek_sabunu_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek_sabunu"
                                                        v-model="tekSeferlikMasraflar.isBebekSabunu"
                                                        name="checkbox-bebek_sabunu" :value="true" :unchecked-value="false">
                                                        Bebek sabunu
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekSabunu">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_sabunu_input"
                                                        v-model="tekSeferlikMasraflar.bebekSabunuFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-5" id="bebek_taragi_group" label=""
                                            label-for="bebek_taragi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek_taragi"
                                                        v-model="tekSeferlikMasraflar.isBebekTaragi"
                                                        name="checkbox-bebek_taragi" :value="true" :unchecked-value="false">
                                                        Bebek taragı
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekTaragi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_taragi_input"
                                                        v-model="tekSeferlikMasraflar.bebekTaragiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <div class="col-12 mb-2">
                                            <div class="h4">
                                                Sağlık ve Güvenlik
                                            </div>
                                        </div>

                                        <b-form-group class="col-12 mb-3" id="bebek_kilidi_group" label=""
                                            label-for="bebek_kilidi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek_kilidi"
                                                        v-model="tekSeferlikMasraflar.isBebekKilidi"
                                                        name="checkbox-bebek_kilidi" :value="true" :unchecked-value="false">
                                                        Bebek kilidi
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekKilidi">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_kilidi_input"
                                                        v-model="tekSeferlikMasraflar.bebekKilidiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-3" id="ilk_yardim_seti_group" label=""
                                            label-for="ilk_yardim_seti_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-ilk_yardim_seti"
                                                        v-model="tekSeferlikMasraflar.isIlkYardimSeti"
                                                        name="checkbox-ilk_yardim_seti" :value="true"
                                                        :unchecked-value="false">
                                                        İlk yardım seti
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isIlkYardimSeti">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="ilk_yardim_seti_input"
                                                        v-model="tekSeferlikMasraflar.ilkYardimSetiFiyat" placeholder="0"
                                                        @keypress="isNumber($event)" type="number" required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>

                                        <b-form-group class="col-12 mb-5" id="bebek_citi_group" label=""
                                            label-for="bebek_citi_input" description="">
                                            <div
                                                class="d-flex align-items-baseline align-items-md-center flex-column flex-md-row justify-content-between w-100 float-left">
                                                <div class="float-left h-40 h-md-60 d-flex align-items-center">
                                                    <b-form-checkbox class="mb-2 h6 font-weight-normal" size="lg"
                                                        id="checkbox-bebek_citi" v-model="tekSeferlikMasraflar.isBebekCiti"
                                                        name="checkbox-bebek_citi" :value="true" :unchecked-value="false">
                                                        Bebek çiti
                                                    </b-form-checkbox>
                                                </div>
                                                <b-input-group class="w-auto mw-150 border rounded border-dark"
                                                    v-if="tekSeferlikMasraflar.isBebekCiti">
                                                    <b-form-input size="lg" class="border-0 rounded-0 px-2"
                                                        id="bebek_citi_input" v-model="tekSeferlikMasraflar.bebekCitiFiyat"
                                                        placeholder="0" @keypress="isNumber($event)" type="number"
                                                        required></b-form-input>
                                                    <template #prepend>
                                                        <b-input-group-text
                                                            class="pl-2 pr-1 bg-white border-0">₺</b-input-group-text>
                                                    </template>
                                                </b-input-group>
                                            </div>
                                        </b-form-group>
                                    </div>
                                </div>
                            </b-form>
                        </div>

                        <div class="row mt-4">
                            <div class="col-12" id="bebekMasrafHesaplamaContent">
                                <h2>Bebek Masrafı Hesaplayıcısı Nedir? </h2>
                                <br>
                                <p>Çocuk sahibi olmak ebeveynlerin hayatındaki en önemli anlardan biridir. Hamilelikten
                                    çocuğun büyümesine kadar olan bu süreç, birçok ebeveyn için sihir gibi gelir. Ancak bu
                                    sihirli yolculuğun birçok sorumluluğu da bulunmaktadır. Özellikle doğumdan sonra
                                    çocuğunuzun sağlıklı büyümesi ve eksiklerinin kapanması çok önemlidir. Çocuğunuzu
                                    sağlıklı ve mutlu bir şekilde yetiştirmek için mamasından bezine, kıyafetinden beşiğine
                                    kadar birçok harcama yapmanız gerekebilir. </p>
                                <br>
                                <p>Ancak ilk defa çocuk sahibi olacak çiftler için bu tür ihtiyaçlar ve kavramlar
                                    başlangıçta yabancı gelecektir. Bu yüzden nelere sahip olmaları gerektiği konusunda ek
                                    bilgiye ihtiyaç duyacaklardır. Sadece neye sahip olacağını bilmek değil, alacağı
                                    eşyaların ne kadar tutacağını bilmek de önemlidir. </p>
                                <br>
                                <p>Detaylı bir liste çıkarılması, bu listedeki eşyaların fiyatlarının belirlenmesi gibi bir
                                    görev, ileride bebeklerinin isteklerine ve ihtiyaçlarına hazırlanmalarını
                                    kolaylaştıracaktır. Ancak bu listeye nereden başlayacağını bilmek bile başlı başlına bir
                                    sorun olabilir. </p>
                                <br>
                                <p>Bebeğimle Hayat Bebek Masrafı Hesaplayıcısı bu noktada ebeveynlere yardımcı olmak için
                                    geliştirilmiş bir araçtır. Bebeğinize harcayabileceğiniz masraflar için önceden
                                    ayarlanmış kategorilerle size yol gösterir. Böylece nelere sahip olmanız gerektiğini
                                    öğrenebileceğiniz gibi aşağı yukarı ne kadar harcama yapmanız gerektiğini de
                                    öğrenirsiniz. </p>
                                <br>
                                <p>Bebek masraf hesaplayıcı devamlı masraflar ve tek seferlik masraflar olarak ikiye
                                    ayrılmaktadır. Devamlı masraflar bez, mama ve hijyen ürünleri içerirken tek seferlik
                                    masraflar oto koltuğu, bez çantası ve bebek havlusu gibi ihtiyaçlar içerir. İsmini
                                    gördüğünüz ürünün yanındaki kutucuklara ne kadar harcama yapacağınızı yazarak ne kadar
                                    harcamanız gerektiğinizi öğrenebilirsiniz. </p>
                                <br>
                                <p>Hangi ürünü hangi markadan alacağınızın kararını siz verdiğin için ürün fiyatına göre
                                    kendiniz bilgileri girebilir ve kendiniz için en doğru sonuca ulaşabilirsiniz. </p>
                                <br><br>
                                <h2>Bebek Masrafını Kısmak İçin Ne Yapabilirim? </h2>
                                <br>
                                <p>Bebek masraflarını hesaplarken birçok ebeveyn beklediğinden daha yüksek bir fiyatla
                                    karşılaşır. Bu fiyatların azaltılması aile ekonomisinde büyük bir yardımda bulunabilir.
                                    Bebek masrafını kısmak içinse en etkili yöntem 2. el eşyalardır. </p>
                                <br>
                                <p>2. el eşyalar başta ebeveynlere çok güvenli gelmeyebilir. Ancak belirli önlemler
                                    alındığında ve dikkatli olunduğunda 2. el bebek ürünü almanın hiçbir sorunu yoktur.
                                    Sonuçta bebekler hızlı büyüdüğü için alınan ufak zıbınlar seneler boyunca giyilip
                                    yıpranmış olmayacaktır. Bu yüzden birçok ürünün 2. el satışı son derece doğaldır. </p>
                                <br>
                                <p>Bebeğinize 2. el olarak kıyafet almanızda bir sakınca yoktur. Alınan kıyafetler sağlamsa,
                                    bebeğiniz için uygun özellikleri taşıyorsa ve beden olarak uyuyorsa almayı
                                    düşünebilirsiniz. Kıyafeti aldıktan sonra hijyenik bir şekilde yıkadığınız sürece hiçbir
                                    sorun olmayacaktır. </p>
                                <br>
                                <p>Bebeğiniz için 2. el olarak alabileceğiniz bir diğer şey ise biberon ve oyuncaklardır.
                                    Ancak alacağınız biberonların sağlam olduğundan çatlaklarının olmadığından emin olun.
                                    Ayrıca ucundaki kauçuk ağzı mutlaka değiştirin ve yenisini alın. Oyuncaklarda da aynı
                                    şekilde kırık veya bozuk olmadıkları sürece dilediğiniz gibi ikinci el alabilirsiniz.
                                    Aldığınız her ürünü güzelce yıkamayı ve temizlemeyi unutmayın. </p>
                                <br>
                                <p>Masraf kısmak için 2. el almanızın en etkili olacağı birkaç diğer ürün ise oto koltuğu,
                                    bebek arabası ve beşiktir. 3 üründe sağlam olduğu ve gerekli güvenlik önlemlerine sahip
                                    olduğu sürece gönül rahatlığı ile alabilirsiniz. Beşiklerde iskeleti almanızda bir sorun
                                    olmasa da yatağı ayrı almanızı tavsiye ederiz. Yatak paylaşımı genellikle hijyenik
                                    değildir ve bebeğiniz için zararlı olabilir. Oto koltuğu ve bebek arabasının kumaşını,
                                    yastıklarını tamamen hijyenik olacak şekilde yıkamanız gerekiyor. Aksi takdirde aynı
                                    hijyen problemlerine takılabilirsiniz. Eğer yastıklar veya kumaş sökülüp yıkanmıyorsa
                                    direkt yeni bir oto koltuğu ya da bebek arabası almanız daha doğru olacaktır. </p>
                                <br>
                                <p>Bebeğinizin kullanabileceği bir başka 2. el ütün ise kaşık çatal gibi ürünlerdir. Bu
                                    ürünler genellikle plastiktir ve kolayca yıkanabilir. Üstlerinde bir çizik ve parçalanma
                                    olmadığı sürece güzel temizleyerek kullanabilirsiniz. </p>
                                <br>
                                <p>Alacağınız ürün ister yeni ister ikinci el olsun, her daim ürünleri güzelce yıkamalı ve
                                    temizlemelisiniz. Hijyen mevcut aşamada bebeğinizin sağlığını koruyan en önemli
                                    etkendir. </p>
                                <br><br>
                                <h2>Bebek İçin Her Ay Ne Kadar Para Biriktirmeliyim? </h2>
                                <br>
                                <p>Bebek ihtiyaçları her ay değişebilir ve artabilir. Sadece bebeklik değil, çocukluk ve
                                    ergenlik yıllarında da çeşitli ihtiyaçları bulunacaktır. Okul masrafları, dışarıya
                                    çıkıp gezmeler ve çeşitli harcamalar asla bitmeyecektir. Bu yüzden bebeğiniz
                                    doğmadan masraflar için bir para biriktirdiğiniz gibi doğduktan sonra da her ay
                                    köşeye belirli bir miktar atmanız gerekecektir. Ne kadar para biriktirdiğiniz sizin
                                    bütçenize bağlı olarak değişmelidir. Ortalama 500₺ biriktirmeniz bile ileride
                                    çocuğunuz için size fayda sağlayacaktır. Köşeye para atarken asıl önemli olan ne
                                    kadar attığınız değil istikrarlı olmanız ve o paraya amacı dışında dokunmamanızdır.
                                    Çocuğunuzun geleceği için yatırım yapmak önemlidir. </p>
                                <br><br>
                                <h2>Bebek Masrafını Kısmak İçin Tavsiyeler Nelerdir? </h2>
                                <br>
                                <p>Bebeğinizin ihtiyaçları gözünüzde büyüyebilir. Bundan dolayı bazı hamlelerle cebinizi
                                    rahatlatabilirsiniz. Aşağıdaki tavsiyelerle beraber bütçenizi daha iyi
                                    kurabilirsiniz.</p>
                                <br>
                                <p>Devlet yardımını araştırın. Yeni doğan çocuklar için destek olmak adına devlet
                                    tarafından belirli miktarlarda para ödenir. Sahip olduğunuz çocuk sayısı ve çalışma
                                    durumunuza bağlı olarak e devlet üzerinden başvuru yapabilirsiniz. </p>
                                <br>
                                <p>İş yerinizin doğum iznini araştırın. Birçok işyeri annelere ve babalara doğum
                                    döneminde ücretli izin sunmaktadır. Haklarınızı araştırın ve öğrenin. Doğum izni
                                    yasal olarak hakkınızdır.</p>
                                <br>
                                <p>Özel sağlık sigortanızı kontrol edin. Eğer özel sağlık sigortanız varsa bebeğinizi de
                                    kapsadığından ve ek ayrıcalıklarının olup olmadığından emin olun.</p>
                                <br>
                                <p>Harcamalarınızı planlayın. Bebeğin doğumuna yakın tüm her şeyi almaktansa önceden
                                    satın almaya başlamanız daha doğru olacaktır. Böylece hem bütçenizi bebeğinize göre
                                    ayarlamaya alışırsınız hem de kendinizi bir anda sıkıştırmazsınız.</p>
                                <br>
                                <p>Yaşadığınız şehrin çocuk masrafını araştırın. Her şehrin ekonomik durumu farklıdır.
                                    Yaşadığınız şehirde çocuk yetiştirmek diğer şehirlere göre daha ucuz ya da pahalı
                                    olabilir. Şimdiden bu miktarı araştırın ve ona göre hareket edin. </p>
                                <br><br>


                                <script type="application/ld+json">
                                    {
                                                    "@context": "https://schema.org",
                                                    "@type": "FAQPage",
                                                    "mainEntity": [
                                                        {
                                                        "@type": "Question",
                                                        "name": "Bebek Masrafı Hesaplayıcısı Nedir?",
                                                        "acceptedAnswer": {
                                                            "@type": "Answer",
                                                            "text": "Çocuk sahibi olmak ebeveynlerin hayatındaki en önemli anlardan biridir. Hamilelikten çocuğun büyümesine kadar olan bu süreç, birçok ebeveyn için sihir gibi gelir. Ancak bu sihirli yolculuğun birçok sorumluluğu da bulunmaktadır. Özellikle doğumdan sonra çocuğunuzun sağlıklı büyümesi ve eksiklerinin kapanması çok önemlidir. Çocuğunuzu sağlıklı ve mutlu bir şekilde yetiştirmek için mamasından bezine, kıyafetinden beşiğine kadar birçok harcama yapmanız gerekebilir.
                                                    Ancak ilk defa çocuk sahibi olacak çiftler için bu tür ihtiyaçlar ve kavramlar başlangıçta yabancı gelecektir. Bu yüzden nelere sahip olmaları gerektiği konusunda ek bilgiye ihtiyaç duyacaklardır. Sadece neye sahip olacağını bilmek değil, alacağı eşyaların ne kadar tutacağını bilmek de önemlidir. 
                                                    Detaylı bir liste çıkarılması, bu listedeki eşyaların fiyatlarının belirlenmesi gibi bir görev, ileride bebeklerinin isteklerine ve ihtiyaçlarına hazırlanmalarını kolaylaştıracaktır. Ancak bu listeye nereden başlayacağını bilmek bile başlı başlına bir sorun olabilir.
                                                    Bebeğimle Hayat Bebek Masrafı Hesaplayıcısı bu noktada ebeveynlere yardımcı olmak için geliştirilmiş bir araçtır. Bebeğinize harcayabileceğiniz masraflar için önceden ayarlanmış kategorilerle size yol gösterir. Böylece nelere sahip olmanız gerektiğini öğrenebileceğiniz gibi aşağı yukarı ne kadar harcama yapmanız gerektiğini de öğrenirsiniz.
                                                    Bebek masraf hesaplayıcı devamlı masraflar ve tek seferlik masraflar olarak ikiye ayrılmaktadır. Devamlı masraflar bez, mama ve hijyen ürünleri içerirken tek seferlik masraflar oto koltuğu, bez çantası ve bebek havlusu gibi ihtiyaçlar içerir. İsmini gördüğünüz ürünün yanındaki kutucuklara ne kadar harcama yapacağınızı yazarak ne kadar harcamanız gerektiğinizi öğrenebilirsiniz.
                                                    Hangi ürünü hangi markadan alacağınızın kararını siz verdiğin için ürün fiyatına göre kendiniz bilgileri girebilir ve kendiniz için en doğru sonuca ulaşabilirsiniz. "
                                                        }
                                                        },
                                                        {
                                                        "@type": "Question",
                                                        "name": "Bebek Masrafını Kısmak İçin Ne Yapabilirim?",
                                                        "acceptedAnswer": {
                                                            "@type": "Answer",
                                                            "text": "Bebek masraflarını hesaplarken birçok ebeveyn beklediğinden daha yüksek bir fiyatla karşılaşır. Bu fiyatların azaltılması aile ekonomisinde büyük bir yardımda bulunabilir. Bebek masrafını kısmak içinse en etkili yöntem 2. el eşyalardır. 
                                                    2. el eşyalar başta ebeveynlere çok güvenli gelmeyebilir. Ancak belirli önlemler alındığında ve dikkatli olunduğunda 2. el bebek ürünü almanın hiçbir sorunu yoktur. Sonuçta bebekler hızlı büyüdüğü için alınan ufak zıbınlar seneler boyunca giyilip yıpranmış olmayacaktır. Bu yüzden birçok ürünün 2. el satışı son derece doğaldır.
                                                    Bebeğinize 2. el olarak kıyafet almanızda bir sakınca yoktur. Alınan kıyafetler sağlamsa, bebeğiniz için uygun özellikleri taşıyorsa ve beden olarak uyuyorsa almayı düşünebilirsiniz. Kıyafeti aldıktan sonra hijyenik bir şekilde yıkadığınız sürece hiçbir sorun olmayacaktır.
                                                    Bebeğiniz için 2. el olarak alabileceğiniz bir diğer şey ise biberon ve oyuncaklardır. Ancak alacağınız biberonların sağlam olduğundan çatlaklarının olmadığından emin olun. Ayrıca ucundaki kauçuk ağzı mutlaka değiştirin ve yenisini alın. Oyuncaklarda da aynı şekilde kırık veya bozuk olmadıkları sürece dilediğiniz gibi ikinci el alabilirsiniz. Aldığınız her ürünü güzelce yıkamayı ve temizlemeyi unutmayın.
                                                    Masraf kısmak için 2. el almanızın en etkili olacağı birkaç diğer ürün ise oto koltuğu, bebek arabası ve beşiktir. 3 üründe sağlam olduğu ve gerekli güvenlik önlemlerine sahip olduğu sürece gönül rahatlığı ile alabilirsiniz. Beşiklerde iskeleti almanızda bir sorun olmasa da yatağı ayrı almanızı tavsiye ederiz. Yatak paylaşımı genellikle hijyenik değildir ve bebeğiniz için zararlı olabilir. Oto koltuğu ve bebek arabasının kumaşını, yastıklarını tamamen hijyenik olacak şekilde yıkamanız gerekiyor. Aksi takdirde aynı hijyen problemlerine takılabilirsiniz. Eğer yastıklar veya kumaş sökülüp yıkanmıyorsa direkt yeni bir oto koltuğu ya da bebek arabası almanız daha doğru olacaktır.
                                                    Bebeğinizin kullanabileceği bir başka 2. el ütün ise kaşık çatal gibi ürünlerdir. Bu ürünler genellikle plastiktir ve kolayca yıkanabilir. Üstlerinde bir çizik ve parçalanma olmadığı sürece güzel temizleyerek kullanabilirsiniz.
                                                    Alacağınız ürün ister yeni ister ikinci el olsun, her daim ürünleri güzelce yıkamalı ve temizlemelisiniz. Hijyen mevcut aşamada bebeğinizin sağlığını koruyan en önemli etkendir."
                                                        }
                                                        },
                                                        {
                                                        "@type": "Question",
                                                        "name": "Bebek İçin Her Ay Ne Kadar Para Biriktirmeliyim?",
                                                        "acceptedAnswer": {
                                                            "@type": "Answer",
                                                            "text": "Bebek ihtiyaçları her ay değişebilir ve artabilir. Sadece bebeklik değil, çocukluk ve ergenlik yıllarında da çeşitli ihtiyaçları bulunacaktır. Okul masrafları, dışarıya çıkıp gezmeler ve çeşitli harcamalar asla bitmeyecektir. Bu yüzden bebeğiniz doğmadan masraflar için bir para biriktirdiğiniz gibi doğduktan sonra da her ay köşeye belirli bir miktar atmanız gerekecektir. Ne kadar para biriktirdiğiniz sizin bütçenize bağlı olarak değişmelidir. Ortalama 500₺ biriktirmeniz bile ileride çocuğunuz için size fayda sağlayacaktır. Köşeye para atarken asıl önemli olan ne kadar attığınız değil istikrarlı olmanız ve o paraya amacı dışında dokunmamanızdır. Çocuğunuzun geleceği için yatırım yapmak önemlidir."
                                                        }
                                                        },
                                                        {
                                                        "@type": "Question",
                                                        "name": "Bebek Masrafını Kısmak İçin Tavsiyeler Nelerdir?",
                                                        "acceptedAnswer": {
                                                            "@type": "Answer",
                                                            "text": "Bebeğinizin ihtiyaçları gözünüzde büyüyebilir. Bundan dolayı bazı hamlelerle cebinizi rahatlatabilirsiniz. Aşağıdaki tavsiyelerle beraber bütçenizi daha iyi kurabilirsiniz.
                                                    Devlet yardımını araştırın. Yeni doğan çocuklar için destek olmak adına devlet tarafından belirli miktarlarda para ödenir. Sahip olduğunuz çocuk sayısı ve çalışma durumunuza bağlı olarak e devlet üzerinden başvuru yapabilirsiniz. 
                                                İş yerinizin doğum iznini araştırın. Birçok işyeri annelere ve babalara doğum döneminde ücretli izin sunmaktadır. Haklarınızı araştırın ve öğrenin. Doğum izni yasal olarak hakkınızdır.
                                                Özel sağlık sigortanızı kontrol edin. Eğer özel sağlık sigortanız varsa bebeğinizi de kapsadığından ve ek ayrıcalıklarının olup olmadığından emin olun.
                                                Harcamalarınızı planlayın. Bebeğin doğumuna yakın tüm her şeyi almaktansa önceden satın almaya başlamanız daha doğru olacaktır. Böylece hem bütçenizi bebeğinize göre ayarlamaya alışırsınız hem de kendinizi bir anda sıkıştırmazsınız.
                                                Yaşadığınız şehrin çocuk masrafını araştırın. Her şehrin ekonomik durumu farklıdır. Yaşadığınız şehirde çocuk yetiştirmek diğer şehirlere göre daha ucuz ya da pahalı olabilir. Şimdiden bu miktarı araştırın ve ona göre hareket edin."
                                                    }
                                                    }
                                                ]
                                                }
                                </script>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BlogToolNewBlogs />
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { FormPlugin , FormInputPlugin, FormGroupPlugin, FormCheckboxPlugin, InputGroupPlugin,SpinnerPlugin } from 'bootstrap-vue'
Vue.use(FormPlugin);
Vue.use(InputGroupPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormCheckboxPlugin);
Vue.use(SpinnerPlugin);

export default {
    name: 'BebekMasrafHesaplama',
    head() {
        return {
            title: "Bebek Masraf Hesaplama - BebeğimleHayat",
            meta: [
                { hid: 'keywords', name: 'keywords', content: 'bebegimlehayat,hamilelik,kilo,hesaplama' },
                { hid: 'description', name: 'description', content: "Hamilelikte kaç kilo alacağınızı merak ediyorsanız Bebeğimlehayat hamilelik kilo hesaplama aracımızdan faydalanabilir, pratik bir hesap yapabilirsiniz!" },
                { hid: 'og:title', property: 'og:title', content: "Hamilelikte kaç kilo alacağınızı merak ediyorsanız Bebeğimlehayat hamilelik kilo hesaplama aracımızdan faydalanabilir, pratik bir hesap yapabilirsiniz!" }
            ],
        }
    },
    data() {
        return {
            navigation: undefined,
            devamliMasraflar: {
                isBakici: true,
                bakiciFiyat: null,
                isBez: true,
                bezFiyat: null,
                isIslakMendil: true,
                islakMendilFiyat: null,
                isFormulMama: true,
                formulMamaFiyat: null,
                isKatiGida: true,
                katiGidaFiyat: null,
                isKiyafet: true,
                kiyafetFiyat: null,
                isBirikim: true,
                birikimFiyat: null,
                isSaglikMasraf: true,
                saglikMasrafFiyat: null,
                isOyuncakKitap: true,
                oyuncakKitapFiyat: null
            },
            tekSeferlikMasraflar: {
                isOtoKoltugu: true,
                otoKoltuguFiyat: null,
                isBebekArabasi: true,
                bebekArabasiFiyat: null,
                isOyunAlani: false,
                oyunAlaniFiyat: null,
                isBezCantasi: false,
                bezCantasiFiyat: null,
                isBebekSalincagi: false,
                bebekSalincagiFiyat: null,
                isBebekOyunMasasi: false,
                bebekOyunMasasiFiyat: null,
                isBebekOyunHalisi: false,
                bebekOyunHalisiFiyat: null,
                isBesik: true,
                besikFiyat: null,
                isBesikYatagi: true,
                besikYatagiFiyat: null,
                isBesikCarsafi: true,
                besikCarsafiFiyat: null,
                isAltDegistirmeMasasi: false,
                altDegistirmeMasasiFiyat: null,
                isBebekTelsizi: true,
                bebekTelsiziFiyat: null,
                isBebekKamerasi: false,
                bebekKamerasiFiyat: null,
                isEmzik: true,
                emzikFiyat: null,
                isBiberon: true,
                biberonFiyat: null,
                isCatalKasik: true,
                catalKasikFiyat: null,
                isTabak: true,
                tabakFiyat: null,
                isSuluk: true,
                sulukFiyat: null,
                isOnluk: true,
                onlukFiyat: null,
                isGogusPompasi: true,
                gogusPompasiFiyat: null,
                isEmzirmeSutyeni: true,
                emzirmeSutyeniFiyat: null,
                isEmzirmeYastigi: true,
                emzirmeYastigiFiyat: null,
                isBebekHavlusu: true,
                bebekHavlusuFiyat: null,
                isBebekKuveti: true,
                bebekKuvetiFiyat: null,
                isBebekSampuani: true,
                bebekSampuaniFiyat: null,
                isBebekSabunu: true,
                bebekSabunuFiyat: null,
                isBebekTaragi: true,
                bebekTaragiFiyat: null,
                isBebekKilidi: false,
                bebekKilidiFiyat: null,
                isIlkYardimSeti: false,
                ilkYardimSetiFiyat: null,
                isBebekCiti: false,
                bebekCitiFiyat: null
            },

            total: null
        }
    },
    watch: {
        devamliMasraflar: {
            handler(val) {
                this.calculate();
            },
            deep: true
        },
        tekSeferlikMasraflar: {
            handler(val) {
                this.calculate();
            },
            deep: true
        }
    },
    methods: {
        isNumber: function (evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },
        calculate() {
            let total = 0;

            if (this.devamliMasraflar.isBakici)
                total += parseFloat(this.devamliMasraflar.bakiciFiyat || 0)*12;

            if (this.devamliMasraflar.isBez)
                total += parseFloat(this.devamliMasraflar.bezFiyat || 0)*12;

            if (this.devamliMasraflar.isIslakMendil)
                total += parseFloat(this.devamliMasraflar.islakMendilFiyat || 0)*12;

            if (this.devamliMasraflar.isFormulMama)
                total += parseFloat(this.devamliMasraflar.formulMamaFiyat || 0)*9;

            if (this.devamliMasraflar.isKatiGida)
                total += parseFloat(this.devamliMasraflar.katiGidaFiyat || 0)*6;

            if (this.devamliMasraflar.isKiyafet)
                total += parseFloat(this.devamliMasraflar.kiyafetFiyat || 0)*12;

            if (this.devamliMasraflar.isBirikim)
                total += parseFloat(this.devamliMasraflar.birikimFiyat || 0)*12;

            if (this.devamliMasraflar.isSaglikMasraf)
                total += parseFloat(this.devamliMasraflar.saglikMasrafFiyat || 0)*12;

            if (this.devamliMasraflar.isOyuncakKitap)
                total += parseFloat(this.devamliMasraflar.oyuncakKitapFiyat || 0)*12;


            if (this.tekSeferlikMasraflar.isOtoKoltugu)
                total += parseFloat(this.tekSeferlikMasraflar.otoKoltuguFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekArabasi)
                total += parseFloat(this.tekSeferlikMasraflar.bebekArabasiFiyat || 0);

            if (this.tekSeferlikMasraflar.isOyunAlani)
                total += parseFloat(this.tekSeferlikMasraflar.oyunAlaniFiyat || 0);

            if (this.tekSeferlikMasraflar.isBezCantasi)
                total += parseFloat(this.tekSeferlikMasraflar.bezCantasiFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekSalincagi)
                total += parseFloat(this.tekSeferlikMasraflar.bebekSalincagiFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekOyunMasasi)
                total += parseFloat(this.tekSeferlikMasraflar.bebekOyunMasasiFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekOyunHalisi)
                total += parseFloat(this.tekSeferlikMasraflar.bebekOyunHalisiFiyat || 0);

            if (this.tekSeferlikMasraflar.isBesik)
                total += parseFloat(this.tekSeferlikMasraflar.besikFiyat || 0);

            if (this.tekSeferlikMasraflar.isBesikYatagi)
                total += parseFloat(this.tekSeferlikMasraflar.besikYatagiFiyat || 0);

            if (this.tekSeferlikMasraflar.isBesikCarsafi)
                total += parseFloat(this.tekSeferlikMasraflar.besikCarsafiFiyat || 0);

            if (this.tekSeferlikMasraflar.isAltDegistirmeMasasi)
                total += parseFloat(this.tekSeferlikMasraflar.altDegistirmeMasasiFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekTelsizi)
                total += parseFloat(this.tekSeferlikMasraflar.bebekTelsiziFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekKamerasi)
                total += parseFloat(this.tekSeferlikMasraflar.bebekKamerasiFiyat || 0);

            if (this.tekSeferlikMasraflar.isEmzik)
                total += parseFloat(this.tekSeferlikMasraflar.emzikFiyat || 0);

            if (this.tekSeferlikMasraflar.isBiberon)
                total += parseFloat(this.tekSeferlikMasraflar.biberonFiyat || 0);

            if (this.tekSeferlikMasraflar.isCatalKasik)
                total += parseFloat(this.tekSeferlikMasraflar.catalKasikFiyat || 0);

            if (this.tekSeferlikMasraflar.isTabak)
                total += parseFloat(this.tekSeferlikMasraflar.tabakFiyat || 0);

            if (this.tekSeferlikMasraflar.isSuluk)
                total += parseFloat(this.tekSeferlikMasraflar.sulukFiyat || 0);

            if (this.tekSeferlikMasraflar.isOnluk)
                total += parseFloat(this.tekSeferlikMasraflar.onlukFiyat || 0);

            if (this.tekSeferlikMasraflar.isGogusPompasi)
                total += parseFloat(this.tekSeferlikMasraflar.gogusPompasiFiyat || 0);

            if (this.tekSeferlikMasraflar.isEmzirmeSutyeni)
                total += parseFloat(this.tekSeferlikMasraflar.emzirmeSutyeniFiyat || 0);

            if (this.tekSeferlikMasraflar.isEmzirmeYastigi)
                total += parseFloat(this.tekSeferlikMasraflar.emzirmeYastigiFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekHavlusu)
                total += parseFloat(this.tekSeferlikMasraflar.bebekHavlusuFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekKuveti)
                total += parseFloat(this.tekSeferlikMasraflar.bebekKuvetiFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekSampuani)
                total += parseFloat(this.tekSeferlikMasraflar.bebekSampuaniFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekSabunu)
                total += parseFloat(this.tekSeferlikMasraflar.bebekSabunuFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekTaragi)
                total += parseFloat(this.tekSeferlikMasraflar.bebekTaragiFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekKilidi)
                total += parseFloat(this.tekSeferlikMasraflar.bebekKilidiFiyat || 0);

            if (this.tekSeferlikMasraflar.isIlkYardimSeti)
                total += parseFloat(this.tekSeferlikMasraflar.ilkYardimSetiFiyat || 0);

            if (this.tekSeferlikMasraflar.isBebekCiti)
                total += parseFloat(this.tekSeferlikMasraflar.bebekCitiFiyat || 0);

            this.total = total;

        }
    },
    async created() {
        this.calculate();
        this.navigation = [
            {
                "name": "Bebek Masraf Hesaplama",
                "url": "/bebek-masraf-hesaplama"
            }
        ]
    }
}
</script>

<style>
#bebekMasrafHesaplamaForm {
    background-color: rgb(235, 247, 250);
    padding: 3em;
    border-top: 11px solid rgb(216, 240, 245);
}

.line-height-normal {
    line-height:normal;
}

.mw-150 {
    max-width: 150px;
}

.h-40 {
    height: 40px;
}

@media screen and (min-width: 768px) {
    .h-md-60 {
        height: 60px;
    }
}

#bebekMasrafHesaplamaContent h2 {
    font-size: 20px;
}

#bebekMasrafHesaplamaContent p {
    font-size: 15px;
}

#bebekMasrafHesaplamaForm.no-result:after {
    content: '';
    position: absolute;
    top: -30px;
    left: calc(50% - 25px);
    height: 50px;
    width: 50px;
    background: url(https://api.bebegimlehayat.com/Data/image/extra_small/bebek_maliyeti_hesaplama-1684180646596.jpeg) no-repeat left bottom;
    background-size: 100%;
}

#bebekMasrafHesaplamaForm.result:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 164px;
    width: 290px;
    background: url(/Data/bg_toolResult_lLeaf.svg) no-repeat left bottom;
    background-size: 100%;
}

#bebekMasrafHesaplamaForm.result:before {
    top: 0;
    right: 0;
    content: '';
    position: absolute;
    height: 164px;
    width: 253px;
    background: url(/Data/bg_toolResult_rLeaf.svg) no-repeat left bottom;
    background-size: 100%;
    z-index: 2;
}

.result-description h6 {
    line-height: normal;
}

.result-description h6 a {
    border-bottom: 2px solid rgb(60, 182, 206);
}

#bebekMasrafHesaplamaForm #result .man {
    color: #58adbe;
}

#bebekMasrafHesaplamaForm #result .women {
    color: #ffc0cb;
}

#bebekMasrafHesaplamaForm .start-over:hover {
    text-decoration: underline;
}

.vs__dropdown-toggle {
    padding: .6em !important;
    border: 0 !important;
}

.vs__search {
    font-size: 18px;
}

@media screen and (max-width: 768px) {
    #bebekMasrafHesaplamaForm form label {
        font-size: 14px;
        line-height: 31px;
    }

    #bebekMasrafHesaplamaForm form input {
        height: 35px;
        font-size: 15px;
    }
}</style>
