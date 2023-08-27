<template>
	<div class="row" id="detailBabyNames">
		<div class="col-2 col-lg-1 p-1 p-lg-0">
			<ul class="p-0 list-unstyled" id="letters"> 
				<li v-for="l in letters" :key="`letter_${l}`">
					<span :class="[l == letter ? 'active':'']" @click="changeLetter(l)">
						{{ l }}
					</span>
				</li>
			</ul>
		</div>
		<div class="col-10 col-lg-11" id="names">
			<div class="row">
				<div class="col-12 my-1" v-for="(name,index) in names" :key="`baby_name_${index}`"> 
					<span>
						<strong>
							{{ name.name }}
						</strong>

						: {{ name.description }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'DetailBabyNames',
	data() {
		return {
			names: null,
			letter : 'A',
			letters: ["A", "B", "C", "Ç", "D", "E", "F", "G", "H", "I", "İ", "J", "K", "L", "M", "N", "O", "Ö", "P", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z"],
		}
	},
	async fetch() {
		await this.getBabyNames();
	},
	props : ["gender"],
	methods: {
		changeLetter(l) {
			this.letter = l;
			this.getBabyNames();
			var element = document.getElementById("detailBabyNames");
 			element.scrollIntoView();
		},
		async getBabyNames() {
			let reqData = {
				letter: this.letter || 'A',
				gender : this.gender
			}

			await this.$repositories.blog.getBabyName(reqData)
			.then(res => {
				this.names = res.data.response;
			})
		}
	},
	async mounted() {
	}
}
</script>

<style scoped>

	#letters.sticky {
		position: fixed;
		z-index: 2;
	}

	#letters.sticky::-webkit-scrollbar {
		width: 2px;
	}

	#letters span {
		background: #ebebeb;
		width: 50px;
		height: 50px;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 8px;
		font-size: 19px;
		font-weight: 400;
		cursor:pointer;
	}

	#letters span.active {
		font-weight: 600;
	}

	#names {
		background: #F7F8FA;
		padding-top: 1em;
		padding-bottom: 1em;
	}

	#names span {
		font-size: 15px;
	}
</style>
