<template>
    <div class="container-fluid">
        <BlogDetail :seoLink="this.$route.params.seoLink" v-if="pageType == 'blog'"/>
        <BlogCategory :seoLink="this.$route.params.seoLink" v-if="pageType == 'blog_category'"/>
        <ContentDetail :seoLink="this.$route.params.seoLink" v-if="pageType == 'content'"/>
    </div>
</template>

<script>
export default
    {
        name: 'SeoLink',
        data() {
            return {
                pageType:null
            }
        },
        async fetch() {
            await this.$repositories.page.getTypeBySeoLink(this.$route.params.seoLink)
            .then(res => {
                this.pageType = res.data.response;
            })
        },  
        created() {
        }
    }
</script>

<style>
</style>
