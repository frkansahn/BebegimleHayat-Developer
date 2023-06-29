<template>
	<table class="table" :id="id">
		<thead class="table-secondary">
			<tr>
				<th v-for="(H,index) in head" :key="`head${index}`">{{H}}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(B,index) in body" :key="`body${index}`">
				<td>{{B.name}}</td>
				<td>{{B.is_tipi}}</td>
				<td>{{B.pozisyon_seviyesi}}</td>
				<td>{{B.departman}}</td>
				<td>{{B.createdAt | dateFormat}}</td>
				<td>
					<NuxtLink :to="`/is-ilanlari/${B.seo_link}`" id="goAdvert" class="btn btn-sm btn-outline-primary px-4">
	                  	İlana Git
	               </NuxtLink>
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
	export default{
		name:'Tablo',
		props:["body" , "head" , "id"],
	    components:{
	    },
	    data() {
	        return {
	        }
	    },
	    methods:{

	    },
	    created(){			
		}
	}
</script>

<style>
</style>
