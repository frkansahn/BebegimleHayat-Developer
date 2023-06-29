<template>
    <div class="admin-xml" id="adminxml">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 mb-4">
                    <div class="row mb-5 mt-3">
                        <div class="col-12">
                            <h3>
                                XML
                                <button id="addxml"
                                    class="btn float-right text-secondary">
                                    + Ekle
                                </button>
                            </h3>        
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 border-right">
                            <div class="row">
                                <div class="col-12 table-responsive">
                                    <table class="table table-bordered table-sm" id="adminXmlTable">
                                        <thead>
                                            <tr>
                                                <th>Xml URL</th>
                                                <th>Oluşturan</th>
                                                <th>Oluşturma Tarihi</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(X, index) in xmls" :key="`bodyxml${index}`">
                                                <td>
                                                    <span>
                                                        {{ X.link }}
                                                        <button id="xmlCopyBtn" class="btn btn-sm btn-light ml-1" v-b-tooltip.click.top="'Kopyalandı'" @click="copyLink($event,X.link)">
                                                            <b-icon-files variant="secondary" scale=".7"></b-icon-files>
                                                        </button>
                                                    </span>
                                                </td>
                                                <td>{{ X.created_user }}</td>
                                                <td>{{ X.createdAt | dateTimeFormat }}</td>
                                                <td>
                                                    <button @click="deleteXml(X.id)" id="deleteXml"
                                                        class="btn btn-sm btn-danger px-2">
                                                        <b-icon-trash variant="white" scale=".7"></b-icon-trash>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
        
                                    <div class="row mt-4">
                                        <div class="col-12 d-flex align-items-center justify-content-center">
                                            <b-pagination v-model="paging.currentPage" :total-rows="paging.total" :per-page="20"
                                            :first-text="$t('first')" :prev-text="$t('prev')" :next-text="$t('next')" :last-text="$t('last')" pills>
                                            </b-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <ul class="float-left w-100 border border-secondary p-2 rounded list-unstyled">
                                <li v-for="(category,index) in categories" :key="`category${index}`">
                                    <ul class="list-unstyled">
                                        <TreeCategory class="item"
                                            :item="category"
                                            :isAddButton="false"
                                            :isCheckbox="true"
                                        />
                                    </ul>
                                </li>
                            </ul>
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
        name: 'AdminXml',
        middleware: 'adminAuthenticated',
        layout: 'admin',
        head() {
            return {
                title: "Admin XML Sayfası"
            }
        },
        data() {
            return {
                categories: [],
                xmls: [],
                xmlOverlay: false,
                paging: {
                    currentPage: 1,
                    total: undefined,
                    start: 0,
                    end: 30
                }
            }
        },
        watch: {
            'paging.currentPage'() {
                this.getXmls();
            }
        },
        props: {

        },
        methods: {
            copyLink(e,link) {
                navigator.clipboard.writeText(link);
                setTimeout(() => {                
                    this.$root.$emit('bv::hide::tooltip', 'xmlCopyBtn');
                },1500)
            },
            async createXml() {
                var _this = this;
                if (_this.$checkIsNullOrEmpty(_this.xml.name)) {
                    let reqData = [];
                    reqData.push(_this.xml);
                    _this.xmlOverlay = true;
                    _this.$repositories.xml.create(reqData)
                    .then(res => {
                        if (res.data.success == "success") {
                            _this.$bvToast.toast('Kayıt başarıyla eklendi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getXmls();
                            _this.isAddxml = false;
                            _this.xmlOverlay = false;
                        }
                        else {
                            _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.xmlOverlay = false;
                        }
                    })
                    .catch(err => {
                        _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.xmlOverlay = false;
                    });
                }
                else
                    _this.xmlError.name = true;
            },
            async deleteXml(id) {
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Markayı silmek istediğinize emin misiniz?', {
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
                        let reqData = [
                            {
                                id: id,
                                user_id: _this.$store.state._userId
                            }
                        ];
                        _this.$repositories.xml.delete(reqData)
                            .then(res => {
                                if (res.data.success == "success") {
                                    _this.$bvToast.toast('Marka başarıyla silindi.', {
                                        title: `Başarılı..`,
                                        variant: 'success',
                                        autoHideDelay: 500,
                                        solid: true
                                    });
                                    _this.getXmls();
                                }
                                else {
                                    _this.$bvToast.toast('Marka silinemedi.Sayfayı yenileyip tekrar deneyiniz.',
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
                    _this.$bvToast.toast('Marka silinemedi.Sayfayı yenileyip tekrar deneyiniz.',
                    {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 1500,
                        solid: true
                    });
                });
            },
            async getXmls() {
                var _this = this;
                let reqData = {
                    search: _this.search,
                    paging:{
                        start: (_this.paging.currentPage - 1) * 30,
                        end: _this.paging.end
                    }
                }
                _this.$repositories.xml.get(reqData)
                    .then(res => {
                        if (res) {
                            _this.xmls = res.data.response.xmls;
                            _this.paging.total = res.data.response.total;
                        }
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
            }
        },
        async created() {
            this.getXmls();
            this.getCategories();
        }
    }
</script>
 
<style>

</style>
 