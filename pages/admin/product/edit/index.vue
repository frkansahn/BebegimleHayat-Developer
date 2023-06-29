<template>
    <div class="add-product" id="addProduct">
        <AdminHeader />
        <b-overlay :show="productsOverlay" no-wrap></b-overlay>
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 col-lg-10 mx-auto">
                    <div class="row">
                        <h5 class="col-12 text-left mb-4 px-0">
                            <NuxtLink to="/admin/product" id="goProductList"
                                class="float-left text-secondary text-decoration-none h4">
                                <small>
                                    <b-icon-arrow-left variant="dark" font-scale="0.9" class="mr-2"></b-icon-arrow-left>
                                    {{ $t('productList') }}
                                </small>
                            </NuxtLink>
                        </h5>
                    </div>
                    <div class="row">
                        <h5 class="col-12 text-center mb-4">
                            <span>
                                {{ $t('newProduct') }}
                            </span>
                        </h5>
                    </div>
                    <div class="row">
                        <div class="col-12 px-0">
                            <b-button class="mb-2 float-right d-flex align-items-center justify-content-center" size="sm" v-b-toggle.seo-setting>
                                <b-icon-eye-fill variant="white" font-scale=".8" class="mr-2"></b-icon-eye-fill>
                                {{ $t('settingsSeo') }}
                            </b-button>
                        </div>
                    </div>
                    <b-form class="row">
                        <b-card class="col-12 px-0" no-body>
                            <b-tabs v-model="tabIndex" pills card>
                                <b-tab title="Kategori">
                                    <b-form class="row">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-12" v-if="categories && categories.length > 0" id="categoryList">
                                                    <ul class="float-left w-100 border border-secondary p-2 rounded list-unstyled">
                                                        <li v-for="(category,index) in categories" :key="`category${index}`">
                                                            <ul class="list-unstyled">
                                                                <TreeCategory class="item"
                                                                    :item="category"
                                                                    :isCheckbox="true"
                                                                />
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </b-form>
                                </b-tab>
                                <b-tab title="Ürün Bilgileri">
                                    <b-form class="row">
                                        <b-form-group class="col-12" id="pro_name_group" :label="$t('productTitle')+'*'"
                                            label-for="pro_name_input" description="" required>
                                            <b-form-input :class="[productsError.title ? 'border-danger' : 'border-dark']"
                                                id="pro_name_input" v-model="product.title" type="text" name="pro_name"
                                                :placeholder="$t('productTitle')+'*'" @click="productsError.title = false"
                                                size="sm" required>
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="brand_group" :label="$t('brand')+'*'"
                                            label-for="brand_input" description="">
                                            <b-form-select :class="[productsError.brand ? 'border-danger' : 'border-dark']"
                                                v-model="product.brand_id" size="sm" name="proBrand"
                                                @click="productsError.brand = false" required>
                                                <b-form-select-option value=null disabled selected>{{ $t('selectBrand') }}
                                                </b-form-select-option>
                                                <b-form-select-option v-for="(B, index) in brands" :key="`proBrand${index}`"
                                                    :value="B.id">{{
                                                    B.name }}
                                                </b-form-select-option>
                                            </b-form-select>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="model_group" :label="$t('model')"
                                            label-for="model_input" description="">
                                            <b-form-select class="border-dark" v-model="product.model_id" size="sm"
                                                name="proModel">
                                                <b-form-select-option value=null disabled selected>{{ $t('selectModel') }}
                                                </b-form-select-option>
                                                <b-form-select-option v-for="(M, index) in models" :key="`proModel${index}`"
                                                    :value="M.id">{{ M.name }}</b-form-select-option>
                                            </b-form-select>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="supplier_code_group" :label="$t('supplierProductCode')"
                                            label-for="supplier_code_input" description="" required>
                                            <b-form-input class="border-dark" id="supplier_code_input"
                                                v-model="product.supplier_product_code" type="text" name="supplier_code"
                                                :placeholder="$t('supplierProductCode')" size="sm">
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="barcode_group" :label="$t('barcode')"
                                            label-for="barcode_input" description="" required>
                                            <b-form-input class="border-dark" id="barcode_input" v-model="product.barcode"
                                                type="text" name="barcode" :placeholder="$t('barcode')" size="sm">
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="ws_code_group" :label="$t('wsCode')"
                                            label-for="ws_code_input" description="" required>
                                            <b-form-input class="border-dark" id="ws_code_input" v-model="product.ws_code"
                                                type="text" name="ws_code" :placeholder="$t('wsCode')" size="sm">
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="cbm_group" :label="$t('cbm')"
                                            label-for="cbm_input" description="" required>
                                            <b-form-input class="border-dark" id="cbm_input" v-model="product.desi"
                                                type="text" name="cbm" :placeholder="$t('cbm')" size="sm">
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="short_description_group" :label="$t('shortDescription')"
                                            label-for="short_description_input" description="" required>
                                            <b-form-textarea class="border-dark" rows="3" max-rows="6" id="short_description_input" v-model="product.short_description" 
                                                name="short_description" :placeholder="$t('shortDescription')">
                                            </b-form-textarea>
                                        </b-form-group>
                                    </b-form>
                                </b-tab>
                                <b-tab title="Alt Ürünler">
                                    <div class="row">
                                        <div class="col-12 mt-3 mb-4">
                                            <h3 class="text-center">
                                                {{$t('subProducts')}}
                                            </h3>
                                        </div>
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="btn btn-success btn-sm mt-3" @click="newSubProduct">+ {{$t('newSubProduct')}}</div>
                                                    <div class="float-right d-flex align-items-center">
                                                        <b-form-group class="mr-2" id="property_category_1_group" :label="$t('propertyCategory')+' 1'"
                                                            label-for="property_category_1_input" description="" required>
                                                            <v-select v-model="selectedPropertyCategory1" :placeholder="$t('propertyCategory')+' 1'" :options="property_categories" label="name" :reduce="p_c => p_c.id" style="min-width:150px;"></v-select>
                                                        </b-form-group>
                                                        <b-form-group class="" id="property_category_2_group" :label="$t('propertyCategory')+' 2'"
                                                            label-for="property_category_2_input" description="" required>
                                                            <v-select v-model="selectedPropertyCategory2" :placeholder="$t('propertyCategory')+' 2'" :options="property_categories" label="name" :reduce="p_c => p_c.id" style="min-width:150px;"></v-select>
                                                        </b-form-group>
                                                    </div>
                                                </div>
                                            </div>
                                            <table class="table table-bordered table-sm table-responsive-lg">
                                                <thead>
                                                    <tr>
                                                        <th>{{ $t('property1') }}</th>
                                                        <th>{{ $t('property2') }}</th>
                                                        <th>{{ $t('buyingPrice') }}</th>
                                                        <th>{{ $t('sellingPrice') }}</th>
                                                        <th>{{ $t('discountedPrice') }}</th>
                                                        <th>{{ $t('barcode') }}</th>
                                                        <th>{{ $t('stock') }}</th>
                                                        <th>{{ $t('isActive') }}</th>
                                                        <th>{{ $t('delete') }}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(SP,index) in product.sub_products" :key="`subProduct${index}`">
                                                        <td class="align-bottom">
                                                            <v-select v-model="SP.property1" placeholder="Nitelik 1" :options="properties1" label="name" :reduce="p => p.id" style="min-width:120px;"></v-select>
                                                        </td>
                                                        <td class="align-bottom">
                                                            <v-select v-model="SP.property2" placeholder="Nitelik 2" :options="properties2" label="name" :reduce="p => p.id" style="min-width:120px;"></v-select>
                                                        </td>
                                                        <td class="align-bottom">
                                                            <input type="number" v-model="SP.buying_price" :name="`sub_product_buying_price_${index}`" class="form-control form-control-sm border-dark" :placeholder="$t('buyingPrice')"/>
                                                        </td>
                                                        <td class="align-bottom">
                                                            <input type="number" v-model="SP.selling_price" :name="`sub_product_selling_price_${index}`" class="form-control form-control-sm border-dark" :placeholder="$t('sellingPrice')"/>
                                                        </td>
                                                        <td class="align-bottom">
                                                            <input type="number" v-model="SP.discounted_selling_price" :name="`sub_product_discounted_selling_price_${index}`" class="form-control form-control-sm border-dark" :placeholder="$t('discountedPrice')"/>
                                                        </td>
                                                        <td class="align-bottom">
                                                            <input type="text" v-model="SP.barcode" :name="`sub_product_barcode_${index}`" class="form-control form-control-sm border-dark" :placeholder="$t('barcode')"/>
                                                        </td>
                                                        <td class="align-bottom">
                                                            <input type="number" v-model="SP.stock" :name="`sub_product_stock_${index}`" class="form-control form-control-sm border-dark" :placeholder="$t('stock')" style="width:50px;"/>
                                                        </td>
                                                        <td class="align-bottom">
                                                            <b-form-group class="col-12 mb-0 px-0" id="is_active_group" label-for="is_active_input"
                                                                description="">
                                                                <b-form-select class="border-dark"
                                                                    v-model="SP.is_active" size="sm" :name="`isActive${index}`" style="min-width: 80px;">
                                                                    <b-form-select-option value=1>{{$t('active')}}</b-form-select-option>
                                                                    <b-form-select-option value=0>{{$t('passive')}}</b-form-select-option>
                                                                </b-form-select>
                                                            </b-form-group>
                                                        </td>
                                                        <td class="align-bottom">
                                                            <button type="button" class="btn btn-danger btn-sm" @click="subProductDelete(SP.id)" id="supProductDelete">
                                                                <b-icon variant="white" icon="trash" font-scale=".9"></b-icon>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="btn btn-success float-right" @click="saveSubProduct">{{$t('saveSubProducts')}}</div>
                                        </div>
                                    </div>
                                </b-tab>
                                <b-tab title="Görsel">
                                    <div class="row">
                                        <div class="col-12 mt-3 mb-4">
                                            <h3 class="text-center">
                                                {{$t('photosProduct')}}
                                            </h3>
                                            <input type="file" multiple="multiple" hidden name="imageFile" id="imageFile"
                                                accept="image/png, image/jpeg" @change="changeImageInput" />
                                        </div>
                                        <div class="col-12 mb-3" v-if="product && product.images && product.images.length > 0">
                                            <div class="row">
                                                <div class="col-4 col-lg-3 col-xl-2 mb-2 px-1" v-for="(image, index) in product.images">
                                                    <img class="product-image" :src="image.S" />
                                                    <span class="product-image-delete" @click="deleteProductImage(index)">
                                                        &times;
                                                    </span>
                                                    <span class="btn btn-sm p-0 w-100" :class="[product.showcase_image && product.showcase_image.S == image.S ? 'btn-success' : 'btn-secondary']" @click="product.showcase_image=image">
                                                        <small class="d-flex align-items-center justify-content-center">
                                                            <b-icon-check-all variant="white" font-scale="1" class="mr-1" v-if="product.showcase_image && product.showcase_image.S == image.S"></b-icon-check-all>
                                                            Vitrin Görsel
                                                        </small>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-3 px-1" v-if="imageList.length > 0">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>{{$t('photo')}}</th>
                                                        <th>{{$t('name')}}</th>
                                                        <th>{{$t('size')}}</th>
                                                        <th>{{$t('delete')}}</th>
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
                                                            <b-icon variant="danger" icon="trash" font-scale=".8"
                                                                @click="deleteImage(index)"></b-icon>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-12 px-1">
                                            <button type="button" class="btn btn-secondary btn-sm" @click="openFileInput">
                                                {{$t('addPhoto')}}
                                            </button>
                                            <button type="button" class="btn btn-success btn-sm" v-if="imageList.length > 0" @click="uploadImage">
                                                {{$t('savePhoto')}}
                                            </button>
                                        </div>
                                        <div class="col-12 px-1">
                                            <small class="text-danger">{{$t('savePhotoDescription')}}</small>
                                        </div>
                                    </div>
                                </b-tab>
                                <b-tab title="Seçenekler">
                                    <b-form class="row py-4">
                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_product_active_checkbox" v-model="product.is_active"
                                                name="is-product-active-checkbox" value="1" unchecked-value="0">
                                                {{$t('isActive')}}
                                            </b-form-checkbox>
                                        </div>
                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_product_new_checkbox" v-model="product.is_new_product"
                                                name="is-product-new-checkbox" value="1" unchecked-value="0">
                                                {{$t('isNewProduct')}}
                                            </b-form-checkbox>
                                        </div>
                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_show_discounted_checkbox" v-model="product.on_Sale"
                                                name="is-show-discounted-checkbox" value="1" unchecked-value="0">
                                                {{$t('showDiscounted')}}
                                            </b-form-checkbox>
                                        </div>
                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_display_product_checkbox" v-model="product.is_display_product"
                                                name="is-display-product-checkbox" value="1" unchecked-value="0">
                                                {{$t('isPromotionalProduct')}}
                                            </b-form-checkbox>
                                        </div>
                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_vendor_product_checkbox" v-model="product.is_vendor_product"
                                                name="is-vendor-product-checkbox" value="1" unchecked-value="0">
                                                {{$t('isVendorProduct')}}
                                            </b-form-checkbox>
                                        </div>

                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_free_cargo_in_cart_checkbox" v-model="product.is_free_cargo_in_cart"
                                                name="is-free-cargo-in-cart-checkbox" value="1" unchecked-value="0">
                                                {{$t('isFreeCargoInCart')}}
                                            </b-form-checkbox>
                                        </div>
                                    </b-form>
                                </b-tab>
                                <b-tab title="Fiyat ve Stok">
                                    <b-form class="row py-4">
                                        <b-form-group class="col-12" id="stock_unit_group" :label="$t('unitStock')+'*'"
                                            label-for="stock_unit_input" description="">
                                            <b-form-select :class="[productsError.stock_unit ? 'border-danger' : 'border-dark']" v-model="product.stock_unit" size="sm"
                                                name="stock_unit" @click="productsError.stock_unit = false">
                                                <b-form-select-option value=null disabled selected>{{ $t('selectUnitStock') }}
                                                </b-form-select-option>
                                                <b-form-select-option v-for="(S, index) in stockUnitList"
                                                    :key="`proStockUnitlist${index}`" :value="S.code">{{ S.name }}
                                                </b-form-select-option>
                                            </b-form-select>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="stock_group" :label="$t('amountStock')"
                                            label-for="stock_input" description="" required>
                                            <b-form-input :class="[productsError.stock ? 'border-danger' : 'border-dark']" id="stock_input" v-model="product.stock"
                                                type="number" name="stock" :placeholder="$t('amountStock')" size="sm" @click="productsError.stock = false" required>
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="vat_group" :label="$t('vat')"
                                            label-for="vat_input" description="">
                                            <b-form-select class="border-dark" v-model="product.vat" size="sm"
                                                name="vat">
                                                <b-form-select-option value=1>
                                                    %1
                                                </b-form-select-option>
                                                <b-form-select-option value=8>
                                                    %
                                                </b-form-select-option>
                                                <b-form-select-option value=18>
                                                    %18
                                                </b-form-select-option>
                                            </b-form-select>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="buying_price_group" :label="$t('buyingPrice')+'*'"
                                            label-for="buying_price_input" description="" required>
                                            <b-form-input :class="[productsError.buying_price ? 'border-danger' : 'border-dark']" id="buying_price_input"
                                                v-model="product.buying_price" type="number" name="buying_price"
                                                :placeholder="$t('buyingPrice')+'*'" size="sm" @click="productsError.buying_price = false" required>
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="selling_price_group" :label="$t('sellingPrice')+'*'"
                                            label-for="selling_price_input" description="" required>
                                            <b-form-input :class="[productsError.selling_price ? 'border-danger' : 'border-dark']" id="selling_price_input"
                                                v-model="product.selling_price" type="number" name="selling_price"
                                                :placeholder="$t('sellingPrice')+'*'" size="sm" @click="productsError.selling_price = false" required>
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="discounted_selling_price_group" :label="$t('discountedPrice')"
                                            label-for="discounted_selling_price_input" description="" required>
                                            <b-form-input class="border-dark" id="discounted_selling_price_input"
                                                v-model="product.discounted_selling_price" type="number" name="discounted_selling_price"
                                                :placeholder="$t('discountedPrice')" size="sm" required>
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="currency_group" :label="$t('currency')+'*'"
                                            label-for="currency_input" description="">
                                            <b-form-select :class="[productsError.currency_id ? 'border-danger' : 'border-dark']" v-model="product.currency_id" size="sm"
                                                name="currency" @click="productsError.currency_id = false">
                                                <b-form-select-option value=null disabled selected>{{ $t('selectCurrency') }}
                                                </b-form-select-option>
                                                <b-form-select-option v-for="(C, index) in currencyList"
                                                    :key="`proCurrencylist${index}`" :value="C.id">{{ C.name }}
                                                </b-form-select-option>
                                            </b-form-select>
                                        </b-form-group>
                                    </b-form>
                                </b-tab>
                                <b-tab title="Dil Ayarları">
                                    <b-overlay :show="productLanguageOverlay" no-wrap></b-overlay>
                                    <b-form class="row">
                                        <b-form-group class="col-12 mb-3" id="language_group" label="Dil"
                                            label-for="language_input" description="" required>
                                            <v-select v-model="selectedLanguage" placeholder="Dil Seçiniz" :options="languages" label="name" :reduce="l => l.code" @input="changeLanguage"></v-select>
                                        </b-form-group>

                                        <div class="col-12" v-if="$checkIsNullOrEmpty(selectedLanguage)">
                                            <div class="row">
                                                <b-form-group class="col-12" id="product_language_title_group" label="Ürün Adı"
                                                    label-for="product_language_title_input" description="" required>
                                                    <b-form-input :class="[productLanguageError.title ? 'border-danger':'border-dark']"
                                                        id="product_language_title_input" v-model="productLanguage.title" type="text" name="product_language_title"
                                                        placeholder="Kategori adı" @click="productLanguageError.title=false" required>
                                                    </b-form-input>
                                                </b-form-group>

                                                <b-form-group class="col-12" id="product_language_short_description_group" label="Kısa Açıklama"
                                                    label-for="product_language_short_description_input" description="" required>
                                                    <b-form-textarea class="border-dark"
                                                        id="product_language_short_description_input" v-model="productLanguage.short_description" type="text"
                                                        name="product_language_short_description" placeholder="Kısa Açıklama" rows="2" max-rows="6"></b-form-textarea>
                                                </b-form-group>

                                                <b-form-group class="col-12" id="product_language_description_group" label="Detaylı Açıklama" label-for="product_language_description_input" description="">
                                                    <editor
                                                        v-model="productLanguage.description"
                                                        api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605"
                                                        :init="init" :name="`editorproduct_language_${selectedLanguage}`" />
                                                </b-form-group>

                                                <b-form-group class="col-12 col-md-6" id="product_language_seo_title_group" label="Seo Başlık"
                                                    label-for="product_language_seo_title_input" description="" required>
                                                    <b-form-input class="border-dark"
                                                        id="product_language_seo_title_input" v-model="productLanguage.seo_title" type="text" name="product_language_seo_title"
                                                        placeholder="Seo Başlık">
                                                    </b-form-input>
                                                </b-form-group>
                                                <b-form-group class="col-12 col-md-6" id="product_language_seo_keywords_group" label="Seo Anahtarları"
                                                    label-for="product_language_seo_keywords_input" description="" required>
                                                    <b-form-input class="border-dark"
                                                        id="product_language_seo_keywords_input" v-model="productLanguage.seo_keywords" type="text" name="product_language_seo_keywords"
                                                        placeholder="Seo Anahtarları">
                                                    </b-form-input>
                                                </b-form-group>

                                                <b-form-group class="col-12" id="product_language_seo_description_group" label="Seo Açıklama"
                                                    label-for="product_language_seo_description_input" description="" required>
                                                    <b-form-textarea class="border-dark"
                                                        id="product_language_seo_description_input" v-model="productLanguage.seo_description" type="text"
                                                        name="product_language_seo_description" placeholder="Seo Açıklama" rows="2" max-rows="6"></b-form-textarea>
                                                </b-form-group>

                                                <div class="col-12">
                                                    <b-button class="float-right" type="button" @click="saveProductLanguage"
                                                        size="sm" variant="success">Kaydet</b-button>
                                                </div>
                                            </div>
                                        </div>
                                    </b-form>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </b-form>
                </div>
                <div class="col-12 mt-4 mb-3">
                    <div class="row pt-2 pb-4">
                        <div class="col-12 mt-3 mb-4">
                            <h3 class="text-center">
                                {{ $t('productDescription') }}
                            </h3>
                        </div>
                        <b-form-group class="col-md-12" id="details_group" label="" label-for="details_input"
                            description="">
                            <editor v-model="product.description"
                                api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605" :init="init"
                                required />
                        </b-form-group>
                    </div>
                </div>

                <div class="col-12 mt-4">
                    <div class="row">
                        <div class="col-12 col-md-6 m-auto">
                            <b-button class="col-12" type="button" @click="saveProduct" squared size="lg"
                                variant="primary">
                                {{ $t('save') }}</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-alert variant="warning" show class="alert-update-product">
            Lütfen yapılan düzenlemelerinizi kaydetmeyi unutmayınız.
        </b-alert>
        <b-sidebar id="seo-setting" :title="$t('settingsSeo')" right backdrop shadow>
            <b-form-group class="col-12" id="seo_title_group" :label="$t('seoTitle')"
                label-for="seo_title_input" description="" required>
                <b-form-textarea class="border-dark" id="seo_title_input" v-model="product.seo_title"
                    rows="3" type="text" name="seo_title" :placeholder="$t('seoTitle')" size="sm">
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-12" id="seo_keywords_group" :label="$t('seoKeywords')"
                label-for="seo_keywords_input" description="" required>
                <b-form-textarea class="border-dark" id="seo_keywords_input"
                    v-model="product.seo_keywords" rows="3" type="text" name="seo_keywords"
                    :placeholder="$t('seoKeywords')" size="sm">
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-12" id="seo_description_group" :label="$t('seoDescription')"
                label-for="seo_description_input" description="" required>
                <b-form-textarea class="border-dark" id="seo_description_input"
                    v-model="product.seo_description" rows="3" type="text" name="seo_description"
                    :placeholder="$t('seoDescription')" size="sm">
                </b-form-textarea>
            </b-form-group>
        </b-sidebar>
    </div>
</template>
 
<script>
import Editor from '@tinymce/tinymce-vue'
export default
    {
        name: 'AddProduct',
        middleware: 'adminAuthenticated',
        layout: "admin",
        components: {
            'editor': Editor
        },
        data() {
            return {
                isMobile: false,
                supplier: undefined,
                tabIndex:0,
                product: {
                    "category_ids":[],
                    "ws_code": null,
                    "title": null,
                    "supplier_product_code": null,
                    "barcode": null,
                    "sku": null,
                    "stock": 0,
                    "stock_unit": null,
                    "stock_code": null,
                    "is_active": 1,
                    "vat": 18,
                    "currency_id": null,
                    "buying_price": null,
                    "selling_price": null,
                    "discounted_selling_price": null,
                    "search_keywords": null,
                    "is_new_product": null,
                    "on_sale": null,
                    "showcase_image": null,
                    "is_free_cargo_in_cart": null,
                    "is_display_product": null,
                    "is_vendor_product": null,
                    "brand_id": null,
                    "model_id": null,
                    "supplier_id": null,
                    "member_min_order": null,
                    "member_max_order": null,
                    "short_description": null,
                    "description": null,
                    "desi": null,
                    "symbols": null,
                    "sort": null,
                    "delivery_time": null,
                    "images": null,
                    "seo_title": null,
                    "seo_keywords": null,
                    "seo_description": null,
                    "user_id":null
                },
                productsError: {
                    title: false,
                    brand: false,
                    stock_unit: false,
                    stock: false,
                    currency_id: false,
                    buying_price: false,
                    selling_price: false
                },
                productLanguage:{
                    product_id: null,
                    title: null,
                    short_description: null,
                    description: "",
                    seo_title: null,
                    seo_description: null,
                    seo_keywords: null,
                    language:this.selectedLanguage,
                    user_id:null
                },
                productLanguageError: {
                    title: false
                },
                productsOverlay: false,
                productLanguageOverlay:false,
                selectedLanguage:null,
                selectedPropertyCategory1:null,
                selectedPropertyCategory2:null,
                property_categories:[],
                properties_1:[],
                properties_2:[],
                imageList: [],
                languages:[],
                categories: [],
                brands: [],
                models: [],
                stockUnitList: [
                    {
                        code:"adet",
                        name:"Adet"
                    },
                    {
                        code:"gr",
                        name:"Gram"
                    },
                    {
                        code:"kg",
                        name:"Kilogram"
                    },
                    {
                        code:"cm",
                        name:"Santimetre"
                    },
                    {
                        code:"meter",
                        name:"Metre"
                    }
                ],
                currencyList: [],
                formData: undefined,
                newImage: undefined,
                galleryImage: undefined,
                init: {
                    language: 'tr',
                    min_height: 500,
                    preview_styles: 'font-size color',
                    resize: 'both',
                    plugins: 'link media autolink lists advlist media table fullscreen image lists directionality emoticons wordcount preview tabfocus template anchor autoresize code',
                    menubar: 'file edit insert view format table tools help',
                    toolbar: 'undo redo | styleselect | fullscreen | forecolor  | bold italic underline italic | alignleft aligncenter alignright alignjustify | outdent indent | link media image | code table | numlist bullist | ltr rtl | emoticons | wordcount | anchor | template | preview | grid_insert',
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
                    convert_urls: true,
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
                }
            }
        },
        watch: {
            'product.categories'(val){
                const _this = this;
                if(_this.categories && _this.product?.categories) {
                    let categoryIds = _this.product?.categories.map(x => x.id);

                    function getSelectCategory(array) {
                        if(typeof array == 'object') {
                            for (let i = 0; i < array.length; i++) {
                                if(categoryIds.includes(array[i].id)) 
                                    array[i]["isSelect"] = "1";

                                if(array[i].children && array[i].children.length > 0)
                                {
                                    for (let j = 0; j < array[i].children.length; j++) {
                                        if(categoryIds.includes(array[i].children[j].id)) 
                                            array[i].children[j]["isSelect"] = "1";

                                        getSelectCategory(array[i].children[j]);
                                    }
                                }
                            }
                        }
                    }

                    getSelectCategory(_this.categories);
                }
            },
            categories(val) {
                const _this = this;
                if(_this.categories && _this.product?.categories) {
                    let categoryIds = _this.product?.categories.map(x => x.id);

                    function getSelectCategory(array) {
                        if(typeof array == 'object') {
                            for (let i = 0; i < array.length; i++) {
                                if(categoryIds.includes(array[i].id)) 
                                    array[i]["isSelect"] = "1";

                                if(array[i].children && array[i].children.length > 0)
                                {
                                    for (let j = 0; j < array[i].children.length; j++) {
                                        if(categoryIds.includes(array[i].children[j].id)) 
                                            array[i].children[j]["isSelect"] = "1";

                                        getSelectCategory(array[i].children[j]);
                                    }
                                }
                            }
                        }
                    }

                    getSelectCategory(_this.categories);
                }
            }
        },
        computed: {
            properties1() {
                if(this.selectedPropertyCategory1 && this.property_categories?.length > 0) {
                    return this.property_categories?.find(x => x.id == this.selectedPropertyCategory1)?.properties || [];
                }
                else
                    return [];
            },
            properties2() {
                if(this.selectedPropertyCategory2 && this.property_categories?.length > 0) {
                    return this.property_categories?.find(x => x.id == this.selectedPropertyCategory2)?.properties || [];
                }
                else
                    return [];
            }
        },
        methods: {
            eventWindowResize() {
                this.isMobile = window.screen.width > 768 ? false : true;
            },
            scrollToView(element){
                let offsetTop = document.querySelector(element).offsetTop;
                window.scrollTo(0, offsetTop + 80)
            },
            saveProduct() {
                var _this = this;
                _this.product["category_ids"] = [];
                function getSelectCategory(array,key) {
                    if(typeof array == 'object') {
                        for (let i = 0; i < array.length; i++) {
                            if(array[i]["isSelect"] == "1") {
                                _this.product.category_ids.push(array[i].id);
                            }
                            if(array[i].children && array[i].children.length > 0)
                            {
                                for (let j = 0; j < array[i].children.length; j++) {
                                    if(array[i].children[j]["isSelect"] == "1") {
                                        _this.product.category_ids.push(array[i].children[j].id);
                                    }
                                    getSelectCategory(array[i].children[j]);
                                }
                            }
                        }
                    }
                }

                getSelectCategory(_this.categories);

                if (_this.product.category_ids.length == 0) {
                    _this.$bvToast.toast('Kategori seçmelisiniz.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                    });
                    _this.scrollToView('#categoryList');
                    _this.tabIndex = 0;
                    return false;
                }

                if (!_this.$checkIsNullOrEmpty(_this.product.title)) {
                    _this.productsError.title = true;
                    _this.scrollToView('#pro_name_group');
                    _this.tabIndex = 1;
                    return false;
                }
                else
                    _this.productsError.title = false;

                if (!_this.$checkIsNullOrEmpty(_this.product.brand_id)) {
                    _this.productsError.brand = true;
                    _this.scrollToView('#brand_group');
                    _this.tabIndex = 1;
                    return false;
                }
                else
                    _this.productsError.brand = false;                

                if (!_this.$checkIsNullOrEmpty(_this.product.stock_unit)) {
                    _this.productsError.stock_unit = true;
                    _this.scrollToView('#stock_unit_group');
                    _this.tabIndex = 3;
                    return false;
                }
                else
                    _this.productsError.stock_unit = false;

                if (!_this.$checkIsNullOrEmpty(_this.product.stock)) {
                    _this.productsError.stock = true;
                    _this.scrollToView('#stock_group');
                    _this.tabIndex = 3;
                    return false;
                }
                else
                    _this.productsError.stock_unit = false;

                if (!_this.$checkIsNullOrEmpty(_this.product.buying_price)) {
                    _this.productsError.buying_price = true;
                    _this.scrollToView('#buying_price_group');
                    _this.tabIndex = 3;
                    return false;
                }
                else
                    _this.productsError.buying_price = false;

                if (!_this.$checkIsNullOrEmpty(_this.product.selling_price)) {
                    _this.productsError.selling_price = true;
                    _this.scrollToView('#selling_price_group');
                    _this.tabIndex = 3;
                    return false;
                }
                else
                    _this.productsError.selling_price = false;
                    
                if (!_this.$checkIsNullOrEmpty(_this.product.currency_id)) {
                    _this.productsError.currency_id = true;
                    _this.scrollToView('#currency_group');
                    _this.tabIndex = 3;
                    return false;
                }
                else
                    _this.productsError.currency_id = false;
                

                _this.productsOverlay = true;

                _this.product.user_id = _this.$store.state._userId;
                _this.$repositories.product.update(_this.product.id,_this.product)
                .then(res => {
                    if (res.data.success == 'success') {
                        _this.$bvToast.toast('Kayıt başarıyla keydedildi.', {
                            title: `Başarılı..`,
                            variant: 'success',
                            autoHideDelay: 500,
                            solid: true
                        });

                        setTimeout(() => {
                            _this.productsOverlay = false;
                            _this.$router.push("/admin/product/");
                        }, 2000)
                    }
                    else {
                        _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.productsOverlay = false;
                    }
                });
            },
            saveProductLanguage(){
                var _this = this;
                if (_this.productLanguage.title != "") {
                    _this.productLanguage.product_id = _this.product.id;
                    _this.productLanguage.user_id = _this.$store.state._userId;
                    _this.productLanguageOverlay = true;

                    let reqData = [];
                    reqData.push(_this.productLanguage);
                    _this.$repositories.product.updateLanguage(reqData)
                    .then(res => {
                        if (res.data.success == "success") {
                            this.$bvToast.toast("Kayıt başarıyla güncellendi.", {
                                title: `Başarılı..`,
                                variant: "success",
                                autoHideDelay: 500,
                                solid: true
                            });
                        }
                        else {
                            this.$bvToast.toast("Kayıt başarısız.Bilgilerinizi kontrol ediniz.", {
                                title: `Başarısız..`,
                                variant: "danger",
                                autoHideDelay: 500,
                                solid: true
                            });
                        }

                        _this.productLanguageOverlay = false;
                    })
                    .catch(err => {
                        _this.productLanguageOverlay = false;
                    })
                }
                else {
                    if (!_this.$checkIsNullOrEmpty(_this.productLanguageError.title))
                        _this.productLanguageError.title = true;
                }
            },
            saveSubProduct(){
                const _this = this;
                _this.product.sub_products = _this.product.sub_products.map(item => {
                    item.property1_category_id = _this.selectedPropertyCategory1;
                    item.property2_category_id = _this.selectedPropertyCategory2;
                    item["user_id"] = _this.$store.state._userId;
                    return item;
                })
                _this.$repositories.sub_product.update(_this.product.sub_products)
                .then(res => {
                    if (res.data.success == 'success') {
                        _this.$bvToast.toast('Alt ürünler başarıyla güncellendi.', {
                            title: `Başarılı..`,
                            variant: 'success',
                            autoHideDelay: 500,
                            solid: true
                        });
                        
                        _this.$repositories.sub_product.getByProductId(_this.product.id)
                        .then(res => {
                            if (res.data.success == 'success') {
                                _this.product.sub_products = res.data.response;
                            }
                        });
                    }
                    else {
                        _this.$bvToast.toast('Güncelleme başarısız.Lütfen yöneticiyle iletişime geçiniz..', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });
                    }
                });
            },
            newSubProduct(){
                const _this = this;
                let reqData = [
                    {
                        "product_id":_this.product.id,
                        "property1_category_id":null,
                        "property1":null,
                        "property2_category_id":null,
                        "property2":null,
                        "barcode":null,
                        "buying_price":null,
                        "selling_price":null,
                        "discounted_selling_price":null,
                        "stock":0,
                        "is_active":0,
                        "user_id": _this.$store.state._userId
                    }
                ];
                _this.$repositories.sub_product.create(reqData)
                .then(res => {
                    if (res.data.success == 'success') {
                        _this.$bvToast.toast('Alt ürün başarıyla eklendi.', {
                            title: `Başarılı..`,
                            variant: 'success',
                            autoHideDelay: 500,
                            solid: true
                        });
                        
                        _this.$repositories.sub_product.getByProductId(_this.product.id)
                        .then(res => {
                            if (res.data.success == 'success') {
                                _this.product.sub_products = res.data.response;
                            }
                        });
                    }
                    else {
                        _this.$bvToast.toast('Ekleme başarısız.Lütfen yöneticiyle iletişime geçiniz..', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });
                    }
                });
            },
            subProductDelete(id){
                const _this = this;
                _this.$bvModal.msgBoxConfirm("Alt ürünü silmek istediğinize emin misiniz?", {
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "success",
                    okTitle: "Evet",
                    cancelVariant: "danger",
                    cancelTitle: "Hayır",
                    footerClass: "py-2 px-4",
                    hideHeaderClose: false
                })
                .then(value => {
                    if (value) {
                        let reqData = [
                            {
                                id: id,
                                user_id: _this.$store.state._userId
                            }
                        ]
                        _this.$repositories.sub_product.delete(reqData)
                        .then(res => {
                            if (res.data.success == 'success') {
                                _this.$bvToast.toast('Alt ürünler başarıyla silindi.', {
                                    title: `Başarılı..`,
                                    variant: 'success',
                                    autoHideDelay: 500,
                                    solid: true
                                });
                                
                                _this.$repositories.sub_product.getByProductId(_this.product.id)
                                .then(res => {
                                    if (res.data.success == 'success') {
                                        _this.product.sub_products = res.data.response;
                                    }
                                });
                            }
                            else {
                                _this.$bvToast.toast('Silme işlemi başarısız.Lütfen yöneticiyle iletişime geçiniz..', {
                                    title: `Başarısız..`,
                                    variant: 'danger',
                                    autoHideDelay: 500,
                                    solid: true
                                });
                            }
                        });
                    }
                })
            },
            getProductDetail() {
                var _this = this;
                _this.productsOverlay = true;
                _this.$repositories.product.getById(_this.$route.query.id).then(res => {
                    if(res?.data?.response && res?.data?.response.length > 0) {
                        _this.productsOverlay = false;
                        _this.product = res.data.response[0];

                        if(_this.product?.sub_products?.length > 0) {
                            _this.product.sub_products.forEach(item => {
                                if(_this.$checkIsNullOrEmpty(item.property1_category_id))
                                    _this.selectedPropertyCategory1 = item.property1_category_id;

                                if(_this.$checkIsNullOrEmpty(item.property2_category_id))
                                    _this.selectedPropertyCategory2 = item.property2_category_id;
                            })
                        }
                    }
                    else {
                        _this.$bvToast.toast('Ürün bulunamadı. Ekleme sayfasında yönlendiriliyorsunuz..', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 2000,
                            solid: true
                        });

                        setTimeout(() => {
                            _this.$router.push('/admin/product/add')
                        },2000)
                    }
                })
                .catch(err => {
                    _this.productsOverlay = false;
                })
            },
            changeLanguage(){
                var _this = this;
                _this.$repositories.product.getProductByLanguage(_this.product.id, _this.selectedLanguage).then(res => {
                    if(res && res.data && res.data.response && res.data.response.length > 0)
                        _this.productLanguage = res.data.response[0];
                    else 
                        _this.resetProductLanguage();
                });
            },
            resetProductLanguage(){
                this.productLanguage = {
                    product_id: null,
                    title: null,
                    short_description: null,
                    description: "",
                    seo_title: null,
                    seo_description: null,
                    seo_keywords: null,
                    language:this.selectedLanguage,
                    user_id:null
                }
            },
            deleteProductImage(index) {
                this.product.images.splice(index, 1);
            },
            deleteImage(index) {
                this.imageList.splice(index, 1);
            },
            openFileInput() {
                document.querySelector('[name="imageFile"]').click();
            },
            async uploadImage() {
                var _this = this;
                let formData = new FormData();

                _this.imageList.forEach(item => {
                    formData.append('files', item.image);
                });

                _this.$repositories.image.uploadProductImages(formData)
                .then(res => {
                    if(_this.product.images && typeof _this.product.images == 'object')
                        _this.product.images.push(...res.data.images);
                    else {
                        _this.product.images = [];
                        _this.product.images.push(...res.data.images);
                    }

                    _this.$repositories.product.updateProductImage(_this.product.id,_this.product.images)
                    .then(res => {
                        if (res.data.success == 'success') {
                            _this.$bvToast.toast('Resimler başarıyla keydedildi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });

                            _this.getProductDetail();
                        }
                        else {
                            _this.$bvToast.toast('Resimler kaydedilirken bir hata oluştu.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                        }
                    });

                    _this.imageList = [];
                })
                .catch(err => {
                    console.log(err);
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
                        if (res.loaded > 300000) {
                            _this.$bvToast.toast("Görsel büyüklüğü 300kb'tan küçük olmalıdır.", {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                        }
                        else {
                            res["name"] = files[index].name;
                            res["image"] = files[index];
                            var img = new Image;
                            img.onload = function () {
                                _this.imageList.push(res);
                            };
                            img.src = res.srcElement.result;
                        }
                    });
                }
            },
            async getLanguages() {
                var _this = this;
                _this.$repositories.language.getAll().then(res => {
                    _this.languages = res.data.response;
                });
            },
            async getCategories() {
                var _this = this;
                _this.$repositories.category.get().then(res => {
                    var map = {}, node, roots = [], i, results = res.data.response;
                    for (i = 0; i < results.length; i += 1) {
                        map[results[i].id] = i;
                        results[i]["children"] = [];
                    }
                    for (i = 0; i < results.length; i += 1) {
                        node = results[i];
                        if (node.parent_id !== null) {
                            results[map[node.parent_id]].children.push(node);
                            results["isFolder"] = true;
                        }
                        else {
                            roots.push(node);
                            results["isFolder"] = false;
                        }
                    }
                    _this.categories = roots;
                });
            },
            getBrands() {
                var _this = this;
                _this.$repositories.brand.getAll().then(res => {
                    _this.brands = res.data.response;
                });
            },
            getModels() {
                var _this = this;
                _this.$repositories.model.getAll().then(res => {
                    _this.models = res.data.response;
                });
            },
            async getCurrencyList() {
                var _this = this;
                _this.$repositories.product.getCurrencyList().then(res => {
                    _this.currencyList = res.data.response;
                });
            },
            getPropertyCategories() {
                var _this = this;
                _this.$repositories.sub_product.getPropertyCategoryGroup().then(res => {
                    _this.property_categories = res.data.response;
                });
            },
        },
        mounted() {
            var _this = this;
            _this.isMobile = window.screen.width > 768 ? false : true;
            window.addEventListener("resize", _this.eventWindowResize);
        },
        async created() {
            this.getProductDetail();
            this.getLanguages();
            this.getCategories();
            this.getBrands();
            this.getModels();
            this.getCurrencyList();
            this.getPropertyCategories();
        }
    }
</script>
 
<style scoped>
    .product-image {
        border: 1px solid #cdcdcd;
        border-radius: 5px;
    }
    .product-image-delete {
        position: absolute;
        top: 0;
        right: 5px;
        width: 25px;
        height: 25px;
        line-height: 25px;
        font-size: 20px;
        color: #f00;
        text-align: center;
        cursor: pointer;
    }

    .alert-update-product{
        position: fixed;
        left:10px;
        bottom:0;
        z-index:9999;
    }
</style>
 