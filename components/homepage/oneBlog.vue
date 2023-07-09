<template>
	<div class="blog-cart col-12 my-4 pb-2" id="blogBabyDictionary">
		<div class="row">
			<h2 class="col-12 font-weight-bold mb-3">
				Vitamin ve Mineraller
			</h2>
		</div>
		<NuxtLink to="/gebelikte-ihtiyac-duyacaginiz-vitamin-ve-mineraller" class="row">
			<div class="col-12 col-md-4 mb-3 mb-md-0">
				<div class="float-left w-100"
					title="Vitamin ve Mineraller">
					<span>
						<picture>
							<source srcset="https://api.bebegimlehayat.com/Data/image/small/vitamin-ve-mineraller-1685811217185.jpeg">
							<img src="https://api.bebegimlehayat.com/Data/image/small/vitamin-ve-mineraller-1685811217185.jpeg" width="300px"
								height="300px" loading="lazy"/>
						</picture>
					</span>
				</div>
			</div>
			<div class="col-12 col-md-8 px-md-5 d-flex align-items-center content">
				<div class="row">
					<div class="col-12 mb-1 mt-2 baby-dictionary-description">
						<h5 class="font-weight-bold mb-3">
							Gebelikte İhtiyaç Duyacağınız Vitamin ve Mineraller
						</h5>
						<div class="font-weight-light h6 my-0" id="dict-hint">
							Gebelik sürecinde annenin sağlıklı bir hamilelik geçirebilmesi ve bebeğin ideal gelişim
							gösterebilmesi için vitamin ve mineral seviyelerinin uygun değerlerde tutulması gerekir. Bu
							bağlamda hamilelik sürecinde vitamin ve mineral değerlerine dikkat edilmesi oldukça önemlidir.
							Anne ve bebek sağlığı açısından ve ideal çocuk gelişiminin sağlanması bakımından gebelik
							sürecinde vitamin ve minerallerin alımı doktor kontrolünde kararlaştırılmalı, beslenme düzeni
							buna uygun kurgulanmalıdır.
						</div>
					</div>
					<div class="col-12 mt-4">
						<div class="btn btn-dark px-4 py-3 rounded-0">
							<h6 class="font-weight-normal">
								Vitamin ve Mineraller
							</h6>
						</div>
					</div>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>
<script>
export default {
	name: 'OneBlog',
	data() {
		return {
			blog_category: undefined,
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
}</style>
