<template>
    <div class="admin-order" id="adminOrder">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 my-4">
                    <h3>
                        Siparişler
                    </h3>

                    <div class="row mt-3">
                        <b-form-group class="col-6 col-md-4 col-lg-3 col-xl-2" id="filter_order_code_group"
                            label="Sipariş Numarası" label-for="filter_order_code_input" description="">
                            <b-form-input @keyup.enter="getOrders" id="filter_order_code_input"
                                v-model="reqData.filters.order_code" type="text" name="filter_order_code"
                                placeholder="sipariş numarası.."></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-6 col-md-4 col-lg-3 col-xl-2" id="filter_customer_name_group"
                            label="Müşteri Adı" label-for="filter_customer_name_input" description="">
                            <b-form-input @keyup.enter="getOrders" id="filter_customer_name_input"
                                v-model="reqData.filters.customer_name" type="text" name="filter_customer_name"
                                placeholder="müşteri adı.."></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-6 col-md-4 col-lg-3 col-xl-2" id="filter_customer_surname_group"
                            label="Müşteri Soyadı" label-for="filter_customer_surname_input" description="">
                            <b-form-input @keyup.enter="getOrders" id="filter_ws_code_input"
                                v-model="reqData.filters.customer_surname" type="text" name="filter_customer_surname"
                                placeholder="müşteri soyadı.."></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-6 col-md-4 col-lg-3 col-xl-2" id="filter_phone" label="Telefon"
                            label-for="filter_phone" description="">
                            <b-form-input @keyup.enter="getOrders" id="filter_phone" v-model="reqData.filters.phone"
                                type="text" name="phone" placeholder="telefon.."></b-form-input>
                        </b-form-group>

                        <b-form-group v-if="orderStatusList" class="col-6 col-md-4 col-lg-3 col-xl-2"
                            id="order_status_list_group" label="Sipariş Süreci" label-for="order_status_list_select"
                            description="Birden fazla sipariş süreci seçebilirsiniz.">
                            <v-select v-model="selectedOrderStatus" placeholder="Sipariş Süreci" multiple
                                :options="orderStatusList" label="name" :reduce="s => s.id"></v-select>
                        </b-form-group>

                        <b-form-group class="col-6 col-md-3 col-lg-2 col-xl-1" id="search_button_group" label="Ara"
                            label-for="search_button" description="">
                            <b-button class="float-left w-100 d-flex align-items-center justify-content-center"
                                type="button" @click="getOrders" size="md" variant="primary">
                                <b-icon-search variant="white" font-scale="0.8" class="mr-2"></b-icon-search>
                                Ara
                            </b-button>
                        </b-form-group>
                    </div>

                    <div class="row mt-4">
                        <div class="col-12 mb-2">
                            <NuxtLink to="/admin/order/add" class="btn btn-secondary btn-sm">
                                + Sipariş Oluştur
                            </NuxtLink>
                            <span class="float-right">
                                <strong>{{ paging.total }}</strong> sipariş listeleniyor.
                            </span>
                        </div>
                        <div class="col-12">                            
                            <table v-if="orders" class="table table-bordered table-sm table-responsive-lg" id="ordersTable">
                                <thead class="table-secondary text-nowrap">
                                    <tr>
                                        <th>{{ $t('detail') }}</th>
                                        <th>{{ $t('orderCode') }}</th>
                                        <th>{{ $t('email') }}</th>
                                        <th>{{ $t('fullname') }}</th>
                                        <th>{{ $t('country') }}</th>
                                        <th>{{ $t('city') }}</th>
                                        <th>{{ $t('state') }}</th>
                                        <th>{{ $t('date') }}</th>
                                        <th>{{ $t('price') }}</th>
                                        <th>{{ $t('currency') }}</th>
                                        <th>{{ $t('paymentType') }}</th>
                                        <th>{{ $t('bank') }}</th>
                                        <th>{{ $t('cargo') }}</th>
                                        <th>{{ $t('orderStatus') }}</th>
                                        <th>{{ $t('delete') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(O, index) in orders" :key="`products${index}`">
                                        <td>
                                            <NuxtLink :to="`/admin/order/detail/${O.id}`" id="orderDetail">
                                                <b-icon icon="pencil" font-scale="1"></b-icon>
                                            </NuxtLink>
                                        </td>
                                        <td>{{ O.order_code }}</td>
                                        <td>{{ O.email }}</td>
                                        <td>{{ O.name_surname }}</td>
                                        <td>{{ O.delivery_country }}</td>
                                        <td>{{ O.delivery_city }}</td>
                                        <td>{{ O.delivery_state }}</td>
                                        <td>{{ O.createdAt | dateTimeFormat }}</td>
                                        <td>{{ O.total_price | currencyFormat }}</td>
                                        <td>{{ O.currency_name }}</td>
                                        <td>{{ O.payment_type_name }}</td>
                                        <td>{{ O.payment_description }}</td>
                                        <td>{{ O.cargo_name }}</td>
                                        <td>
                                            <div>
                                                <v-select v-model="O.order_status_id" placeholder="Sipariş Süreci"
                                                    @input="changeOrderStatus(O.id, O.order_status_id)"
                                                    :clearable="false" :options="orderStatusList" label="name"
                                                    :reduce="s => s.id"></v-select>
                                            </div>
                                        </td>
                                        <td>
                                            <b-icon icon="trash" variant="danger" font-scale="1" id="orderDelete"
                                                @click="deleteProduct(O.id)"></b-icon>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <b-skeleton-table v-else :rows="30" :columns="15"
                                :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <b-pagination v-model="paging.currentPage" :total-rows="paging.total" :per-page="30"
                                :first-text="$t('first')" :prev-text="$t('prev')" :next-text="$t('next')"
                                :last-text="$t('last')" pills>
                            </b-pagination>
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
        name: "AdminOrder",
        middleware: "adminAuthenticated",
        layout: "admin",
        head() {
            return {
                title: "Admin Sipariş Sayfası"
            };
        },
        data() {
            return {
                orders: undefined,
                orderStatusList: [],
                selectedOrderStatus: [],
                orderOverlay: false,
                paging: {
                    currentPage: 1,
                    total: undefined,
                    start: 0,
                    end: 30
                },
                reqData: {
                    filters: {
                        statuses: null,
                        payment_types: null,
                        price: null,
                        customer_name: null,
                        customer_surname: null,
                        order_code: null,
                        phone: null,
                        recipient_name: null
                    },
                    paging: {
                        start: 0,
                        end: 30
                    }
                }
            };
        },
        watch: {
            'paging.currentPage'() {
                this.getOrders();
            }
        },
        methods: {
            changeOrderStatus(order_id, order_status_id) {
                const _this = this;
                _this.$repositories.order.changeOrderStatus({
                    order_id: order_id,
                    order_status_id: order_status_id
                })
                    .then(res => {
                        console.log(res);
                        _this.getOrders();
                    })
            },
            async deleteOrder(order_id) {
                var _this = this;
                _this.$bvModal.msgBoxConfirm("Siparişi silmek istediğinize emin misiniz?", {
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
                            _this.orderOverlay = true;
                            _this.$repositories.order.delete(order_id, { user_id: _this.$store.state._userId })
                                .then(res => {
                                    if (res.data.success == "success") {
                                        _this.$bvToast.toast("Sipariş başarıyla silindi.", {
                                            title: `Başarılı..`,
                                            variant: "success",
                                            autoHideDelay: 500,
                                            solid: true
                                        });
                                        _this.getOrders();
                                    }
                                    else {
                                        _this.$bvToast.toast("Kategori silinemedi.Sayfayı yenileyip tekrar deneyiniz.", {
                                            title: `Başarısız..`,
                                            variant: "danger",
                                            autoHideDelay: 1500,
                                            solid: true
                                        });
                                    }

                                    _this.orderOverlay = false;
                                })
                                .catch(err => {
                                    _this.orderOverlay = false;
                                });
                        }
                    })
            },
            getOrders() {
                const _this = this;
                _this.orders = undefined;
                _this.reqData.paging.start = (_this.paging.currentPage - 1) * 30;
                _this.reqData.paging.end = _this.paging.end;
                _this.reqData.filters.statuses = _this.selectedOrderStatus.join('-');

                _this.$repositories.order.getOrders(_this.reqData)
                    .then(res => {
                        if (res && res.data) {
                            _this.orders = res.data.response.orders;
                            _this.paging.total = res.data.response.total;
                        }
                    })
            },
            async getOrderStatusList() {
                var _this = this;
                _this.$repositories.order.getOrderStatusList().then(res => {
                    _this.orderStatusList = res.data.response || [];
                });
            },
        },
        async created() {
            this.getOrders();
            this.getOrderStatusList();
        }
    }
</script>

<style scoped>
.hover-image {
    position: relative;
}

.hover-image .image {
    display: none;
    position: absolute;
    top: 0;
    left: 100%;
    width: max-content;
    border: 2px solid #898383;
    border-radius: 5px;
}

.hover-image:hover .image {
    display: block;
}

.popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #00000040;
    z-index: 9999999999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-content {
    background: #ffffff;
    position: relative;
}

.popup-close {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    font-size: 30px;
    line-height: 15px;
    height: 20px;
    cursor: pointer;
    z-index: 1;
}
</style>
