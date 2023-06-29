<template>
    <div class="add-product" id="addProduct">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 text-center mb-5">
                    <h1>
                        {{ $t('order') }}
                    </h1>
                </div>
                <div class="col-12" v-if="order">
                    <div class="row border-bottom mb-4">
                        <div class="col-6 col-md-4 col-lg-3 border-right">
                            <div class="row">
                                <div class="col-12 mb-4">
                                    <h3>
                                        Sipariş Bilgileri
                                    </h3>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Sipariş Süreci" description="">
                                        <v-select v-model="order.order_status_id"
                                            @input="changeOrderStatus(order.id, order.order_status_id)" :clearable="false"
                                            :options="orderStatusList" label="name" :reduce="s => s.id"></v-select>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Sipariş Numarası" description="">
                                        <b-form-input v-model="order.order_code" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Kargo" description="">
                                        <b-form-input v-model="order.cargo_name" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Toplam Ürün Adedi" description="">
                                        <b-form-input v-model="order.product_count" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Sipariş Tarihi" description="">
                                        <b-form-input :value="new Date(order.createdAt).toLocaleString()"
                                            disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Sipariş Notu" description="">
                                        <b-form-input v-model="order.general_note" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Hediye Çeki Var mı?" description="">
                                        <b-form-input :value="order.is_gift_cart == 1 ? 'Evet':'Hayır'" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Hediye Çeki Notu" description="">
                                        <b-form-textarea v-model="order.gift_note" disabled></b-form-textarea>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3 border-right">
                            <div class="row">
                                <div class="col-12 mb-4">
                                    <h3>
                                        Ödeme Bilgileri
                                    </h3>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Ödeme Tutarı" description="">
                                        <b-form-input disabled :value="order.total_price | currencyFormat">
                                        </b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Para Birimi" description="">
                                        <b-form-input v-model="order.currency_name"
                                            disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Ödeme Tipi" description="">
                                        <b-form-input v-model="order.payment_type_name" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Ödeme Açıklaması" description="">
                                        <!--- Havale ile ödemeyse -->
                                        <b-form-input v-model="order.payment_description" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3 border-right">
                            <div class="row">
                                <div class="col-12 mb-4">
                                    <h3>
                                        Teslimat Bilgileri
                                    </h3>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="İsim Soyisim" description="">
                                        <b-form-input disabled v-model="order.delivery_address.name_surname">
                                        </b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Email" description="">
                                        <b-form-input v-model="order.delivery_address.email"
                                            disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Telefon" description="">
                                        <b-form-input v-model="order.delivery_address.phone" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Ev Telefonu" description="">
                                        <b-form-input v-model="order.delivery_address.home_phone" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="İş Telefonu" description="">
                                        <b-form-input v-model="order.delivery_address.office_phone" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Ülke" description="">
                                        <b-form-input v-model="order.delivery_address.country_name" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="İl" description="">
                                        <b-form-input v-model="order.delivery_address.city_name" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="İlçe" description="">
                                        <b-form-input v-model="order.delivery_address.state_name" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Adres" description="">
                                        <b-form-input v-model="order.delivery_address.address" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Posta Kodu" description="">
                                        <b-form-input v-model="order.delivery_address.zip_code" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Şirket Adı" description="" v-if="order.delivery_address.type == 1">
                                        <b-form-input v-model="order.delivery_address.company_name" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Vergi Dairesi" description="" v-if="order.delivery_address.type == 1">
                                        <b-form-input v-model="order.delivery_address.tax_number" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Vergi Numarası" description="" v-if="order.delivery_address.type == 1">
                                        <b-form-input v-model="order.delivery_address.tax_office" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="row">
                                <div class="col-12 mb-4">
                                    <h3>
                                        Fatura Bilgileri
                                    </h3>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="İsim Soyisim" description="">
                                        <b-form-input disabled v-model="order.invoice_address.name_surname">
                                        </b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Kimlik Numarası" description="">
                                        <b-form-input disabled v-model="order.invoice_address.unique_id">
                                        </b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Email" description="">
                                        <b-form-input v-model="order.invoice_address.email"
                                            disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Telefon" description="">
                                        <b-form-input v-model="order.invoice_address.phone" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Ev Telefonu" description="">
                                        <b-form-input v-model="order.invoice_address.home_phone" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="İş Telefonu" description="">
                                        <b-form-input v-model="order.invoice_address.office_phone" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Ülke" description="">
                                        <b-form-input v-model="order.invoice_address.country_name" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="İl" description="">
                                        <b-form-input v-model="order.invoice_address.city_name" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="İlçe" description="">
                                        <b-form-input v-model="order.invoice_address.state_name" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Adres" description="">
                                        <b-form-input v-model="order.invoice_address.address" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Posta Kodu" description="">
                                        <b-form-input v-model="order.invoice_address.zip_code" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Şirket Adı" description="" v-if="order.invoice_address.type == 1">
                                        <b-form-input v-model="order.invoice_address.company_name" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Vergi Dairesi" description="" v-if="order.invoice_address.type == 1">
                                        <b-form-input v-model="order.invoice_address.tax_number" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-12">
                                    <b-form-group label="Vergi Numarası" description="" v-if="order.invoice_address.type == 1">
                                        <b-form-input v-model="order.invoice_address.tax_office" disabled></b-form-input>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <table v-if="order.products" class="table table-bordered table-sm table-responsive-lg" id="orderProductsTable">
                                <thead class="table-secondary text-nowrap">
                                    <tr>
                                        <th>{{ $t('image') }}</th>
                                        <th>{{ $t('productName') }}</th>
                                        <th>{{ $t('barcode') }}</th>
                                        <th>{{ $t('brand') }}</th>
                                        <th>{{ $t('model') }}</th>
                                        <th>{{ $t('category') }}</th>
                                        <th>{{ $t('vat') }}</th>
                                        <th>{{ $t('buyingPrice') }}</th>
                                        <th>{{ $t('sellingPrice') }}</th>
                                        <th>{{ $t('discountedPrice') }}</th>
                                        <th>{{ $t('currency') }}</th>
                                        <th>{{ $t('stock') }}</th>
                                        <th>{{ $t('sort') }}</th>
                                        <th>{{ $t('gotoProduct') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(P, index) in order.products" :key="`products${index}`">
                                        <td class="hover-image">
                                            <img :src="P.showcase_image.S" style="max-width:40px;" v-if="P.showcase_image"/>
                                        </td>
                                        <td>{{ P.title }}</td>
                                        <td>{{ P.barcode }}</td>
                                        <td>{{ P.brand_name }}</td>
                                        <td>{{ P.model_name }}</td>
                                        <td>{{ P.category_name }}</td>
                                        <td>{{ P.vat }}</td>
                                        <td>
                                            <span class="border-bottom border-dark py-1 px-2">
                                                {{ P.buying_price | currencyFormat }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="border-bottom border-dark py-1 px-2">
                                                {{ P.selling_price | currencyFormat }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="border-bottom border-dark py-1 px-2">
                                                {{ P.selling_price == P.discounted_selling_price ? '0.00' : P.discounted_selling_price | currencyFormat }}
                                            </span>
                                        </td>
                                        <td class="text-uppercase">{{ P.currency_code }}</td>
                                        <td>{{ P.stock }}</td>
                                        <td>
                                            <span class="border-bottom border-dark py-1 px-2">
                                                {{ P.sort }}
                                            </span>
                                        </td>
                                        <td>
                                            <a :href="`/product-detail/${P.seo_link}`" target="_blank"
                                                id="productUrl" class="btn btn-success btn-sm py-0">
                                                {{ $t('go') }}
                                            </a>
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
</template>

<script>
export default
    {
        name: 'AdminOrderDetail',
        middleware: 'adminAuthenticated',
        layout: "admin",
        data() {
            return {
                isMobile: false,
                order: undefined,
                orderStatusList: [],
            }
        },
        props: {

        },
        methods: {
            eventWindowResize() {
                this.isMobile = window.screen.width > 768 ? false : true;
            },
            getOrder() {
                const _this = this;
                _this.order = undefined;
                _this.$repositories.order.getOrder(_this.$route.params.id)
                    .then(res => {
                        if (res && res.data) {
                            _this.order = res.data.data
                        }
                    })
            },
            async getOrderStatusList() {
                var _this = this;
                _this.$repositories.order.getOrderStatusList().then(res => {
                    _this.orderStatusList = res.data.response || [];
                });
            },
            changeOrderStatus(order_id, order_status_id) {
                const _this = this;
                _this.order = undefined;
                _this.$repositories.order.changeOrderStatus({
                    order_id: order_id,
                    order_status_id: order_status_id
                })
                    .then(res => {
                        _this.getOrder();
                    })
            },
        },
        mounted() {
            var _this = this;
            _this.isMobile = window.screen.width > 768 ? false : true;
            window.addEventListener("resize", _this.eventWindowResize);
        },
        async created() {
            this.getOrder();
        }
    }
</script>

<style scoped>

</style>
