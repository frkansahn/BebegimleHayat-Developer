<template>
	<div class="blog-cart" :class="className || 'col-12 col-md-6 mb-4 pb-2'" :id="`blogCart${index}`">
		<NuxtLink :to="`/${blog.seo_link}`" class="row bg-white">
			<div class="col-5 col-lg-6 p-0">
				<div class="float-left w-100 image-wrapper"
					:style='`padding-bottom: 87%;`' :title="blog.seo_title">
					<span :id="isHaftaHaftaGebelik ? 'hafta-hafta-gebelik-cart' : isAylikBebekGelisimi ? 'aylik-bebek-gelisimi-cart' : ''">
						<!-- <ElementImage :src="`/Data/image/small/${blog.image}`" :alt="blog.seo_title" width="308" height="268" /> -->
						<picture >
							<source type="image/webp" :srcset="`https://api.bebegimlehayat.com/Data/image/small/${blog.image}.webp`" />
							<img :src="`https://api.bebegimlehayat.com/Data/image/small/${blog.image}.jpeg`" :alt="blog.seo_title" :width="308" :height="268"  />
						</picture>
						<div v-if="isHaftaHaftaGebelik">
							<span>
								{{ kacHaftaGebelik }}. HAFTA <br> GEBELİK
							</span>
						</div>

						<div v-if="isAylikBebekGelisimi">
							<span>
								{{ kacAylikBebekGelisimi }} AYLIK <br> BEBEK GELİŞİMİ
							</span>
						</div>
					</span>
				</div>
			</div>
			<div class="col-7 col-lg-6 px-4 d-flex align-items-center content">
				<div class="row">
					<h2 class="col-12 pl-2 pl-lg-4 mb-1 mt-2 blog-subject">
						{{ blog.subject }}
					</h2>
					<div class="col-12 pl-2 pl-lg-4 mb-1 mt-2 blog-category text-uppercase">
						{{ blog.category_name }}
					</div>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>
<script>
export default {
	name: 'BlogCart',
	props: {
		"blog": Object,
		"index": Number,
		"className": String
	},
	components: {
	},
	data() {
		return {
			mainProps: {
				center: true,
				fluidGrow: true,
				blank: true,
				blankColor: '#bbb',
				width: 307,
				height: 265,
				class: ''
			}
		}
	},
	computed: {
		isHaftaHaftaGebelik() {
			return this.blog?.seo_link?.indexOf('-hafta-gebelik') > -1 ? true : false
		},
		kacHaftaGebelik() {
			return this.blog?.seo_link?.split('-')[0] || ""
		},

		isAylikBebekGelisimi() {
			return this.blog?.seo_link?.indexOf('-aylik-bebek-gelisimi') > -1 ? true : false
		},
		kacAylikBebekGelisimi() {
			return this.blog?.seo_link?.split('-')[0] || ""
		}
	},
	methods: {

	},
	created() {
	}
}
</script>

<style lang="scss">
	.blog-subject {
		font-size: 17px;
		line-height: 1.5;
		color: #000;
		font-weight: 400;

		@media screen and (max-width:768px) {
			font-size: 15px;
		}
	}

	.blog-category {
		font-weight: 700;
		font-size: 11px;
		line-height: 1.5;
		color: #0095DB;
	}

	#hafta-hafta-gebelik-cart {
		position: relative;

		div {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			span {
				@media screen and (max-width: 1025px) {
					font-size: 16px;
					line-height: 20px;
				}

				@media screen and (max-width: 993px) {
					font-size: 10px;
    				line-height: 11px;
				}

				@media screen and (max-width: 769px) {
					font-size: 10px;
    				line-height: 11px;	
				}

				@media screen and (max-width: 541px) {			
					font-size: 11px;
					line-height: 13px;
				}

				@media screen and (max-width: 376px) {
					font-size: 9px;
					line-height: 11px;					
				}

				color: #eaa9cb;
				font-size: 18px;
				text-align: center;
				line-height: 21px;
				font-weight: 700;
				margin-top: 3.2em;
			}
		}
	}

	#aylik-bebek-gelisimi-cart {
		position: relative;

		div {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			span {
				@media screen and (max-width: 1025px) {
					font-size: 16px;
					line-height: 20px;
				}

				@media screen and (max-width: 993px) {
					font-size: 10px;
    				line-height: 11px;
				}

				@media screen and (max-width: 769px) {
					font-size: 10px;
    				line-height: 11px;	
				}

				@media screen and (max-width: 541px) {			
					font-size: 11px;
					line-height: 13px;
				}

				@media screen and (max-width: 376px) {
					font-size: 9px;
					line-height: 11px;					
				}

				color: #eaa9cb;
				font-size: 18px;
				text-align: center;
				line-height: 21px;
				font-weight: 700;
				margin-bottom: 2.2em;
			}
		}
	}

</style>
