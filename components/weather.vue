<template>
	<div class="weather" id="weather" v-if="weather">
		<div class="container-fluid">
			<div class="row align-items-center">
				<div class="col-lg-3 pr-5">
					<div class="row">
						<div class="col-12 d-flex align-items-center">
							<b-icon-geo-alt variant="dark" scale="1.5" class="mr-2"></b-icon-geo-alt>
							<v-select class="w-100" id="selectCity" v-model="selectedCity" :clearable="false"
								:options="cities" label="name" :reduce="c => c.id"></v-select>
						</div>
						<div class="col-12">
							<div class="row">
								<div class="col-6">
									<span v-if="weather_img">
										<img :src="weather_img" :alt="weather_description" width="53" height="43" />
									</span>
								</div>
								<div class="col-6">
									<div class="row">
										<div class="col-12">
											<h1 class="temperature">
												{{ Math.round(temperature) }}°
											</h1>
										</div>
										<div class="col-12">
											<p class="weather-description">
												{{ weather_description }}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4">
					<p class="text-center px-2 font-weight-bold">
						Tazelenmiş bir cilt için bugün cildini temizlemeyi ve nemlendirici kullanmayı unutma!
					</p>
				</div>
				<div class="col-lg-5">

				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Weather',
	data() {
		return {
			selectedCity: 34,
			cities: [],
			weather: null,
			temperature: null,
			weather_description: null,
			weather_img: null,
			weathercode: null
		}
	},
	watch: {
		selectedCity() {
			this.getWeatherByCity();
		}
	},
	methods: {
		getWeatherByCity() {
			const _this = this;
			_this.$repositories.city.getWeatherCity(this.selectedCity).then(res => {
				_this.weather = res.data.response;
				_this.temperature = _this.weather?.current_weather?.temperature;
				_this.weathercode = _this.weather?.current_weather?.weathercode;
				_this.getWMO();
			});
		},
		getWMO() {
			const _this = this;
			if(_this.weathercode == 0) {
				_this.weather_description = "Güneşli";
				_this.weather_img = "/Data/weather/weather-01.svg";
				return false
			}
			
			if(_this.weathercode > 0 && _this.weathercode < 4) {
				_this.weather_description = "Parçalı Bulutlu";
				_this.weather_img = "/Data/weather/weather-03.svg";
				return false
			}

			if(_this.weathercode > 4 && _this.weathercode < 58) {
				_this.weather_description = "Bulutlu";
				_this.weather_img = "/Data/weather/weather-02.svg";
				return false
			}

			if(_this.weathercode > 58 && _this.weathercode < 68) {
				_this.weather_description = "Yağmurlu";
				_this.weather_img = "/Data/weather/weather-04.svg";
				return false
			}

			if(_this.weathercode > 68) {
				_this.weather_description = "Karlı";
				_this.weather_img = "/Data/weather/weather-05.svg";
				return false
			}
		}
	},
	async created() {
		const _this = this;
		_this.getWeatherByCity();
		_this.$repositories.city.getCities().then(res => {
			_this.cities = res.data.response;
		});
	}
}
</script>
<style lang="scss">
#weather {
	background: linear-gradient(to right bottom, #ffc942, #ff50b0);
	padding: 15px 6em;
	font-size: 15px;
	margin-bottom: 3em;

	#selectCity {
		font-size: 20px;
		font-weight: bold;
		height: 38px;

		&.vs--searchable {
			.vs__dropdown-toggle {
				background: transparent;
				border: none;
			}
		}

		.vs__dropdown-menu {
			font-weight: normal;
			font-size: 15px;
		}

	}

	.temperature {
		color: #fff;
		font-size: 65px;
		line-height: 1;
	}

	.weather-description {
		font-size: 15px;
		line-height: 1;
		color: #fff;
	}
}
</style>