<template>
	<div class="row my-5" id="babyNames">
		<div class="col-12">
            <h2 class="text-center font-weight-semibold mb-5">
                Bebek İsimleri A-Z
            </h2>
            <div class="row">
                <div class="col-12 mb-4" v-if="isMobile">
                    <b-button pill @click="selected=1" class="px-4" :variant="selected == 1 ? 'outline-light bg-women text-white':'outline-secondary'">Kız</b-button>
                    <b-button pill @click="selected=0" :variant="selected == 0 ? 'outline-light bg-man text-white':'outline-secondary'">Erkek</b-button>
                </div>
                <div class="col-12 col-lg-6" id="women" v-if="!isMobile || selected == 1">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center mb-4" v-for="(women,index) in getWomens">
                            <span class="">
                                {{ women.name }}
                            </span>
                            <NuxtLink :to="`/${women.url}`">
                                {{ women.name + ' ile başlayan Kız Bebek isimleri' }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-lg-6" id="man" v-if="!isMobile || selected == 0">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center mb-4" v-for="(man,index) in getMans">
                            <span class="">
                                {{ man.name }}
                            </span>
                            <NuxtLink :to="`/${man.url}`">
                                {{ man.name + ' ile başlayan Erkek Bebek isimleri' }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12 d-flex align-items-center justify-content-center">
                    <button class="btn btn-outline-dark rounded d-flex align-items-center justify-content-center" @click="isAll = !isAll">
                        {{ isAll ? 'Daha Az':'Daha Fazla' }}
                        <b-icon-chevron-up class="ml-2" scale=".9" v-if="isAll"></b-icon-chevron-up>
                        <b-icon-chevron-down class="ml-2" scale=".9" v-else></b-icon-chevron-down>
                    </button>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
export default {
	name: 'BabyNames',
	props: ["mans","womens"],
    computed: {
        getMans() {
            if(!this.isAll && this.mans)
                return this.mans.slice(0,5);
            else
                return this.mans;
        },
        getWomens() {
            if(!this.isAll && this.womens)
                return this.womens.slice(0,5);
            else
                return this.womens;
        }
    },
	data() {
		return {
            isAll:false,
            selected:1,
            isMobile: false
		}
	},
    methods: {
        eventWindowResize() {
            this.isMobile = window.screen.width > 768 ? false : true;
        }
    },
    async mounted() {
        var _this = this;
        _this.isMobile = window.screen.width > 768 ? false : true;
        window.addEventListener("resize", _this.eventWindowResize);
    }
}
</script>

<style lang="scss">
    #babyNames {
        .bg-man {
            background-color: #3cb6ce;
            border-color: #3cb6ce;
        }

        .bg-women {
            background-color: #ff8b7c;
            border-color: #ff8b7c;
        }

        #man,#women{
            span {
                display: flex;
                position: relative;
                -webkit-box-align: center;
                align-items: center;
                flex-shrink: 0;
                -webkit-box-pack: center;
                justify-content: center;
                height: 35px;
                width: 35px;
                color: white;
                font-size: 22px;
                font-weight: bold;
                line-height: 1;
                border-radius: 50%;
                margin-right: 14px;
            }
        }

        #man {
            span {
                background-color: rgb(60, 182, 206);
            }
        }

        #women {
            span {
                background-color: rgb(255, 139, 124);
            }
        }

        a {
            color: rgb(1, 97, 116);
            font-weight: 500;
            line-height: normal;
            font-size: 17px;

            &:hover {
                text-decoration: underline;
            }

            @media screen and (max-width: 768px) {
                font-size: 16px;
            }
        }
    }
</style>
