<template>
    <div class="col-12 col-lg-4 d-none d-lg-block" v-if="otherBlogs && otherBlogs.length > 0">
        <div class="row mt-5 pt-5">
            <div class="col-12" id="interestYou">
                <div class="row">
                    <div class="col-12 mb-3">
                        <h5 class="font-weight-bold">
                            Bu makaleler de ilgini çekebilir
                        </h5>
                    </div>
                    <div class="col-12" v-for="(blog, index) in otherBlogs">
                        <BlogCartBottom v-bind:key="`blogCartBottom${index}`" :blog="blog" :index="index"
                            :className="'col-12'"></BlogCartBottom>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ToolNewBlogs',
    data() {
        return {
            otherBlogs: []
        }
    },
    methods: {
        getNewBlogs() {
            const _this = this;
            let reqData = {
                "paging": {
                    "start": 0,
                    "end": 6
                }
            }
            _this.$repositories.blog.getNewBlogs(reqData)
            .then(res => {
                if(res && res.data) {
                    _this.otherBlogs.push(...res.data.response.blogs);
                }
            });	
        }
    },
    async created() {
        this.getNewBlogs();
    }
}
</script>

<style></style>
