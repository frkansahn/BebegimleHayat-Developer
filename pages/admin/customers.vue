<template>
    <div class="admin-customers" id="adminCustomers">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row mt-4">
                <div class="col-12 mb-4">
                    <h3>
                        Üyelikler
                    </h3>
                    <table class="table table-sm mt-3" id="adminCustomersTable">
                        <thead class="table-secondary">
                            <tr>
                                <th>İsim</th>
                                <th>Soyisim</th>
                                <th>Email</th>
                                <th>Telefon</th>
                                <th>TC Kimlik</th>
                                <th>Kayıt Tarihi</th>
                                <th>Detay</th>
                                <th>Düzenle</th>
                            </tr>
                        </thead>
                        <tbody class="table-light">
                            <tr v-for="(C, index) in customersList" :key="`bodyCustomers${index}`">
                                <td>
                                    {{ C.name }}
                                </td>
                                <td>
                                    {{ C.surname }}
                                </td>
                                <td>
                                    {{ C.email }}
                                </td>
                                <td>
                                    {{ C.phone }}
                                </td>
                                <td>
                                    {{ C.tc_kimlik }}
                                </td>
                                <td>
                                    {{ C.createdAt | dateFormat }}
                                </td>
                                <td>
                                    <NuxtLink :to="`/admin/customer-detail/${C.id}`" class="btn btn-sm btn-secondary">
                                        Detay
                                    </NuxtLink>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-primary d-flex align-items-center"
                                        @click="editCustomer(C)">
                                        <b-icon-pencil variant="light" font-scale="0.9" class="mr-2"></b-icon-pencil>
                                        Düzenle
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="paging" id="customersPagging"></div>
                </div>
            </div>
        </div>
        <transition name="page-transition" mode="out-in">
            <div class="popup" id="edit_customer" v-if="edit_customer">
                <b-overlay :show="editCustomerOverlay" no-wrap></b-overlay>
                <div class="popup-content col-md-4 p-4">
                    <div class="popup-close" @click="edit_customer = undefined;">
                        &times;
                    </div>
                    <b-form>
                        <b-form-group id="name_group" label="İsim" label-for="name_input" description="">
                            <b-form-input :class="[customerError.name ? 'border-danger' : 'border-dark']" id="name_input"
                                v-model="edit_customer.name" type="text" name="name" placeholder="İsminiz"
                                @click="customerError.name = false" required disabled></b-form-input>
                        </b-form-group>

                        <b-form-group id="surname_group" label="Soyisim" label-for="surname_input" description="">
                            <b-form-input :class="[customerError.surname ? 'border-danger' : 'border-dark']"
                                id="surname_input" v-model="edit_customer.surname" type="text" name="surname"
                                placeholder="Soyisminiz" @click="customerError.surname = false" required disabled>
                            </b-form-input>
                        </b-form-group>

                        <b-form-group id="tc_kimlik_group" label="TC Kimlik" label-for="tc_kimlik_input" description="">
                            <b-form-input :class="[customerError.tc_kimlik ? 'border-danger' : 'border-dark']"
                                id="tc_kimlik_input" v-model="edit_customer.tc_kimlik" type="number" name="uniqueId"
                                placeholder="Tc Kimlik Numarası" maxlength="11" @click="customerError.tc_kimlik = false"
                                required disabled></b-form-input>
                        </b-form-group>

                        <b-form-group class="position-relative" id="password_group" label="Şifre"
                            label-for="password_input" description="">
                            <b-form-input :class="[customerError.password ? 'border-danger' : 'border-dark']"
                                id="password_input" v-model="edit_customer.password" type="text" name="password"
                                placeholder="Şifre" @click="customerError.password = false" required>
                            </b-form-input>
                        </b-form-group>

                        <b-form-group id="email_group" label="Email" label-for="email_input" description="">
                            <b-form-input :class="[customerError.email ? 'border-danger' : 'border-dark']" name="email"
                                id="email_input" v-model="edit_customer.email" type="text" placeholder="Emailiniz"
                                @click="customerError.email = false" required></b-form-input>
                        </b-form-group>

                        <b-form-group id="phone_group" label="Telefon" label-for="phone_input" description="">
                            <b-form-input :class="[customerError.phone ? 'border-danger' : 'border-dark']"
                                id="phone_input" name="phone" v-model="edit_customer.phone" type="text"
                                v-mask="'0(###)-###-##-##'" placeholder="Telefon numaranız"
                                @click="customerError.phone = false" required></b-form-input>
                        </b-form-group>

                        <div class="row mt-4">
                            <div class="col-12 col-md-6 m-auto">
                                <b-button class="col-12" type="button" @click="saveCustomer" squared size="lg"
                                    variant="primary">
                                    Kaydet
                                </b-button>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default
    {
        name: 'AdminCustomers',
        layout: 'admin',
        head() {
            return {
                title: "Admin Müşteriler Sayfası"
            }
        },
        data() {
            return {
                pageLoading: false,
                customers: [],
                edit_customer: undefined,
                customersStart: 0,
                customersEnd: 15,
                customerError: {
                    name: false,
                    surname: false,
                    tc_kimlik: false,
                    password: false,
                    phone: false,
                    email: false
                },
                editCustomerOverlay: false
            }
        },
        methods: {
            editCustomer(customer) {
                this.edit_customer = Object.assign({}, customer);
            },
            async getCustomersByAdmin() {
                var _this = this;
                var token = _this.$cookiz.get("admintoken");
                _this.$store.dispatch('getService', { "urlParameter": "/api/v1/customer", "token": token })
                    .then(response => {
                        if (response) {
                            _this.customers = response;
                            _this.pagination("#customersPagging", response.length);
                        }

                    });
            },
            async saveCustomer() {
                var _this = this;
                var token = _this.$cookiz.get("admintoken");
                if (_this.edit_customer.password != '' && _this.$checkEmail(_this.edit_customer.email) && _this.edit_customer.phone.replace(/\D/g, '').length == 11) {
                    _this.editCustomerOverlay = true;
                    _this.edit_customer.phone = Number(_this.edit_customer.phone.replace(/\D/g, ''));
                    _this.$store.dispatch('postService', { "data": _this.edit_customer, "urlParameter": "/api/v1/customer/update/admin/" + _this.edit_customer.id, "token": token })
                        .then(response => {
                            if (response.success == "success") {
                                this.$bvToast.toast('Kayıt başarıyla güncellendi.', {
                                    title: `Başarılı..`,
                                    variant: 'success',
                                    autoHideDelay: 3000,
                                    solid: true
                                });

                                setTimeout(() => {
                                    _this.edit_customer = undefined;
                                    _this.editCustomerOverlay = false;
                                    _this.getCustomersByAdmin();
                                }, 2000)
                            }
                            else {
                                _this.editCustomerOverlay = false;
                                this.$bvToast.toast('Kayıt güncelleme başarısız.Bilgilerinizi kontrol ediniz.', {
                                    title: `Başarısız..`,
                                    variant: 'danger',
                                    autoHideDelay: 500,
                                    solid: true
                                });
                            }
                        });
                }
                else {
                    if (_this.edit_customer.password == '' || _this.edit_customer.password == null || _this.edit_customer.password == undefined)
                        _this.customerError.password = true;

                    if (_this.edit_customer.email == '' || _this.edit_customer.email == null || _this.edit_customer.email == undefined)
                        _this.customerError.email = true;

                    if (_this.edit_customer.phone == '' || _this.edit_customer.phone == null || _this.edit_customer.phone == undefined)
                        _this.customerError.phone = true;

                }
            },
            pagination(selector, count) {
                var _this = this;
                var pagingOptions = {
                    totalCount: count,
                    itemPerPage: 15,
                    initialPage: 1,
                    get totalPage() {
                        return Math.ceil(this.totalCount / this.itemPerPage)
                    },
                    location: selector
                }

                var paging = {
                    append: ({ output, location }) => {
                        const holder = document.querySelector(location);

                        if (holder) {
                            holder.innerHTML = output;
                        }
                    },
                    bindEventHandlers: options => {
                        const nextButton = document.querySelector(".paging__btn--next"),
                            prevButton = document.querySelector(".paging__btn--back"),
                            pageButtons = document.querySelectorAll(
                                ".paging__btn:not(.paging__btn--nav):not(.paging__btn--disabled)"
                            );

                        nextButton.addEventListener("click", () => {
                            paging.handleNextClick(options);
                        });
                        prevButton.addEventListener("click", () => {
                            paging.handlePrevClick(options);
                        });
                        Array.prototype.forEach.call(pageButtons, button => {
                            button.addEventListener("click", event => {
                                paging.handleItemClick(event, options);
                            });
                        });
                    },
                    createButton: ({ direction, isActive = true, text, isCurrent, index }) => {
                        const directionClass =
                            direction === "back"
                                ? "paging__btn--nav paging__btn--back"
                                : direction === "next"
                                    ? "paging__btn--nav paging__btn--next"
                                    : "",
                            buttonText =
                                direction === "back"
                                    ? "&laquo;"
                                    : direction === "next"
                                        ? "&raquo;"
                                        : text,
                            activeClass = !isActive ? "paging__btn--disabled" : "",
                            currentClass = isCurrent ? "paging__btn--current" : "",
                            modifiers = [activeClass, currentClass, directionClass],
                            buttonHtml = `<button data-page-index="${index}" class="paging__btn ${modifiers.join(
                                " "
                            )}"> ${buttonText} </button>`;

                        return buttonHtml;
                    },
                    createPaging: (options, callback) => {
                        const { location, initialPage, totalPage } = options,
                            backButton = paging.createButton({
                                direction: "back",
                                isActive: initialPage !== 1
                            }),
                            nextButton = paging.createButton({
                                direction: "next",
                                isActive: initialPage !== totalPage
                            });

                        let output = backButton;

                        if (initialPage > totalPage) {
                            return false;
                        }

                        if (totalPage > 6) {
                            let conditionInit, condition;

                            if (initialPage === totalPage) {
                                conditionInit = totalPage - 5;
                                condition = totalPage + 1;
                            } else if (initialPage === totalPage - 1) {
                                conditionInit = initialPage - 4;
                                condition = totalPage + 1;
                            } else if (initialPage === totalPage - 2) {
                                conditionInit = initialPage - 3;
                                condition = totalPage + 1;
                            } else if (initialPage === totalPage - 3) {
                                conditionInit = initialPage - 2;
                                condition = totalPage + 1;
                            } else if (initialPage === totalPage - 4) {
                                conditionInit = initialPage - 1;
                                condition = totalPage + 1;
                            } else {
                                conditionInit = initialPage;
                                condition = initialPage + 4;
                            }

                            for (let i = conditionInit; i < condition; i++) {
                                output += paging.createButton({
                                    text: i,
                                    isCurrent: i === initialPage,
                                    index: i
                                });
                            }
                            let moreButton = "",
                                lastButton = "";

                            if (initialPage < totalPage - 4) {
                                moreButton = paging.createButton({
                                    text: "...",
                                    isActive: false,
                                    index: ""
                                });
                            }

                            output += moreButton;

                            if (initialPage < totalPage - 3) {
                                lastButton = paging.createButton({
                                    text: totalPage,
                                    isCurrent: totalPage === initialPage,
                                    index: totalPage
                                });
                            }

                            output += lastButton;
                        } else {
                            for (let i = 0; i < totalPage; i++) {
                                output += paging.createButton({
                                    text: i + 1,
                                    isCurrent: i + 1 === initialPage,
                                    index: i + 1
                                });
                            }
                        }

                        output += nextButton;

                        paging.append({
                            output,
                            location
                        });

                        callback();
                    },
                    init: options => {
                        paging.createPaging(options, () => {
                            paging.bindEventHandlers(options);
                        });
                    },
                    handleItemClick: (event, options) => {
                        let { itemPerPage } = pagingOptions;
                        const clickedIndex = parseInt(event.target.dataset.pageIndex);

                        if (
                            typeof clickedIndex !== "undefined" &&
                            clickedIndex !== options.initialPage &&
                            clickedIndex <= options.totalPage
                        ) {
                            options.initialPage = clickedIndex;
                            paging.init(options);
                        }

                        _this.newsStart = clickedIndex * itemPerPage - itemPerPage;
                        _this.newsEnd = clickedIndex * itemPerPage;
                        _this.$forceUpdate();
                    },
                    handleNextClick: pagingOptions => {
                        let { initialPage, totalPage, itemPerPage } = pagingOptions;

                        if (initialPage !== totalPage) {
                            initialPage += 1;
                        } else {
                            return false;
                        }

                        pagingOptions.initialPage = initialPage;

                        paging.init(pagingOptions);
                        _this.newsStart = (initialPage * itemPerPage - itemPerPage);
                        _this.newsEnd = initialPage * itemPerPage;
                        _this.$forceUpdate();
                    },
                    handlePrevClick: pagingOptions => {
                        let { initialPage, itemPerPage } = pagingOptions;

                        if (initialPage !== 1) {
                            initialPage -= 1;
                        } else {
                            return false;
                        }

                        pagingOptions.initialPage = initialPage;

                        paging.init(pagingOptions);
                        _this.newsStart = (initialPage * itemPerPage - itemPerPage);
                        _this.newsEnd = initialPage * itemPerPage;
                        _this.$forceUpdate();
                    }
                }

                paging.init(pagingOptions);
            }
        },
        async created() {
            var _this = this;
            var token = _this.$cookiz.get("admintoken");
            var userId = _this.$cookiz.get("_userId");
            if (token && userId) {
                this.getCustomersByAdmin();
            }
            else {
                _this.$router.push("/admin/login");
            }
        },
        computed: {
            customersList() {
                return this.customers.slice(this.customersStart, this.customersEnd);
            },
        }
    }
</script>

<style>
</style>
