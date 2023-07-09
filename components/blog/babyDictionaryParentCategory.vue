<template>
	<div class="col-12" id="blogBabyDictionaryParentCategory" v-if="otherCategory">
        <div class="row mb-5" v-for="(alphabetic,index) in alphabetics" v-if="getOtherCategoryByAlphabetic(alphabetic).length > 0">
            <div class="col-2 col-lg-1">
                <h1 class="font-weight-bold">
                    {{ alphabetic }}
                </h1>
            </div>
            <div class="col-10 col-log-11">
                <div class="row">
                    <div class="col-12 col-lg-4 mb-4" v-for="(category,index1) in getOtherCategoryByAlphabetic(alphabetic)">
                        <div class="row align-items-center">
                            <div class="col-12 col-lg-3 pr-0">
                                <div class="hover-image">
                                    <!-- <ElementImage :src="`/Data/image/small/${category.image}`" :alt="category.category_name"/> -->

                                    <picture>
                                        <source type="image/webp" :srcset="`https://api.bebegimlehayat.com/Data/image/small/${category.image}.webp`" />
                                        <img :src="`https://api.bebegimlehayat.com/Data/image/small/${category.image}.jpeg`" :alt="category.category_name" width="1402" height="482"/>
                                    </picture>
                                </div>
                            </div>
                            <div class="col-12 col-lg-9">
                                <NuxtLink :to="`/${category.url}`">
                                    <h5 class="font-weight-normal text-decoration-underline">
                                        {{ category.category_name }}
                                    </h5>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
export default {
	name: 'BlogBabyDictionaryParentCategory',
	data() {
		return {
            alphabetics: [
                "A",
                "B",
                "C",
                "Ç",
                "D",
                "E",
                "F",
                "G",
                "H",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "R",
                "S",
                "T",
                "Ü",
                "Y",
                "Z"
            ]
		}
	},
    props :{
        otherCategory:{
            type: Object,
            default: []
        }
    },
	methods: {
        getOtherCategoryByAlphabetic(alphabetic) {
            return this.otherCategory.filter(x => x.category_name.charAt().toLowerCase() == alphabetic.toLowerCase() && x.parent_id != null);
        }
	},
	created() {
	}
}
</script>

<style>

</style>
