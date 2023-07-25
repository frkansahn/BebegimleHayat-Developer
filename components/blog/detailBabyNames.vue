<template>
	<div class="row">
		<div class="col-2 col-lg-1 p-0">
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
				<div class="col-12 my-1" v-for="name in names" :key="`name_${name}`"> 
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
		this.lettersClientWidth = document.getElementById('letters').clientWidth;
		let letters = document.getElementById('letters')
		document.addEventListener('scroll' , function(e){
			if(window.screen.width > 992) {
				if(window.innerHeight-letters.getBoundingClientRect().bottom > 30) {
					if(!letters.classList.contains('sticky')) {
						letters.style.maxWidth = letters.clientWidth + 'px';
						letters.classList.add('sticky');
						letters.style.bottom = '0px';
					}
				}

				if(document.getElementById('names').getBoundingClientRect().top > 0) {
					if(letters.classList.contains('sticky')) {
						letters.classList.remove('sticky')
						letters.style.maxWidth = null;
						letters.style.bottom = null;
					}
				}

				if(window.innerHeight - document.getElementById('footer').getBoundingClientRect().top > 30) {
					if(letters.classList.contains('sticky')) {
						letters.style.bottom = window.innerHeight - document.getElementById('footer').getBoundingClientRect().top + 'px';
					}
				}
				else {
					letters.style.bottom = '0px';
				}
			}
		});
	}
}
</script>

<style scoped>

	#letters.sticky {
		position: fixed;
		max-height: 100vh;
    	overflow: auto;
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
