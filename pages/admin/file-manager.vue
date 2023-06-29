<template>
   <div class="admin-file-manager" id="adminFileManager">
        <AdminHeader/>      
        <div class="admin-content-wrapper">
            <div class="row mt-4">
                <div class="col-12 mb-4">
                    <iframe src="/filemanager/dialog.php?type=4&descending=false&lang=tr&akey=fkod_12345." data-alloy-tabstop="true" tabindex="-1" width="100%" style="width: 100%;height: 100vh;"></iframe>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
    export default 
    {
        name:'FileManager',
        layout:'admin',
        head() {
            return {
                title: "Dosya Yöneticisi"
            }
        },
        data() {
            return {
                managerUrl:undefined
            }
        },
        methods:{
        },
        async created(){
            var _this = this;
            var token = _this.$cookiz.get("admintoken");
            var userId = _this.$cookiz.get("_userId");
            if(token && userId)
            {
                this.managerUrl = "";     
            } 
            else
            {
                _this.$bvToast.toast('Admin bulunamadı tekrar giriş yapınız.', {
                    title: `Başarısız..`,
                    variant: 'danger',
                    autoHideDelay: 500,
                    solid: true
                });
                _this.$router.push("/admin/login"); 
            }            
        }
    }
</script>

<style>
</style>
