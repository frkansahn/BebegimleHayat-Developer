<template>
    <div class="admin-users" id="adminUsers">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row mt-4">
                <div class="col-12 mb-4">
                    <h3>
                        Kullanıcılar
                        <button @click="addUserPopup" id="addUsers" class="btn float-right text-secondary">
                            + Ekle
                        </button>
                    </h3>
                    <table class="table table-sm mt-3" id="adminUsersTable">
                        <thead class="table-secondary">
                            <tr>
                                <th>İsim</th>
                                <th>Soyisim</th>
                                <th>Email</th>
                                <th>Telefon</th>
                                <th>Kullanıcı Adı</th>
                                <th>Kayıt Tarihi</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table-light">
                            <tr v-for="(U, index) in usersList" :key="`bodyUsers${index}`">
                                <td>
                                    {{ U.name }}
                                </td>
                                <td>
                                    {{ U.surname }}
                                </td>
                                <td>
                                    {{ U.email }}
                                </td>
                                <td>
                                    {{ U.phone }}
                                </td>
                                <td>
                                    {{ U.username }}
                                </td>
                                <td>
                                    {{ U.createdAt | dateFormat }}
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-primary d-flex align-items-center"
                                        @click="editUser(U)">
                                        <b-icon-pencil variant="light" font-scale="0.9" class="mr-2"></b-icon-pencil>
                                        Düzenle
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-danger d-flex align-items-center"
                                        @click="deleteUser(U.id)">
                                        - Sil
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="paging" id="usersPagging"></div>
                </div>
            </div>
        </div>
        <transition name="page-transition" mode="out-in">
            <div class="popup" id="edit_user" v-if="edit_user">
                <b-overlay :show="editUserOverlay" no-wrap></b-overlay>
                <div class="popup-content col-md-4 p-4">
                    <div class="popup-close" @click="edit_user = undefined;">
                        &times;
                    </div>
                    <b-form>
                        <b-form-group id="name_group" label="İsim" label-for="name_input" description="">
                            <b-form-input :class="[userError.name ? 'border-danger' : 'border-dark']" id="name_input"
                                v-model="edit_user.name" type="text" name="name" placeholder="İsminiz"
                                @click="userError.name = false" required></b-form-input>
                        </b-form-group>

                        <b-form-group id="surname_group" label="Soyisim" label-for="surname_input" description="">
                            <b-form-input :class="[userError.surname ? 'border-danger' : 'border-dark']"
                                id="surname_input" v-model="edit_user.surname" type="text" name="surname"
                                placeholder="Soyisminiz" @click="userError.surname = false" required></b-form-input>
                        </b-form-group>

                        <b-form-group id="username_group" label="Kullanıcı Adı" label-for="username_input"
                            description="">
                            <b-form-input :class="[userError.username ? 'border-danger' : 'border-dark']"
                                id="username_input" v-model="edit_user.username" type="text" name="kullaniciAdi"
                                placeholder="Kullanıcı Adı" @click="userError.username = false" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="position-relative" id="password_group" label="Şifre"
                            label-for="password_input" description="">
                            <b-form-input :class="[userError.password ? 'border-danger' : 'border-dark']"
                                id="password_input" v-model="edit_user.password" type="text" name="sifre"
                                placeholder="Şifre" @click="userError.password = false" required>
                            </b-form-input>
                        </b-form-group>

                        <b-form-group id="email_group" label="Email" label-for="email_input" description="">
                            <b-form-input class="border-dark" name="email" id="email_input" v-model="edit_user.email"
                                type="text" placeholder="Emailiniz" required></b-form-input>
                        </b-form-group>

                        <b-form-group id="phone_group" label="Telefon" label-for="phone_input" description="">
                            <b-form-input class="border-dark" id="phone_input" name="phone" v-model="edit_user.phone"
                                type="text" v-mask="'0(###)-###-##-##'" placeholder="Telefon numaranız" required>
                            </b-form-input>
                        </b-form-group>

                        <div class="row mt-4">
                            <div class="col-12 col-md-6 m-auto">
                                <b-button class="col-12" type="button" @click="updateUser" squared size="lg"
                                    variant="primary">
                                    Kaydet
                                </b-button>
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>
        </transition>
        <transition name="page-transition" mode="out-in">
            <div class="popup" id="add_user" v-if="isAddPopup">
                <b-overlay :show="addUserOverlay" no-wrap></b-overlay>
                <div class="popup-content col-md-4 p-4">
                    <div class="popup-close" @click="closeAddUser">
                        &times;
                    </div>
                    <b-form>
                        <b-form-group id="name_group" label="İsim" label-for="name_input" description="">
                            <b-form-input :class="[addUserError.name ? 'border-danger' : 'border-dark']" id="name_input"
                                v-model="add_user.name" type="text" name="name" placeholder="İsminiz"
                                @click="addUserError.name = false" required></b-form-input>
                        </b-form-group>

                        <b-form-group id="surname_group" label="Soyisim" label-for="surname_input" description="">
                            <b-form-input :class="[addUserError.surname ? 'border-danger' : 'border-dark']"
                                id="surname_input" v-model="add_user.surname" type="text" name="surname"
                                placeholder="Soyisminiz" @click="addUserError.surname = false" required></b-form-input>
                        </b-form-group>

                        <b-form-group id="username_group" label="Kullanıcı Adı" label-for="username_input"
                            description="">
                            <b-form-input :class="[addUserError.username ? 'border-danger' : 'border-dark']"
                                id="username_input" v-model="add_user.username" type="text" name="kullaniciAdi"
                                placeholder="Kullanıcı Adı" @click="addUserError.username = false" required>
                            </b-form-input>
                        </b-form-group>

                        <b-form-group class="position-relative" id="password_group" label="Şifre"
                            label-for="password_input" description="">
                            <b-form-input :class="[addUserError.password ? 'border-danger' : 'border-dark']"
                                id="password_input" v-model="add_user.password" type="text" name="sifre"
                                placeholder="Şifre" @click="addUserError.password = false" required>
                            </b-form-input>
                        </b-form-group>

                        <b-form-group id="email_group" label="Email" label-for="email_input" description="">
                            <b-form-input class="border-dark" name="email" id="email_input" v-model="add_user.email"
                                type="text" placeholder="Emailiniz" required></b-form-input>
                        </b-form-group>

                        <b-form-group id="phone_group" label="Telefon" label-for="phone_input" description="">
                            <b-form-input class="border-dark" id="phone_input" name="phone" v-model="add_user.phone"
                                type="text" v-mask="'0(###)-###-##-##'" placeholder="Telefon numaranız" required>
                            </b-form-input>
                        </b-form-group>

                        <div class="row mt-4">
                            <div class="col-12 col-md-6 m-auto">
                                <b-button class="col-12" type="button" @click="saveUser" squared size="lg"
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
        name: 'AdminUsers',
        layout: 'admin',
        head() {
            return {
                title: "Admin Kullanıcılar Sayfası"
            }
        },
        data() {
            return {
                pageLoading: false,
                users: [],
                add_user: {
                    name: "",
                    surname: "",
                    email: "",
                    phone: "",
                    username: "",
                    password: ""
                },
                addUserError: {
                    name: undefined,
                    surname: undefined,
                    username: undefined,
                    password: undefined
                },
                isAddPopup: false,
                addUserOverlay: false,
                edit_user: undefined,
                usersStart: 0,
                usersEnd: 15,
                userError: {
                    name: false,
                    surname: false,
                    username: false,
                    password: false
                },
                editUserOverlay: false
            }
        },
        methods: {
            addUserPopup() {
                this.resetAddUser();
                this.isAddPopup = true;
            },
            closeAddUser() {
                this.resetAddUser();
                this.isAddPopup = false;
            },
            resetAddUser() {
                this.add_user.name = "";
                this.add_user.surname = "";
                this.add_user.username = "";
                this.add_user.password = "";
                this.add_user.email = "";
                this.add_user.phone = "";
            },
            editUser(user) {
                this.edit_user = Object.assign({}, user);
            },
            deleteUser(id) {
                var _this = this;
                var token = _this.$cookiz.get("admintoken");
                _this.$bvModal.msgBoxConfirm('Kullanıcıyı silmek istediğinize emin misiniz?', {
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
                            _this.$store.dispatch('getService', { "urlParameter": "/api/v1/user/delete/" + id, "token": token })
                                .then(response => {
                                    if (response.success == "success") {
                                        _this.$bvToast.toast('Kullanıcı başarıyla silindi.', {
                                            title: `Başarılı..`,
                                            variant: 'success',
                                            autoHideDelay: 500,
                                            solid: true
                                        });
                                        _this.getUsersByAdmin();
                                    }
                                    else {
                                        _this.$bvToast.toast('Kullanıcı silinemedi.Sayfayı yenileyip tekrar deneyiniz.',
                                            {
                                                title: `Başarısız..`,
                                                variant: 'danger',
                                                autoHideDelay: 1500,
                                                solid: true
                                            });
                                    }
                                });
                        }
                    })
                    .catch(err => {

                    });
            },
            async getUsersByAdmin() {
                var _this = this;
                var token = _this.$cookiz.get("admintoken");
                _this.$store.dispatch('getService', { "urlParameter": "/api/v1/user", "token": token })
                    .then(response => {
                        if (response) {
                            _this.users = response;
                            _this.pagination("#usersPagging", response.length);
                        }

                    });
            },
            async updateUser() {
                var _this = this;
                var token = _this.$cookiz.get("admintoken");
                if (_this.edit_user.password != '' && _this.edit_user.username != '' && _this.edit_user.name != '' && _this.edit_user.surname != '') {
                    _this.editUserOverlay = true;

                    if (_this.edit_user.phone != "")
                        _this.edit_user.phone = Number(_this.edit_user.phone.replace(/\D/g, ''));
                    _this.$store.dispatch('postService', { "data": _this.edit_user, "urlParameter": "/api/v1/user/update/" + _this.edit_user.id, "token": token })
                        .then(response => {
                            if (response.success == "success") {
                                this.$bvToast.toast('Kayıt başarıyla güncellendi.', {
                                    title: `Başarılı..`,
                                    variant: 'success',
                                    autoHideDelay: 3000,
                                    solid: true
                                });

                                setTimeout(() => {
                                    _this.edit_user = undefined;
                                    _this.editUserOverlay = false;
                                    _this.getUsersByAdmin();
                                }, 2000)
                            }
                            else {
                                _this.editUserOverlay = false;
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
                    if (_this.edit_user.name == '' || _this.edit_user.name == null || _this.edit_user.name == undefined)
                        _this.userError.name = true;

                    if (_this.edit_user.surname == '' || _this.edit_user.surname == null || _this.edit_user.surname == undefined)
                        _this.userError.surname = true;

                    if (_this.edit_user.password == '' || _this.edit_user.password == null || _this.edit_user.password == undefined)
                        _this.userError.password = true;

                    if (_this.edit_user.username == '' || _this.edit_user.username == null || _this.edit_user.username == undefined)
                        _this.userError.username = true;
                }
            },
            async saveUser() {
                var _this = this;
                var token = _this.$cookiz.get("admintoken");
                if (_this.add_user.password != '' && _this.add_user.username != '' && _this.add_user.name != '' && _this.add_user.surname != '') {
                    _this.addUserOverlay = true;

                    if (_this.add_user.phone != "")
                        _this.add_user.phone = Number(_this.add_user.phone.replace(/\D/g, ''));

                    _this.$store.dispatch('postService', { "data": _this.add_user, "urlParameter": "/api/v1/user/add/", "token": token })
                        .then(response => {
                            if (response.success == "success") {
                                this.$bvToast.toast('Kayıt başarıyla güncellendi.', {
                                    title: `Başarılı..`,
                                    variant: 'success',
                                    autoHideDelay: 3000,
                                    solid: true
                                });

                                setTimeout(() => {
                                    _this.resetAddUser();
                                    _this.addUserOverlay = false;
                                    _this.isAddPopup = false;
                                    _this.getUsersByAdmin();
                                }, 2000)
                            }
                            else {
                                _this.addUserOverlay = false;
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
                    if (_this.add_user.name == '' || _this.add_user.name == null || _this.add_user.name == undefined)
                        _this.addUserError.name = true;

                    if (_this.add_user.surname == '' || _this.add_user.surname == null || _this.add_user.surname == undefined)
                        _this.addUserError.surname = true;

                    if (_this.add_user.password == '' || _this.add_user.password == null || _this.add_user.password == undefined)
                        _this.addUserError.password = true;

                    if (_this.add_user.username == '' || _this.add_user.username == null || _this.add_user.username == undefined)
                        _this.addUserError.username = true;
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
                this.getUsersByAdmin();
            }
            else {
                _this.$router.push("/admin/login");
            }
        },
        computed: {
            usersList() {
                return this.users.slice(this.usersStart, this.usersEnd);
            },
        }
    }
</script>

<style>
</style>
