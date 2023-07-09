<template>
	<div class="blog-cart col-12 my-4 pb-2" id="blogBabyDictionary" v-if="blog_category">
		<div class="row">
			<h3 class="col-12 px-0 font-weight-bold mb-3">
				{{ blog_category.category_name }}
			</h3>
		</div>
		<div class="row">
			<div class="col-12 col-md-4 p-0 mb-3 mb-md-0">
				<NuxtLink :to="`/${blog_category.url}`" class="float-left w-100" :title="blog_category.seo_title">
					<span>
						<!-- <ElementImage :src="`/Data/image/medium/${blog_category.image}`" :alt="blog_category.seo_title"/> -->

						<picture>
							<source type="image/webp" :srcset="`https://api.bebegimlehayat.com/Data/image/medium/${blog_category.image}.webp`" />
							<img :src="`https://api.bebegimlehayat.com/Data/image/medium/${blog_category.image}.jpeg`" :alt="blog_category.seo_title" width="400" height="300"/>
						</picture>
					</span>
				</NuxtLink>
			</div>
			<div class="col-12 col-md-8 px-0 px-md-5 d-flex align-items-center content">
				<div class="row">
					<div class="col-12 mb-1 mt-2 baby-dictionary-description">
						<h5 class="font-weight-bold mb-3">
							{{ blog_category.baby_dictionary_title }}
						</h5>
						<h6 class="font-weight-light" id="dict-hint">
							{{ blog_category.baby_dictionary_description }}
						</h6>
					</div>
					<div class="col-12 mt-4">
						<NuxtLink to="/gebelikte-ihtiyac-duydugunuz-vitamin-ve-minareller" class="btn btn-dark px-4 py-3 rounded-0">
							<h6 class="font-weight-normal">
								{{ blog_category.category_name }}
							</h6>
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'BlogBabyDictionary',
	data() {
		return {
			blog_category:undefined,
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
	methods: {

	},
	created() {
		this.$repositories.blog_category.getBabyDistionary()
		.then(res => {
			if(res && res.data && res.data.response)
				this.blog_category = res.data.response;
		})
	}
}
</script>

<style>
.blog-subject {
	font-size: 17px;
	line-height: 1.5;
	color: #000;
}

.blog-category {
	font-weight: 700;
	font-size: 11px;
	line-height: 1.5;
	color: #0095DB;
}

#dict-hint {
	line-height: 1.5;
}

#dict-hint a {
	color: #00cfda;
    text-decoration: underline;
}

</style>
