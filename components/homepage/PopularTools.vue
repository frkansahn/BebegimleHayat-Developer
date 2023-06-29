<template>
	<div class="row my-4 my-md-5" id="popularTools">
		<div class="col-12">
            <h2 class="text-center font-weight-semibold mb-4 block-title">
                Popüler Araçlar
            </h2>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 py-2 tool" v-for="(tool,index) in tools">
                    <NuxtLink class="d-flex flex-column align-items-center justify-content-center" :to="tool.url" :id="`slider${index}`" :title="tool.name">
                        <span v-if="tool.image" class="d-flex align-items-center justify-content-center image">
                            <img :src="tool.image" width="140" height="140"/>
                        </span>
                        <h6 class="font-weight-normal mt-3 text-center">
                            {{ tool.name }}
                        </h6>
                    </NuxtLink>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
export default {
	name: 'PopularTools',
	props: [
        "tools"
    ]
}
</script>

<style lang="scss">
    #popularTools {
        .image {
            height: 140px;
            width: 100%;
            
            picture, img{
                width: auto;
                height: 100%;
            }
        }

        .tool {
            border:1px solid transparent;

            &:hover {
                border:1px solid #000;
            }
        }

        .block-title {
            font-size: 2rem;
            font-weight: 500;
    
            @media screen and (max-width:768px) {
                font-size:1.6rem;
            }
    
            @media screen and (max-width:540px) {
                font-size:1.3rem;
            }
        }
    }

</style>
